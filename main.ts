import { Plugin } from 'obsidian';
import { MyView, MY_VIEW_TYPE } from './latex-panel-view';

export default class MyPlugin extends Plugin {

	async onload() {
		this.registerView(
			MY_VIEW_TYPE,
			(leaf) => new MyView(leaf)
		);

		this.addRibbonIcon("sigma", "打开 LaTeX 面板", () => {
			this.activateView();
		});
	}

	async activateView() {
		// 确保同一时间只有一个视图实例
		this.app.workspace.detachLeavesOfType(MY_VIEW_TYPE);

		const leaf = this.app.workspace.getRightLeaf(false);
		if (leaf) {
			await leaf.setViewState({
				type: MY_VIEW_TYPE,
				active: true,
			});
			this.app.workspace.revealLeaf(leaf);
		}
	}

	onunload() {
		// 插件禁用时的清理工作
	}
}