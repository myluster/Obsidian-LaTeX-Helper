// latex-panel-view.ts (最终修正版)

import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer, setIcon, WorkspaceWindow } from "obsidian";
import { symbolCategories } from './symbols';
import { translations } from './lang';
import MyPlugin from "./main";

export const MY_VIEW_TYPE = "latex-panel-view";

export class MyView extends ItemView {
    private plugin: MyPlugin;
    private currentTab: string;
    private searchTerm: string;

    constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentTab = Object.keys(symbolCategories)[0] || '';
        this.searchTerm = '';
    }

    t(key: keyof typeof translations['en']): string {
        const lang = this.plugin.settings.language;
        return translations[lang][key] || translations['en'][key];
    }

    getViewType(): string { return MY_VIEW_TYPE; }
    
    getDisplayText(): string { 
        return this.plugin.settings ? this.t("view_title") : "LaTeX Snippets";
    }

    async onOpen() {
        // ... 此方法无需改动 ...
        const container = this.contentEl;
        container.empty();
        
        const controlsContainer = container.createDiv({ cls: "latex-controls-container" });
        const topRow = controlsContainer.createDiv({ cls: "latex-top-row" });
        const contentContainer = container.createDiv({ cls: "latex-content-container" });

          const searchInput = topRow.createEl("input", {
            type: "text",
            placeholder: this.t("search_placeholder"),
            cls: "latex-search-input"
        });

        const isPopout = this.leaf.getRoot() instanceof WorkspaceWindow;
        const actionButton = topRow.createEl("button", { cls: "latex-action-button" });

        if (isPopout) {
            setIcon(actionButton, "panel-left-close");
            actionButton.ariaLabel = this.t("dock_tooltip");
            actionButton.addEventListener("click", async () => {
                const rightLeaf = this.app.workspace.getRightLeaf(false);
                if(rightLeaf) {
                    await rightLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
                    this.app.workspace.revealLeaf(rightLeaf);
                    this.leaf.detach();
                }
            });
        } else {
            setIcon(actionButton, "popup-open");
            actionButton.ariaLabel = this.t("popout_tooltip");
            actionButton.addEventListener("click", async () => {
                const newLeaf = this.app.workspace.openPopoutLeaf();
                await newLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
                this.leaf.detach();
            });
        }
        
        const categorySelect = controlsContainer.createEl("select", { cls: "latex-category-select" });
        const categories = Object.keys(symbolCategories);

        categories.forEach(category => {
            const option = categorySelect.createEl("option");
            option.value = category;
            option.textContent = this.t(category as keyof typeof translations['en']);
        });

        categorySelect.addEventListener("change", (e) => {
            this.currentTab = (e.target as HTMLSelectElement).value;
            this.renderContent(contentContainer);
        });

        searchInput.addEventListener("input", (e) => {
            this.searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
            this.renderContent(contentContainer);
        });

        this.renderContent(contentContainer);
    }

    renderContent(contentContainer: HTMLDivElement) {
        // ... 此方法无需改动 ...
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

    // --- 核心修改：恢复使用您提供的、更稳健的 insertText 方法 ---
    insertText(textToInsert: string) {
        let editor: Editor | null = null;

        // 1. 采用更强大的编辑器查找逻辑
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            editor = activeView.editor;
        } else {
            // 如果没有激活的视图，就遍历所有视图寻找一个可用的
            this.app.workspace.iterateAllLeaves(leaf => {
                if (editor) return;
                if (leaf.view instanceof MarkdownView) {
                    editor = leaf.view.editor;
                }
            });
        }

        if (editor) {
            editor.replaceSelection(textToInsert);
            
            // 3. 使用直接的 focus() 调用，因为它在此逻辑下是有效的
            editor.focus();

        } else {
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }
    // --- 修改结束 ---

    async onClose() {}
}