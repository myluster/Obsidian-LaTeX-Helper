// main.ts
import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, Notice, getLanguage } from 'obsidian';
import { LatexHelperView, LATEX_HELPER_VIEW_TYPE } from './latex-panel-view';
import { DEFAULT_SYMBOLS, SymbolDefinition } from './symbols';
import { translations, TranslationKey } from './lang';

// 声明全局 window 扩展 (用于 moment)
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        moment: any;
    }
}

// 定义设置接口
export interface LatexHelperSettings {
    symbols: Record<string, SymbolDefinition[]>;
}

// 默认设置
const DEFAULT_SETTINGS: LatexHelperSettings = {
    symbols: DEFAULT_SYMBOLS
}

export default class LatexHelperPlugin extends Plugin {
    settings: LatexHelperSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(
            LATEX_HELPER_VIEW_TYPE,
            (leaf) => new LatexHelperView(leaf, this)
        );

        this.addCommand({
            id: 'open-latex-panel',
            name: 'Open LaTeX panel',
            callback: () => {
                void this.activateView();
            }
        });

        this.addRibbonIcon("sigma", "Open LaTeX panel", () => {
            void this.activateView();
        });

        this.addSettingTab(new LatexHelperSettingTab(this.app, this));
    }

    async activateView() {
        const { workspace } = this.app;
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(LATEX_HELPER_VIEW_TYPE);

        if (leaves.length > 0) {
            leaf = leaves[0];
        } else {
            leaf = workspace.getRightLeaf(false);
            if (leaf) {
                await leaf.setViewState({
                    type: LATEX_HELPER_VIEW_TYPE,
                    active: true,
                });
            }
        }

        if (leaf) {
            await workspace.revealLeaf(leaf);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        const leaves = this.app.workspace.getLeavesOfType(LATEX_HELPER_VIEW_TYPE);
        leaves.forEach(leaf => {
            if (leaf.view instanceof LatexHelperView) {
                leaf.view.refresh();
            }
        });
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(LATEX_HELPER_VIEW_TYPE);
    }
}

// 设置页：JSON 编辑器
class LatexHelperSettingTab extends PluginSettingTab {
    plugin: LatexHelperPlugin;
    private currentLang: 'zh' | 'en' = 'en';

    constructor(app: App, plugin: LatexHelperPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    private t(key: TranslationKey): string {
        return translations[this.currentLang][key] || translations['en'][key] || key;
    }

    private updateLanguage() {
        let lang: string | null = null;
        try { lang = getLanguage(); } catch (e) { /* ignore */ }
        if (!lang && window.moment) lang = window.moment.locale();
        if (!lang) lang = window.localStorage.getItem('language');
        
        if (lang && lang.toLowerCase().startsWith('zh')) {
            this.currentLang = 'zh';
        } else {
            this.currentLang = 'en';
        }
    }

    display(): void {
        this.updateLanguage();

        const {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: this.t('settings_title')});

        new Setting(containerEl)
            .setName(this.t('settings_json_name'))
            .setDesc(this.t('settings_json_desc'))
            .setClass('latex-helper-json-setting');

        const jsonTextArea = new Setting(containerEl)
            .addTextArea(text => text
                .setPlaceholder('Paste your JSON here...')
                .setValue(JSON.stringify(this.plugin.settings.symbols, null, 2))
                .onChange(async (value) => {
                    try {
                        const parsed = JSON.parse(value);
                        this.plugin.settings.symbols = parsed;
                        await this.plugin.saveSettings();
                    } catch (e) {
                        console.warn(this.t('json_error'));
                    }
                }));
        
        const textAreaEl = jsonTextArea.controlEl.querySelector('textarea');
        if (textAreaEl) {
            textAreaEl.style.height = '300px';
            textAreaEl.style.width = '100%';
        }

        new Setting(containerEl)
            .setName(this.t('settings_reset_name'))
            .setDesc(this.t('settings_reset_desc'))
            .addButton(button => button
                .setButtonText(this.t('settings_reset_btn'))
                .setWarning()
                .onClick(async () => {
                    if(confirm(this.t('settings_reset_confirm'))) {
                        this.plugin.settings.symbols = DEFAULT_SYMBOLS;
                        await this.plugin.saveSettings();
                        this.display();
                        new Notice(this.t('settings_reset_success'));
                    }
                }));
    }
}