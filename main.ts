// main.ts

import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { MyView, MY_VIEW_TYPE } from './latex-panel-view';

// 1. 定义设置项的接口
interface MyPluginSettings {
	language: 'en' | 'zh';
}

// 2. 提供默认设置
const DEFAULT_SETTINGS: MyPluginSettings = {
	language: 'zh'
}

export default class MyPlugin extends Plugin {
	// 3. 添加一个属性来存储设置
	settings: MyPluginSettings;

	async onload() {
		// 加载设置
		await this.loadSettings();

		this.registerView(
			MY_VIEW_TYPE,
			// 4. 将插件实例 (this) 传递给 View，让 View 能访问设置
			(leaf) => new MyView(leaf, this)
		);

		this.addRibbonIcon("sigma", "打开 LaTeX 面板", () => {
			this.activateView();
		});

		// 5. 添加设置页面
		this.addSettingTab(new MySettingTab(this.app, this));
	}

	async activateView() {
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

	// 6. 加载和保存设置的方法
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {}
}

// 7. 创建设置页面的类
class MySettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		containerEl.createEl('h2', {text: 'LaTeX 助手设置'});

		new Setting(containerEl)
			.setName('语言 (Language)')
			.setDesc('选择插件界面的显示语言。')
			.addDropdown(dropdown => dropdown
				.addOption('zh', '中文')
				.addOption('en', 'English')
				.setValue(this.plugin.settings.language)
				.onChange(async (value: 'zh' | 'en') => {
					this.plugin.settings.language = value;
					await this.plugin.saveSettings();
					// 刷新视图以应用语言更改
					this.plugin.activateView();
				}));
	}
}