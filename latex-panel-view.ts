import { ItemView, WorkspaceLeaf, MarkdownView, Editor, MarkdownRenderer } from "obsidian";
import { symbolCategories } from './symbols';

export const MY_VIEW_TYPE = "latex-panel-view";

export class MyView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return MY_VIEW_TYPE;
    }

    getDisplayText(): string {
        return "LaTeX 片段"; // 更新一下显示名称
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();

        // --- 开始构建标签页 UI ---

        // 1. 创建标签页按钮的容器
        const tabContainer = container.createDiv({ cls: "latex-tab-container" });
        // 2. 创建存放所有分类内容的容器
        const contentContainer = container.createDiv({ cls: "latex-content-container" });

        const categories = Object.keys(symbolCategories);
        const contentDivs: { [key: string]: HTMLDivElement } = {};

        // 3. 遍历分类，创建对应的标签按钮和内容区域
        categories.forEach(category => {
            // 创建标签按钮
            const tabButton = tabContainer.createEl("button", { text: category, cls: "latex-tab-button" });
            
            // 创建该分类的内容 div
            const contentDiv = contentContainer.createDiv({ cls: "latex-grid" });
            contentDivs[category] = contentDiv;

            // 为该分类下的每个符号创建按钮
            symbolCategories[category as keyof typeof symbolCategories].forEach(symbol => {
                const button = contentDiv.createEl("button");
                button.addClass("latex-symbol-button");

                // 使用 MarkdownRenderer 实时渲染 LaTeX 公式！
                MarkdownRenderer.render(this.app, symbol.display, button, '', this);
                
                button.addEventListener("click", () => {
                    this.insertText(symbol.code);
                });
            });

            // 点击标签按钮时的切换逻辑
            tabButton.addEventListener("click", () => {
                // 移除所有按钮的激活状态
                tabContainer.findAll(".latex-tab-button").forEach(btn => btn.removeClass("is-active"));
                // 隐藏所有内容区域
                Object.values(contentDivs).forEach(div => div.style.display = "none");

                // 激活当前点击的按钮
                tabButton.addClass("is-active");
                // 显示当前分类的内容区域
                contentDivs[category].style.display = "grid";
            });
        });

        // 4. 默认激活第一个标签页
        if (categories.length > 0) {
            (tabContainer.firstChild as HTMLElement)?.click();
        }
    }

    insertText(textToInsert: string) {
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

    async onClose() {
        // 清理工作
    }
}