// latex-panel-view.ts

// 导入所需模块
// Import required modules.
import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer, setIcon, WorkspaceWindow } from "obsidian";
import { symbolCategories } from './symbols';
import { translations } from './lang';
import MyPlugin from "./main";

// 为我们的视图定义一个唯一的标识符
// Define a unique identifier for our view.
export const MY_VIEW_TYPE = "latex-panel-view";

// 视图的主类定义
// The main class definition for our view.
export class MyView extends ItemView {
    // 类的私有属性，用于存储状态
    // Private properties of the class to store its state.
    private plugin: MyPlugin;
    private currentCategory: string;
    private searchTerm: string;

    // 构造函数，在创建视图实例时调用
    // The constructor, called when a new view instance is created.
    constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentCategory = Object.keys(symbolCategories)[0] || ''; // 默认选中第一个分类
        this.searchTerm = '';
    }

    // 翻译辅助函数
    // Helper function for translation.
    t(key: keyof typeof translations['en']): string {
        const lang = this.plugin.settings.language;
        return translations[lang][key] || translations['en'][key];
    }

    // 返回视图的唯一标识符
    // Returns the view's unique identifier.
    getViewType(): string { return MY_VIEW_TYPE; }
    
    // 返回视图的显示标题
    // Returns the display title of the view.
    getDisplayText(): string { 
        return this.plugin.settings ? this.t("view_title") : "LaTeX Snippets";
    }

    // 当视图被打开时执行的核心方法
    // The core method that runs when the view is opened.
    async onOpen() {
        // 获取内容容器并清空
        // Get the content container and clear it.
        const container = this.contentEl;
        container.empty();
        
        // 创建UI控件（搜索、按钮、下拉菜单）
        // Create the UI controls (search, button, dropdown).
        this.setupControls(container);

        // 渲染符号网格
        // Render the symbol grid.
        this.renderSymbols(container);
    }

    // 私有方法：构建所有控制UI元素
    // Private method: builds all control UI elements.
    private setupControls(container: HTMLElement) {
        const controlsContainer = container.createDiv({ cls: "latex-controls-container" });
        const topRow = controlsContainer.createDiv({ cls: "latex-top-row" });
        
        // --- 搜索框 ---
        const searchInput = topRow.createEl("input", {
            type: "text",
            placeholder: this.t("search_placeholder"),
            cls: "latex-search-input"
        });

        // --- 弹出/停靠按钮 ---
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
        
        // --- 分类选择下拉菜单 ---
        const categorySelect = controlsContainer.createEl("select", { cls: "latex-category-select" });
        const categories = Object.keys(symbolCategories);
        categories.forEach(category => {
            const option = categorySelect.createEl("option");
            option.value = category;
            option.textContent = this.t(category as keyof typeof translations['en']);
        });

        // --- 事件监听 ---
        categorySelect.addEventListener("change", (e) => {
            this.currentCategory = (e.target as HTMLSelectElement).value;
            this.renderSymbols(container); // 重新渲染符号
        });

        searchInput.addEventListener("input", (e) => {
            this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            this.renderSymbols(container); // 重新渲染符号
        });
    }

    // 私有方法：渲染符号网格
    // Private method: renders the grid of symbols.
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
            const button = grid.createEl("button", { cls: "latex-symbol-button" });
            MarkdownRenderer.render(this.app, symbol.display, button, '', this);
            button.addEventListener("click", () => { this.insertText(symbol.code); });
        });
    }

    // --- 视图动作的私有方法 ---
    private async popoutView() {
        const newLeaf = this.app.workspace.openPopoutLeaf();
        await newLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
        this.leaf.detach();
    }

    private async dockView() {
        const rightLeaf = this.app.workspace.getRightLeaf(false);
        if(rightLeaf) {
            await rightLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
            this.app.workspace.revealLeaf(rightLeaf);
            this.leaf.detach();
        }
    }

    // 插入文本到编辑器的方法
    // Method to insert text into the editor.
    insertText(textToInsert: string) {
        let editor: Editor | null = null;
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            editor = activeView.editor;
        } else {
            // 如果没有激活的编辑器，就遍历查找一个
            // If no editor is active, iterate to find one.
            this.app.workspace.iterateAllLeaves(leaf => {
                if (editor) return;
                if (leaf.view instanceof MarkdownView) {
                    editor = leaf.view.editor;
                }
            });
        }

        if (editor) {
            editor.replaceSelection(textToInsert); // 插入文本
            editor.focus(); // 将焦点交还给编辑器
        } else {
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }

    // 视图关闭时执行
    // Runs when the view is closed.
    async onClose() {}
}