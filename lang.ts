// lang.ts
export type TranslationKey = 
    | "view_title" | "search_placeholder" | "popout_tooltip" | "dock_tooltip"
    | "greek_letters" | "operators_and_relations" | "arrows" | "delimiters"
    | "maths_constructs" | "variable_sized_symbols" | "standard_functions"
    | "letter_styles" | "misc" | "matrices" | "environments"
    | "settings_title" | "language_setting" | "language_desc"
    | "symbol_config" | "symbol_config_desc" | "open_config_button"
    | "config_error" | "config_opened" | "path_copied";

export const translations: Record<'en' | 'zh', Record<TranslationKey, string>> = {
	en: {
		"view_title": "LaTeX Snippets",
		"search_placeholder": "Search symbol code...",
		"popout_tooltip": "Open in pop-out window",
		"dock_tooltip": "Dock to sidebar",
		"greek_letters": "Greek",
		"operators_and_relations": "Operators & Relations",
		"arrows": "Arrows",
		"delimiters": "Delimiters",
		"maths_constructs": "Maths Constructs",
		"variable_sized_symbols": "Variable-sized Symbols",
		"standard_functions": "Standard Functions",
		"letter_styles": "Letter Styles",
		"misc": "Miscellaneous",
		"matrices": "Matrices",
        "environments": "Environments",

		"settings_title": "LaTeX Helper Settings",
        "language_setting": "Language",
        "language_desc": "Choose the display language for the plugin interface.",
        "symbol_config": "Symbol Configuration",
        "symbol_config_desc": "Open the folder containing symbols.ts file to customize symbols and categories",
        "open_config_button": "Open Config Folder",
        "config_error": "Failed to open config folder. Please make sure it exists and you have permission to access it.",
        "config_opened": "Config folder opened successfully!",
        "path_copied": "Config folder path copied to clipboard. Please open it manually in your file explorer."
    },
	zh: {
		"view_title": "LaTeX 片段",
		"search_placeholder": "搜索符号代码...",
		"popout_tooltip": "在浮动窗口中打开",
		"dock_tooltip": "停靠至侧边栏",
		"greek_letters": "希腊字母",
		"operators_and_relations": "运算符与关系",
		"arrows": "箭头",
		"delimiters": "分隔符",
		"maths_constructs": "数学结构",
		"variable_sized_symbols": "可变大小符号",
		"standard_functions": "标准函数",
		"letter_styles": "字母样式",
		"misc": "杂项",
		"matrices": "矩阵",
        "environments": "数学环境",

		"settings_title": "LaTeX 助手设置",
        "language_setting": "语言 (Language)",
        "language_desc": "选择插件界面的显示语言。",
        "symbol_config": "符号配置",
        "symbol_config_desc": "打开 symbols.ts 文件所在文件夹以自定义符号和类别",
        "open_config_button": "打开配置文件夹",
        "config_error": "无法打开配置文件夹。请确保文件夹存在且有权限访问。",
        "config_opened": "配置文件夹已成功打开！",
        "path_copied": "配置文件夹路径已复制到剪贴板。请在文件浏览器中手动打开。"
	}
};