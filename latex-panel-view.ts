// latex-panel-view.ts

import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer, setIcon } from "obsidian";
import { symbolCategories } from './symbols';

export const MY_VIEW_TYPE = "latex-panel-view";

export class MyView extends ItemView {
    private currentTab: string;
    private searchTerm: string;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.currentTab = Object.keys(symbolCategories)[0] || '';
        this.searchTerm = '';
    }

    getViewType(): string { return MY_VIEW_TYPE; }
    getDisplayText(): string { return "LaTeX 片段"; }

    async onOpen() {
        const container = this.contentEl;
        container.empty();
        
        const searchContainer = container.createDiv({ cls: "latex-search-container" });
        const tabContainer = container.createDiv({ cls: "latex-tab-container" });
        const contentContainer = container.createDiv({ cls: "latex-content-container" });

        const searchInput = searchContainer.createEl("input", {
            type: "text",
            placeholder: "搜索符号代码...",
            cls: "latex-search-input"
        });

        // --- 核心修改：移除所有判断，只保留创建“弹出”按钮的功能 ---
        const popoutButton = searchContainer.createEl("button", { cls: "latex-action-button" });
        setIcon(popoutButton, "popup-open");
        popoutButton.ariaLabel = "在浮动窗口中打开";
        
        popoutButton.addEventListener("click", async () => {
            const newLeaf = this.app.workspace.openPopoutLeaf();
            await newLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
            this.leaf.detach(); // 关闭当前视图（无论是在侧边栏还是另一个浮动窗口）
        });

        const categories = Object.keys(symbolCategories);
        categories.forEach(category => {
            const tabButton = tabContainer.createEl("button", { text: category, cls: "latex-tab-button" });
            tabButton.addEventListener("click", () => {
                this.currentTab = category;
                this.renderContent(tabContainer, contentContainer);
            });
        });

        searchInput.addEventListener("input", (e) => {
            this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            this.renderContent(tabContainer, contentContainer);
        });

        this.renderContent(tabContainer, contentContainer);
    }

    renderContent(tabContainer: HTMLDivElement, contentContainer: HTMLDivElement) {
        tabContainer.findAll(".latex-tab-button").forEach(btn => {
            if (btn.textContent === this.currentTab) btn.addClass("is-active");
            else btn.removeClass("is-active");
        });

        contentContainer.empty();
        const symbols = symbolCategories[this.currentTab as keyof typeof symbolCategories];
        if (!symbols) return;

        const filteredSymbols = symbols.filter(symbol => 
            symbol.code.toLowerCase().includes(this.searchTerm)
        );

        const grid = contentContainer.createDiv({ cls: "latex-grid" });
        filteredSymbols.forEach(symbol => {
            const button = grid.createEl("button");
            button.addClass("latex-symbol-button");
            MarkdownRenderer.render(this.app, symbol.display, button, '', this);
            button.addEventListener("click", () => { this.insertText(symbol.code); });
        });
    }

    insertText(textToInsert: string) {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            activeView.editor.replaceSelection(textToInsert);
            activeView.editor.focus();
        } else {
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }

    async onClose() {}
}