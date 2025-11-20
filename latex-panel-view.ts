import { ItemView, WorkspaceLeaf, MarkdownView, MarkdownRenderer, setIcon, WorkspaceWindow, getLanguage, moment } from "obsidian";
import { SymbolDefinition } from './symbols';
import { translations, TranslationKey } from './lang';
import LatexHelperPlugin from "./main";

export const LATEX_HELPER_VIEW_TYPE = "latex-panel-view";

export class LatexHelperView extends ItemView {
    private plugin: LatexHelperPlugin;
    private currentCategory: string;
    private searchTerm: string;
    private currentLang: 'zh' | 'en' = 'en';

    constructor(leaf: WorkspaceLeaf, plugin: LatexHelperPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentCategory = Object.keys(this.plugin.settings.symbols)[0] || '';
        this.searchTerm = '';
    }

    getViewType(): string {
        return LATEX_HELPER_VIEW_TYPE;
    }

    getDisplayText(): string {
        return this.t("view_title");
    }

    public refresh() {
        const container = this.contentEl;
        const categories = Object.keys(this.plugin.settings.symbols);
        if (!categories.includes(this.currentCategory)) {
            this.currentCategory = categories[0] || '';
        }
        this.renderSymbols(container);
    }

    private updateLanguage() {
        let lang: string | null = null;
        try { lang = getLanguage(); } catch { /* ignore */ }
        
        if (!lang && moment) { lang = moment.locale(); }
        if (!lang) { lang = window.localStorage.getItem('language'); }
        
        if (lang && lang.toLowerCase().startsWith('zh')) { this.currentLang = 'zh'; } 
        else { this.currentLang = 'en'; }
    }

    private t(str: string): string {
        const key = str as TranslationKey;
        return translations[this.currentLang]?.[key] || translations['en'][key] || str;
    }
    
    private getSymbolDisplayText(symbol: SymbolDefinition): string {
        if (typeof symbol.display === 'string') {
            return symbol.display;
        } else {
            return symbol.display[this.currentLang] || symbol.display['en'];
        }
    }

    async onOpen() {
        this.updateLanguage();
        const container = this.contentEl;
        container.empty();
        await Promise.resolve();
        this.setupControls(container);
        this.renderSymbols(container);
    }

    private setupControls(container: HTMLElement) {
        const controlsContainer = container.createDiv({ cls: "latex-controls-container" });
        const topRow = controlsContainer.createDiv({ cls: "latex-top-row" });
        
        const searchInput = topRow.createEl("input", {
            type: "text",
            placeholder: this.t("search_placeholder"),
            cls: "latex-search-input"
        });

        const isPopout = this.leaf.getRoot() instanceof WorkspaceWindow;
        const actionButton = topRow.createEl("button", { cls: "latex-action-button" });

        const icon = isPopout ? "panel-left-close" : "popup-open";
        const tooltip = isPopout ? this.t("dock_tooltip") : this.t("popout_tooltip");
        const action = isPopout ? () => this.dockView() : () => this.popoutView();
        
        setIcon(actionButton, icon);
        actionButton.ariaLabel = tooltip;
        
        actionButton.addEventListener("mousedown", (e) => {
            e.preventDefault();
            void action();
        });
        
        const categorySelect = controlsContainer.createEl("select", { cls: "latex-category-select" });
        const categories = Object.keys(this.plugin.settings.symbols);
        
        categories.forEach(category => {
            const option = categorySelect.createEl("option");
            option.value = category;
            option.textContent = this.t(category); 
        });

        categorySelect.addEventListener("change", (e) => {
            this.currentCategory = (e.target as HTMLSelectElement).value;
            this.renderSymbols(container);
        });
        
        categorySelect.value = this.currentCategory;

        searchInput.addEventListener("input", (e) => {
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

            button.addEventListener("mousedown", (e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                this.insertText(symbol.code + ' ');
            });
        });
    }

    private async popoutView() {
        const newLeaf = this.app.workspace.openPopoutLeaf();
        await newLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
    }

    private async dockView() {
        const rightLeaf = this.app.workspace.getRightLeaf(false);
        if(rightLeaf) {
            await rightLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
            await this.app.workspace.revealLeaf(rightLeaf);
            if (this.leaf.getRoot() instanceof WorkspaceWindow) {
                this.leaf.detach();
            }
        }
    }

    private insertText(textToInsert: string) {
        let view = this.app.workspace.getActiveViewOfType(MarkdownView);
        
        // 兜底逻辑：如果 getActiveViewOfType 没获取到，尝试从所有 leaf 中找
        if (!view) {
            const leaves = this.app.workspace.getLeavesOfType("markdown");
            if (leaves.length > 0 && leaves[0].view instanceof MarkdownView) {
                view = leaves[0].view;
            }
        }
        
        if (view) {
            const editor = view.editor;
            if (!editor.hasFocus()) editor.focus();
            const cursor = editor.getCursor();
            editor.replaceSelection(textToInsert);
            editor.setCursor(cursor.line, cursor.ch + textToInsert.length);
        }
    }

    async onClose() {}
}