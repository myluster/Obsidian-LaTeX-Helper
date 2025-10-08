// 导入所需模块
import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer, setIcon, WorkspaceWindow } from "obsidian";
import { symbolCategories } from './symbols';
import { translations } from './lang';
import LatexHelperPlugin from "./main";

// 为视图定义唯一标识符
export const LATEX_HELPER_VIEW_TYPE = "latex-panel-view";

// 类型定义
interface SymbolDisplay {
    en: string;
    zh: string;
}

interface SymbolDefinition {
    display: string | SymbolDisplay;
    code: string;
}

// 视图的主类定义
export class LatexHelperView extends ItemView {
    private plugin: LatexHelperPlugin;
    private currentCategory: string;
    private searchTerm: string;

    constructor(leaf: WorkspaceLeaf, plugin: LatexHelperPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentCategory = Object.keys(symbolCategories)[0] || '';
        this.searchTerm = '';
    }

    // 必须是 public，因为它实现了 ItemView 的公共方法
    getViewType(): string {
        return LATEX_HELPER_VIEW_TYPE;
    }

    // 必须是 public，因为它实现了 ItemView 的公共方法
    getDisplayText(): string {
        return this.plugin.settings ? this.t("view_title") : "LaTeX Snippets";
    }

    // 翻译辅助函数
    private t(key: keyof typeof translations['en']): string {
        const lang = this.plugin.settings.language;
        return translations[lang][key] || translations['en'][key];
    }

    // 获取显示文本的辅助函数
    private getSymbolDisplayText(symbol: SymbolDefinition): string {
        if (typeof symbol.display === 'string') {
            return symbol.display;
        } else {
            const lang = this.plugin.settings.language;
            return symbol.display[lang];
        }
    }

    // 必须是 public，因为它实现了 ItemView 的公共方法
    async onOpen() {
        const container = this.contentEl;
        container.empty();
        this.setupControls(container);
        this.renderSymbols(container);
    }

    private setupControls(container: HTMLElement) {
        const controlsContainer = container.createDiv({ cls: "latex-controls-container" });
        const topRow = controlsContainer.createDiv({ cls: "latex-top-row" });
        
        // 搜索框
        const searchInput = topRow.createEl("input", {
            type: "text",
            placeholder: this.t("search_placeholder"),
            cls: "latex-search-input"
        });

        // 弹出/停靠按钮
        const isPopout = this.leaf.getRoot() instanceof WorkspaceWindow;
        const actionButton = topRow.createEl("button", { cls: "latex-action-button" });

        if (isPopout) {
            setIcon(actionButton, "panel-left-close");
            actionButton.ariaLabel = this.t("dock_tooltip");
            actionButton.addEventListener("click", () => this.dockView());
        } else {
            setIcon(actionButton, "popup-open");
            actionButton.ariaLabel = this.t("popout_tooltip");
            actionButton.addEventListener("click", () => this.popoutView());
        }
        
        // 分类选择下拉菜单
        const categorySelect = controlsContainer.createEl("select", { cls: "latex-category-select" });
        const categories = Object.keys(symbolCategories);
        categories.forEach(category => {
            const option = categorySelect.createEl("option");
            option.value = category;
            option.textContent = this.t(category as keyof typeof translations['en']);
        });

        // 事件监听
        categorySelect.addEventListener("change", (e) => {
            this.currentCategory = (e.target as HTMLSelectElement).value;
            this.renderSymbols(container);
        });

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

        const symbols = symbolCategories[this.currentCategory as keyof typeof symbolCategories];
        if (!symbols) return;

        const filteredSymbols = symbols.filter(symbol => 
            symbol.code.toLowerCase().includes(this.searchTerm)
        );

        const grid = contentContainer.createDiv({ cls: "latex-grid" });
        filteredSymbols.forEach(symbol => {
            // 根据是否使用翻译添加不同的类名
            const isTranslated = this.currentCategory === 'matrices' || this.currentCategory === 'environments';
            const button = grid.createEl("button", { 
                cls: `latex-symbol-button ${isTranslated ? 'latex-translated-button' : 'latex-formula-button'}`,
                attr: {
                    'data-category': this.currentCategory
                }
            });
            
            const displayText = this.getSymbolDisplayText(symbol);

            if (isTranslated) {
                // 对于翻译内容，创建一个文本容器
                const textContainer = button.createDiv({ cls: 'latex-translated-text' });
                textContainer.setText(displayText);
            } else {
                // 对于 LaTeX 公式，使用原有的渲染方式
                MarkdownRenderer.render(this.app, displayText, button, '', this);
            }

            button.addEventListener("click", () => { 
                this.insertText(symbol.code + ' ');
            });
        });
    }

    private async popoutView() {
        const newLeaf = this.app.workspace.openPopoutLeaf();
        await newLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
        this.leaf.detach();
    }

    private async dockView() {
        const rightLeaf = this.app.workspace.getRightLeaf(false);
        if(rightLeaf) {
            await rightLeaf.setViewState({ type: LATEX_HELPER_VIEW_TYPE, active: true });
            this.app.workspace.revealLeaf(rightLeaf);
            this.leaf.detach();
        }
    }

    private insertText(textToInsert: string) {
        let editor: Editor | null = null;
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            editor = activeView.editor;
        } else {
            this.app.workspace.iterateAllLeaves(leaf => {
                if (editor) return;
                if (leaf.view instanceof MarkdownView) {
                    editor = leaf.view.editor;
                }
            });
        }

        if (editor) {
            const cursor = editor.getCursor();
            editor.replaceSelection(textToInsert);
            editor.setCursor(cursor.line, cursor.ch + textToInsert.length);
            editor.focus();
        }
    }

    // 必须是 public，因为它实现了 ItemView 的公共方法
    async onClose() {}
}