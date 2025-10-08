// main.ts

// 导入 Obsidian API 的核心模块和我们自定义的视图文件
// Import core modules from the Obsidian API and our custom view file
import { App, Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import { LatexHelperView, LATEX_HELPER_VIEW_TYPE } from './latex-panel-view';
import { translations } from './lang';

// 1. 定义插件设置的接口，确保类型安全
// 1. Define the interface for our plugin settings for type safety.
interface LatexHelperSettings {
    language: 'en' | 'zh';
}

// 2. 提供默认设置，当用户首次安装插件时使用
// 2. Provide default settings for when the user first installs the plugin.
const DEFAULT_SETTINGS: LatexHelperSettings = {
    language: 'zh'
}

// 3. 插件的主类，继承自 Obsidian 的 Plugin 类
// 3. The main class of the plugin, extending Obsidian's Plugin class (Renamed).
export default class LatexHelperPlugin extends Plugin {
    // 存储插件的设置
    // Holds the plugin's settings.
    settings: LatexHelperSettings;

    // `onload` 是插件生命周期函数，在插件启动时执行
    // `onload` is a lifecycle method that runs when the plugin is enabled.
    async onload() {
        // 加载已保存的设置，如果不存在则使用默认设置
        // Load saved settings, or use defaults if none exist.
        await this.loadSettings();

        // 注册我们的自定义视图
        // Register our custom view.
        this.registerView(
            LATEX_HELPER_VIEW_TYPE,
            // 当需要创建视图实例时，调用这个函数
            // This function is called when a view instance needs to be created.
            (leaf) => new LatexHelperView(leaf, this) // 将插件实例 (this) 传递给视图，以便视图能访问设置
        );

        // 在左侧功能区添加一个图标按钮，用于打开我们的视图
        // Add a ribbon icon to the left bar to open our view.
        this.addRibbonIcon("sigma", "打开 LaTeX 面板", () => {
            this.activateView();
        });

        // 添加一个设置页面，让用户可以配置插件
        // Add a settings tab so the user can configure the plugin (Using new class name).
        this.addSettingTab(new LatexHelperSettingTab(this.app, this));
    }

    // 激活并显示视图的函数
    // A function to activate and reveal our view.
    async activateView() {
        // 为确保只有一个实例，先分离所有同类型的视图
        // To ensure there's only one instance, detach all leaves of the same type first.
        this.app.workspace.detachLeavesOfType(LATEX_HELPER_VIEW_TYPE);

        // 在右侧边栏获取一个新的或已存在的“叶子”（窗口）
        // Get a new or existing leaf in the right sidebar.
        const leaf = this.app.workspace.getRightLeaf(false);
        if (leaf) {
            // 将叶子的状态设置为我们的自定义视图
            // Set the leaf's state to our custom view.
            await leaf.setViewState({
                type: LATEX_HELPER_VIEW_TYPE,
                active: true,
            });
            // 确保侧边栏是展开并显示我们的视图的
            // Make sure the sidebar is revealed to show our view.
            this.app.workspace.revealLeaf(leaf); 
        }
    }

    // 从 data.json 文件异步加载设置
    // Asynchronously load settings from the data.json file.
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    // 将当前设置异步保存到 data.json 文件
    // Asynchronously save the current settings to the data.json file.
    async saveSettings() {
        await this.saveData(this.settings);
    }

    // `onunload` 是插件生命周期函数，在插件禁用时执行（用于清理工作）
    // `onunload` is a lifecycle method that runs when the plugin is disabled (for cleanup).
    onunload() {}
}

// 4. 设置页面的类定义
// 4. The class definition for the settings tab (Renamed).
class LatexHelperSettingTab extends PluginSettingTab {
    plugin: LatexHelperPlugin;

    constructor(app: App, plugin: LatexHelperPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 翻译辅助函数
    // Helper function for translation.
    t(key: keyof typeof translations['en']): string {
        const lang = this.plugin.settings.language;
        return translations[lang][key] || translations['en'][key];
    }

    // `display` 方法用于构建设置页面的 UI
    // The `display` method builds the UI for the settings tab.
    display(): void {
        const {containerEl} = this; // 获取容器元素
        containerEl.empty(); // 清空，防止重复渲染
        containerEl.createEl('h2', {text: 'LaTeX 助手设置'}); // 添加标题

        // 创建一个新的设置项
        // Create a new setting item.
        new Setting(containerEl)
            .setName('语言 (Language)') // 设置项名称
            .setDesc('选择插件界面的显示语言。') // 设置项描述
            .addDropdown(dropdown => dropdown // 添加一个下拉菜单
                .addOption('zh', '中文')
                .addOption('en', 'English')
                .setValue(this.plugin.settings.language) // 设置当前值
                .onChange(async (value: 'zh' | 'en') => { // 当值改变时
                    this.plugin.settings.language = value; // 更新设置
                    await this.plugin.saveSettings(); // 保存设置
                    this.plugin.activateView(); // 重新激活视图以应用语言更改
                }));

        // 创建编辑符号配置的设置项
        // Create a setting item to edit symbols configuration.
        new Setting(containerEl)
            .setName(this.t('edit_symbols_name'))
            .setDesc(this.t('edit_symbols_desc'))
            .addButton(button => button
                .setButtonText(this.t('edit_symbols_button'))
                .setCta()
                .onClick(async () => {
                    try {
                        // 获取插件的基础路径
                        // Get the plugin's base path.
                        const adapter = this.app.vault.adapter;
                        // @ts-ignore - accessing plugin manifest path
                        const pluginDir = this.plugin.manifest.dir || '';
                        const symbolsPath = `${pluginDir}/symbols.ts`;
                        
                        // 尝试打开文件
                        // Try to open the file.
                        const file = this.app.vault.getAbstractFileByPath(symbolsPath);
                        if (file) {
                            // 如果文件存在，在新标签页打开
                            // If file exists, open it in a new tab.
                            const leaf = this.app.workspace.getLeaf('tab');
                            await leaf.openFile(file as any);
                        } else {
                            // 如果无法找到文件，显示错误信息和路径
                            // If file cannot be found, show error with path.
                            new Notice(this.t('edit_symbols_error') + '\n' + symbolsPath);
                        }
                    } catch (error) {
                        console.error('Error opening symbols.ts:', error);
                        new Notice(this.t('edit_symbols_error'));
                    }
                }));
    }
}
