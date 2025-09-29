// 步骤 1: 在顶部的 import 语句中，加入 "Editor"
import { ItemView, WorkspaceLeaf, MarkdownView, Editor } from "obsidian";

// 视图的唯一标识符
export const MY_VIEW_TYPE = "latex-panel-view";

// LaTex 符号定义
const latexSymbols = [
    { display: "α", code: "\\alpha" },
    { display: "β", code: "\\beta" },
    { display: "∑", code: "\\sum" },
    { display: "→", code: "\\to" },
    { display: "x²", code: "x^{2}" },
    { display: "frac", code: "\\frac{}{}" },
];

export class MyView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return MY_VIEW_TYPE;
    }

    getDisplayText(): string {
        return "LaTeX Panel";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: "LaTeX Symbols" });

        const buttonContainer = container.createDiv({ cls: "latex-button-grid" });

        latexSymbols.forEach(symbol => {
            const button = buttonContainer.createEl("button", { text: symbol.display });
            
            button.addEventListener("click", () => {
                this.insertText(symbol.code);
            });
        });
    }

    insertText(textToInsert: string) {
        // 步骤 2: 在这里为 editor 变量添加明确的类型注解
        let editor: Editor | null = null;

        // 方法1：首先尝试获取“活动”的 Markdown 视图
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            editor = activeView.editor;
        } else {
            // 方法2 (备用方案)：如果方法1失败, 遍历所有窗口找到第一个笔记窗口
            this.app.workspace.iterateAllLeaves(leaf => {
                if (editor) return; 
                if (leaf.view instanceof MarkdownView) {
                    editor = leaf.view.editor;
                }
            });
        }

        if (editor) {
            editor.replaceSelection(textToInsert);
        } else {
            // 如果所有方法都失败了，给出一个错误提示
            console.error("未能找到任何可以写入的笔记编辑器。");
        }
    }

    async onClose() {
        // 清理工作
    }
}