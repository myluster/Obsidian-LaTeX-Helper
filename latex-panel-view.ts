import { ItemView, WorkspaceLeaf, MarkdownView, MarkdownRenderer, setIcon } from "obsidian";
import { SymbolDefinition } from './symbols';
import { TranslationKey, getCurrentLang, t } from './lang';
import type LatexHelperPlugin from "./main";

export const LATEX_HELPER_VIEW_TYPE = "latex-panel-view";

export class LatexHelperView extends ItemView {
    private plugin: LatexHelperPlugin;
    private currentCategory: string;
    private searchTerm: string;
    private isPopout: boolean;
    private actionButtonEl!: HTMLElement;

    constructor(leaf: WorkspaceLeaf, plugin: LatexHelperPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentCategory = Object.keys(this.plugin.settings.symbols)[0] || '';
        this.searchTerm = '';
        this.isPopout = false;
    }

    getViewType(): string {
        return LATEX_HELPER_VIEW_TYPE;
    }

    getDisplayText(): string {
        return t("view_title");
    }

    public refresh() {
        const container = this.contentEl;
        const categories = Object.keys(this.plugin.settings.symbols);
        if (!categories.includes(this.currentCategory)) {
            this.currentCategory = categories[0] || '';
        }
        this.renderSymbols(container);
    }

    public updateActionButtonUI() {
        if (!this.actionButtonEl) return;
        if (this.isPopout) {
            setIcon(this.actionButtonEl, "panel-left-close");
            this.actionButtonEl.ariaLabel = t("dock_tooltip");
        } else {
            setIcon(this.actionButtonEl, "popup-open");
            this.actionButtonEl.ariaLabel = t("popout_tooltip");
        }
    }

    private getSymbolDisplayText(symbol: SymbolDefinition): string {
        if (typeof symbol.display === 'string') {
            return symbol.display;
        } else {
            const lang = getCurrentLang();
            return symbol.display[lang] || symbol.display['en'];
        }
    }

    async onOpen() {
        const container = this.contentEl;
        container.empty();
        await Promise.resolve();
        this.setupControls(container);

        this.registerDomEvent(container, 'mousedown', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const button = target.closest<HTMLElement>('.latex-symbol-button');
            if (button?.dataset.code) {
                e.preventDefault();
                e.stopPropagation();
                const offset = button.dataset.cursorOffset;
                this.insertText(
                    button.dataset.code,
                    offset !== undefined ? parseInt(offset, 10) : undefined
                );
            }
        });

        this.renderSymbols(container);
    }

    private setupControls(container: HTMLElement) {
        const controlsContainer = container.createDiv({ cls: "latex-controls-container" });
        const topRow = controlsContainer.createDiv({ cls: "latex-top-row" });
        
        const searchInput = topRow.createEl("input", {
            type: "text",
            placeholder: t("search_placeholder"),
            cls: "latex-search-input"
        });

        this.actionButtonEl = topRow.createEl("button", { cls: "latex-action-button" });
        this.updateActionButtonUI();
        
        this.registerDomEvent(this.actionButtonEl, "mousedown", (e: MouseEvent) => {
            e.preventDefault();
            if (this.isPopout) {
                void this.dockView();
            } else {
                void this.popoutView();
            }
        });
        
        const categorySelect = controlsContainer.createEl("select", { cls: "latex-category-select" });
        const categories = Object.keys(this.plugin.settings.symbols);
        
        categories.forEach(category => {
            const option = categorySelect.createEl("option");
            option.value = category;
            option.textContent = t(category as TranslationKey); 
        });

        this.registerDomEvent(categorySelect, "change", (e: Event) => {
            this.currentCategory = (e.target as HTMLSelectElement).value;
            this.renderSymbols(container);
        });
        
        categorySelect.value = this.currentCategory;

        this.registerDomEvent(searchInput, "input", (e: Event) => {
            this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            this.renderSymbols(container);
        });
    }

    private renderSymbols(container: HTMLElement) {
        let contentContainer = container.querySelector(".latex-content-container");
        if (!contentContainer) {
            contentContainer = container.createDiv({ cls: "latex-content-container" });
        }
        contentContainer.empty();

        const symbols = this.plugin.settings.symbols[this.currentCategory];
        if (!symbols) return;

        const filteredSymbols = symbols.filter(symbol => 
            symbol.code.toLowerCase().includes(this.searchTerm)
        );

        const grid = contentContainer.createDiv({ cls: "latex-grid" });
        
        filteredSymbols.forEach(symbol => {
            const isTranslated = this.currentCategory === 'matrices' || this.currentCategory === 'environments';
            
            const button = grid.createEl("button", { 
                cls: `latex-symbol-button ${isTranslated ? 'latex-translated-button' : 'latex-formula-button'}`,
                attr: { 'data-category': this.currentCategory }
            });
            
            const displayText = this.getSymbolDisplayText(symbol);

            if (isTranslated) {
                const textContainer = button.createDiv({ cls: 'latex-translated-text' });
                textContainer.setText(displayText);
            } else {
                void MarkdownRenderer.render(this.app, displayText, button, '', this);
            }

            button.setAttr('data-code', symbol.code);
            if (symbol.cursorOffset !== undefined) {
                button.setAttr('data-cursor-offset', String(symbol.cursorOffset));
            }
        });
    }

    private async popoutView() {
        const newLeaf = this.app.workspace.openPopoutLeaf();
        await newLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
        const newView = newLeaf.view as LatexHelperView;
        newView.isPopout = true;
        newView.updateActionButtonUI();
        this.leaf.detach();
    }

    private async dockView() {
        const rightLeaf = this.app.workspace.getRightLeaf(false);
        if(rightLeaf) {
            await rightLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
            const newView = rightLeaf.view as LatexHelperView;
            newView.isPopout = false;
            newView.updateActionButtonUI();
            await this.app.workspace.revealLeaf(rightLeaf);
            this.leaf.detach();
        }
    }

    private insertText(code: string, cursorOffset?: number) {
        const view = this.plugin.lastActiveMarkdownView;
        
        if (!view) {
            const markdownLeaves = this.app.workspace.getLeavesOfType('markdown');
            if (markdownLeaves.length > 0) {
                return this.insertTextFallback(code, cursorOffset, markdownLeaves[0].view as MarkdownView);
            }
            return;
        }
        
        this.doInsertText(view, code, cursorOffset);
    }

    private doInsertText(view: MarkdownView, code: string, cursorOffset?: number) {
        const editor = view.editor;
        if (!editor.hasFocus()) editor.focus();
        const cursor = editor.getCursor();
        const startCh = cursor.ch;

        let textToInsert: string;
        let finalOffset: number;

        if (cursorOffset !== undefined) {
            textToInsert = code;
            if (cursorOffset <= code.length) {
                finalOffset = cursorOffset;
            } else {
                const pad = ' '.repeat(cursorOffset - code.length);
                textToInsert = code + pad;
                finalOffset = cursorOffset;
            }
        } else {
            textToInsert = code + ' ';
            finalOffset = code.length + 1;
        }

        editor.replaceSelection(textToInsert);
        editor.setCursor(cursor.line, startCh + finalOffset);
    }

    private insertTextFallback(code: string, cursorOffset: number | undefined, view: MarkdownView) {
        this.doInsertText(view, code, cursorOffset);
    }

    async onClose() {}
}
