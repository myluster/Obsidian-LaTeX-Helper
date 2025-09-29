import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer, setIcon, WorkspaceWindow } from "obsidian";
import { symbolCategories } from './symbols';
import { translations } from './lang';
import MyPlugin from "./main"; // 导入插件主类

export const MY_VIEW_TYPE = "latex-panel-view";

export class MyView extends ItemView {
    private plugin: MyPlugin; // 存储插件实例
    private currentTab: string;
    private searchTerm: string;

    // 接收插件实例
    constructor(leaf: WorkspaceLeaf, plugin: MyPlugin) {
        super(leaf);
        this.plugin = plugin;
        this.currentTab = Object.keys(symbolCategories)[0] || '';
        this.searchTerm = '';
    }

    // 翻译辅助函数
    t(key: keyof typeof translations['en']): string {
        const lang = this.plugin.settings.language;
        return translations[lang][key] || translations['en'][key];
    }

    getViewType(): string { return MY_VIEW_TYPE; }
    
    getDisplayText(): string { 
        return this.plugin.settings ? this.t("view_title") : "LaTeX Snippets";
    }

    async onOpen() {
        const container = this.contentEl;
        container.empty();
        
        const searchContainer = container.createDiv({ cls: "latex-search-container" });
        const tabContainer = container.createDiv({ cls: "latex-tab-container" });
        const contentContainer = container.createDiv({ cls: "latex-content-container" });

        const searchInput = searchContainer.createEl("input", {
            type: "text",
            placeholder: this.t("search_placeholder"),
            cls: "latex-search-input"
        });

        const isPopout = this.leaf.getRoot() instanceof WorkspaceWindow;
        
        if (isPopout) {
            const dockButton = searchContainer.createEl("button", { cls: "latex-action-button" });
            setIcon(dockButton, "panel-left-close");
            dockButton.ariaLabel = this.t("dock_tooltip");
            dockButton.addEventListener("click", async () => {
                const rightLeaf = this.app.workspace.getRightLeaf(false);
                if(rightLeaf) {
                    await rightLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
                    this.app.workspace.revealLeaf(rightLeaf);
                    this.leaf.detach();
                }
            });
        } else {
            const popoutButton = searchContainer.createEl("button", { cls: "latex-action-button" });
            setIcon(popoutButton, "popup-open");
            popoutButton.ariaLabel = this.t("popout_tooltip");
            popoutButton.addEventListener("click", async () => {
                const newLeaf = this.app.workspace.openPopoutLeaf();
                await newLeaf.setViewState({ type: MY_VIEW_TYPE, active: true });
                this.leaf.detach();
            });
        }

        const categories = Object.keys(symbolCategories);
        categories.forEach(category => {
            const tabButton = tabContainer.createEl("button", { 
                text: this.t(category as keyof typeof translations['en']), 
                cls: "latex-tab-button" 
            });
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
            activeView.editor.replaceSelection(textToInsert+' ');
            activeView.editor.focus();
        } else {
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }

    async onClose() {}
}