// main.ts

// 导入 Obsidian API 的核心模块和我们自定义的视图文件
// Import core modules from the Obsidian API and our custom view file
import { App, Plugin, PluginSettingTab, Setting, Notice } from 'obsidian';
import { LatexHelperView, LATEX_HELPER_VIEW_TYPE } from './latex-panel-view';
import { translations, TranslationKey } from './lang';

// 1. 定义插件设置的接口，确保类型安全
// 1. Define the interface for our plugin settings for type safety.
interface LatexHelperSettings {
    language: 'en' | 'zh';
}

// 2. 定义 Electron Shell 接口以获得类型安全
// 2. Define Electron Shell interface for type safety
interface ElectronShell {
    openPath(path: string): Promise<string>;
}

// 3. 定义带有 Electron 的 Window 对象接口
// 3. Define Window object interface with Electron
interface ElectronWindow extends Window {
    electron?: {
        shell?: ElectronShell;
    };
}

// 4. 定义带有 basePath 的 Adapter 接口
// 4. Define Adapter interface with basePath property
interface AdapterWithBasePath {
    basePath?: string;
}

// 5. 提供默认设置，当用户首次安装插件时使用
// 5. Provide default settings for when the user first installs the plugin.
const DEFAULT_SETTINGS: LatexHelperSettings = {
    language: 'zh'
}

// 6. 插件的主类，继承自 Obsidian 的 Plugin 类
// 6. The main class of the plugin, extending Obsidian's Plugin class (Renamed).
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
            void this.activateView();
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

        // 在右侧边栏获取一个新的或已存在的"叶子"（窗口）
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

// 7. 设置页面的类定义
// 7. The class definition for the settings tab (Renamed).
class LatexHelperSettingTab extends PluginSettingTab {
    plugin: LatexHelperPlugin;

    constructor(app: App, plugin: LatexHelperPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    private t(key: TranslationKey): string {
        return translations[this.plugin.settings.language][key] || translations['en'][key];
    }

    // 将相对路径转换为绝对路径
    // Convert relative path to absolute path
    private getAbsolutePath(relativePath: string): string {
        // 从 vault adapter 获取绝对基础路径
        // Get absolute base path from vault adapter
        const adapter = this.app.vault.adapter as AdapterWithBasePath;
        const baseDir = adapter.basePath;
        
        if (!baseDir) {
            console.error('Cannot get vault basePath');
            return relativePath;
        }
        
        // 使用平台正确的路径分隔符
        // Use correct path separator for the platform
        const separator = process.platform === 'win32' ? '\\' : '/';
        
        // 移除相对路径开头的 ./
        // Remove leading ./ from relative path
        const cleanPath = relativePath.replace(/^\.\//, '');
        
        // 在 Windows 上，确保使用反斜杠
        // On Windows, ensure backslashes are used
        if (process.platform === 'win32') {
            const normalizedPath = cleanPath.replace(/\//g, '\\');
            return `${baseDir}${separator}${normalizedPath}`;
        }
        
        // 在 Unix/Mac 上，使用正斜杠
        // On Unix/Mac, use forward slashes
        return `${baseDir}${separator}${cleanPath}`;
    }

    // 尝试使用原生方式打开文件夹
    // Try to open folder using native method (electron - only on desktop)
    private async openConfigFolder(pluginPath: string): Promise<boolean> {
        try {
            // 获取绝对路径
            // Get absolute path
            const absolutePath = this.getAbsolutePath(pluginPath);
            console.log('Opening path:', absolutePath);
            
            // 在浏览器环境中动态加载electron模块
            // Dynamically load electron module in browser environment
            const electronWindow = window as ElectronWindow;
            if (typeof electronWindow !== 'undefined' && electronWindow.electron) {
                const shell = electronWindow.electron.shell;
                if (shell && typeof shell.openPath === 'function') {
                    await shell.openPath(absolutePath);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Failed to open with native method:', error);
            return false;
        }
    }

    // 生成适配不同平台的文件 URI 格式
    // Generate platform-adapted file URI format
    private getFileUriForPlatform(path: string): string {
        // 获取绝对路径
        // Get absolute path
        const absolutePath = this.getAbsolutePath(path);
        
        // 将反斜杠转换为正斜杠（URI 使用）
        // Convert backslashes to forward slashes (for URI)
        const normalizedPath = absolutePath.replace(/\\/g, '/');
        
        // 确保以 file:// 开头
        // Ensure it starts with file://
        if (normalizedPath.startsWith('file://')) {
            return normalizedPath;
        }
        
        // 对于 Windows 路径（C:/path），添加额外的 /
        // For Windows paths (C:/path), add extra /
        if (normalizedPath.match(/^[a-zA-Z]:/)) {
            return `file:///${normalizedPath}`;
        }
        
        // 对于 Unix 路径，直接添加 file://
        // For Unix paths, directly add file://
        return `file://${normalizedPath}`;
    }

    // `display` 方法用于构建设置页面的 UI
    // The `display` method builds the UI for the settings tab.
    display(): void {
        const {containerEl} = this;
        containerEl.empty();
        new Setting(containerEl)
            .setHeading()
            .setName(this.t('settings_title'));

        new Setting(containerEl)
            .setName(this.t('language_setting'))
            .setDesc(this.t('language_desc'))
            .addDropdown(dropdown => dropdown
                .addOption('zh', '中文')
                .addOption('en', 'English')
                .setValue(this.plugin.settings.language)
                .onChange(async (value: 'zh' | 'en') => {
                    this.plugin.settings.language = value;
                    await this.plugin.saveSettings();
                    // 重新渲染设置页面以更新语言
                    this.display();
                    await this.plugin.activateView();
                }));

        new Setting(containerEl)
            .setName(this.t('symbol_config'))
            .setDesc(this.t('symbol_config_desc'))
            .addButton(button => button
                .setButtonText(this.t('open_config_button'))
                .onClick(async () => {
                    try {
                        const pluginPath = `${this.app.vault.configDir}/plugins/Obsidian-LaTeX-Helper`;
                        
                        // 首先尝试使用原生方法打开
                        // First, try to open using native method
                        const opened = await this.openConfigFolder(pluginPath);
                        
                        if (opened) {
                            new Notice(this.t('config_opened'));
                        } else {
                            // 如果原生方法失败，复制文件路径到剪贴板
                            // If native method fails, copy file path to clipboard
                            const fileUri = this.getFileUriForPlatform(pluginPath);
                            await navigator.clipboard.writeText(fileUri);
                            new Notice(this.t('path_copied'));
                        }
                    } catch (error) {
                        new Notice(this.t('config_error'));
                        console.error('Failed to open plugin folder:', error);
                    }
                })
            );
    }
}