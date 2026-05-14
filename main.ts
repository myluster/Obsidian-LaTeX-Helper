import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, Notice, Modal, MarkdownView } from 'obsidian';
import { LatexHelperView, LATEX_HELPER_VIEW_TYPE } from './latex-panel-view';
import { DEFAULT_SYMBOLS, SymbolDefinition } from './symbols';
import { t } from './lang';

export interface LatexHelperSettings {
    symbols: Record<string, SymbolDefinition[]>;
}

export default class LatexHelperPlugin extends Plugin {
    settings: LatexHelperSettings;
    lastActiveMarkdownView: MarkdownView | null = null;

    async onload() {
        await this.loadSettings();

        this.registerView(
            LATEX_HELPER_VIEW_TYPE,
            (leaf) => new LatexHelperView(leaf, this)
        );

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', (leaf) => {
                if (leaf?.view instanceof MarkdownView) {
                    this.lastActiveMarkdownView = leaf.view;
                }
            })
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
        const saved = await this.loadData() as Partial<LatexHelperSettings> | null;
        const merged: LatexHelperSettings = { symbols: {} };
        
        for (const category of Object.keys(DEFAULT_SYMBOLS)) {
            const defaultSymbols = DEFAULT_SYMBOLS[category];
            const savedSymbols = saved?.symbols?.[category];
            
            if (savedSymbols) {
                merged.symbols[category] = savedSymbols.map((savedSym, i) => {
                    const defaults = defaultSymbols[i];
                    if (defaults && defaults.code === savedSym.code) {
                        return { ...defaults, ...savedSym };
                    }
                    return savedSym;
                });
            } else {
                merged.symbols[category] = defaultSymbols;
            }
        }
        
        if (saved?.symbols) {
            for (const category of Object.keys(saved.symbols)) {
                if (!merged.symbols[category]) {
                    merged.symbols[category] = saved.symbols[category];
                }
            }
        }

        this.settings = merged;
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
        // Obsidian handles view detachment automatically
    }
}

class ConfirmModal extends Modal {
    private title: string;
    private content: string;
    private onConfirm: () => void | Promise<void>;

    constructor(app: App, title: string, content: string, onConfirm: () => void | Promise<void>) {
        super(app);
        this.title = title;
        this.content = content;
        this.onConfirm = onConfirm;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: this.title });
        contentEl.createDiv({ text: this.content });

        const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });

        new Setting(buttonContainer)
            .addButton(btn => btn
                .setButtonText('Cancel')
                .onClick(() => this.close()))
            .addButton(btn => btn
                .setButtonText('Confirm')
                .setWarning()
                .onClick(async () => {
                    await this.onConfirm();
                    this.close();
                }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class LatexHelperSettingTab extends PluginSettingTab {
    plugin: LatexHelperPlugin;

    constructor(app: App, plugin: LatexHelperPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName(t('settings_json_name'))
            .setDesc(t('settings_json_desc'));

        new Setting(containerEl)
            .setClass('latex-helper-json-textarea') 
            .addTextArea(text => text
                .setPlaceholder('Paste your JSON here...')
                .setValue(JSON.stringify(this.plugin.settings.symbols, null, 2))
                .onChange(async (value) => {
                    try {
                        const parsed = JSON.parse(value);
                        this.plugin.settings.symbols = parsed;
                        await this.plugin.saveSettings();
                    } catch { 
                        console.warn(t('json_error'));
                    }
                }));

        new Setting(containerEl)
            .setName(t('settings_reset_name'))
            .setDesc(t('settings_reset_desc'))
            .addButton(button => button
                .setButtonText(t('settings_reset_btn'))
                .setWarning()
                .onClick(() => {
                    new ConfirmModal(
                        this.app, 
                        t('settings_reset_name'),
                        t('settings_reset_confirm'),
                        async () => {
                            this.plugin.settings.symbols = DEFAULT_SYMBOLS;
                            await this.plugin.saveSettings();
                            this.display();
                            new Notice(t('settings_reset_success'));
                        }
                    ).open();
                }));
    }
}