// main.ts

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
		this.app.workspace.detachLeavesOfType(MY_VIEW_TYPE);
		const leaf = this.app.workspace.getRightLeaf(false);
		if (leaf) {
			await leaf.setViewState({
				type: MY_VIEW_TYPE,
				active: true,
			});
			// 确保侧边栏在视图激活时总是可见的
			this.app.workspace.revealLeaf(leaf); 
		}
	}

	onunload() {}
}