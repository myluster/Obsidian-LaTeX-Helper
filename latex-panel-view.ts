import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer } from "obsidian";
import { symbolCategories } from './symbols';

export const MY_VIEW_TYPE = "latex-panel-view";

export class MyView extends ItemView {
    // 新增两个属性，用来存储当前的状态
    private currentTab: string; // 当前选中的标签页名称
    private searchTerm: string; // 当前搜索框里的文本

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.currentTab = Object.keys(symbolCategories)[0] || ''; // 默认选中第一个标签
        this.searchTerm = ''; // 默认搜索词为空
    }

    getViewType(): string {
        return MY_VIEW_TYPE;
    }

    getDisplayText(): string {
        return "LaTeX 片段";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();

        // --- UI 布局 ---
        const searchContainer = container.createDiv({ cls: "latex-search-container" });
        const tabContainer = container.createDiv({ cls: "latex-tab-container" });
        const contentContainer = container.createDiv({ cls: "latex-content-container" });

        // --- 1. 创建搜索框 ---
        const searchInput = searchContainer.createEl("input", {
            type: "text",
            placeholder: "搜索符号代码...",
            cls: "latex-search-input"
        });

        // --- 2. 创建标签页按钮 ---
        const categories = Object.keys(symbolCategories);
        categories.forEach(category => {
            const tabButton = tabContainer.createEl("button", { text: category, cls: "latex-tab-button" });
            if (category === this.currentTab) {
                tabButton.addClass("is-active"); // 设置默认激活的标签
            }

            tabButton.addEventListener("click", () => {
                this.currentTab = category; // 更新当前选中的标签状态
                this.renderContent(tabContainer, contentContainer); // 重新渲染内容
            });
        });

        // --- 3. 监听搜索框输入事件 ---
        searchInput.addEventListener("input", (e) => {
            this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase(); // 更新搜索词状态
            this.renderContent(tabContainer, contentContainer); // 根据新搜索词重新渲染内容
        });

        // --- 4. 初始渲染 ---
        this.renderContent(tabContainer, contentContainer);
    }

    // --- 核心重构：独立的渲染函数 ---
    renderContent(tabContainer: HTMLDivElement, contentContainer: HTMLDivElement) {
        // 更新标签按钮的激活状态
        tabContainer.findAll(".latex-tab-button").forEach(btn => {
            if (btn.textContent === this.currentTab) {
                btn.addClass("is-active");
            } else {
                btn.removeClass("is-active");
            }
        });

        // 清空旧的内容
        contentContainer.empty();
        
        // 获取当前标签页对应的符号列表
        const symbols = symbolCategories[this.currentTab as keyof typeof symbolCategories];
        if (!symbols) return;

        // 根据搜索词进行过滤
        const filteredSymbols = symbols.filter(symbol => 
            symbol.code.toLowerCase().includes(this.searchTerm)
        );

        // 创建网格并渲染过滤后的符号按钮
        const grid = contentContainer.createDiv({ cls: "latex-grid" });
        filteredSymbols.forEach(symbol => {
            const button = grid.createEl("button");
            button.addClass("latex-symbol-button");
            MarkdownRenderer.render(this.app, symbol.display, button, '', this);
            button.addEventListener("click", () => {
                this.insertText(symbol.code);
            });
        });
    }

    insertText(textToInsert: string) {
        // 这个函数依然完美，无需改动
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
            editor.replaceSelection(textToInsert);
            editor.focus();
        } else {
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }

    async onClose() {}
}