// lang.ts
export type TranslationKey = 
    | "view_title" | "search_placeholder" | "popout_tooltip" | "dock_tooltip"
    | "greek_letters" | "operators_and_relations" | "arrows" | "delimiters"
    | "maths_constructs" | "variable_sized_symbols" | "standard_functions"
    | "letter_styles" | "misc" | "matrices" | "environments"
    | "settings_title" | "settings_json_name" | "settings_json_desc" 
    | "settings_reset_name" | "settings_reset_desc" | "settings_reset_btn" 
    | "settings_reset_confirm" | "settings_reset_success" | "json_error";

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
        "settings_title": "LaTeX Helper Configuration",
        "settings_json_name": "Symbol Configuration (JSON)",
        "settings_json_desc": "Edit the JSON below to customize symbols. Be careful with the syntax!",
        "settings_reset_name": "Reset to Defaults",
        "settings_reset_desc": "Restore original symbol list. This will overwrite your changes.",
        "settings_reset_btn": "Reset",
        "settings_reset_confirm": "Are you sure you want to reset all symbols to default?",
        "settings_reset_success": "Symbols reset to default.",
        "json_error": "Invalid JSON syntax"
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
        "settings_title": "LaTeX 助手配置",
        "settings_json_name": "符号配置 (JSON)",
        "settings_json_desc": "在下方编辑 JSON 以自定义符号。请注意保持语法格式正确！",
        "settings_reset_name": "重置为默认",
        "settings_reset_desc": "恢复初始符号列表。这将覆盖您的所有更改。",
        "settings_reset_btn": "重置",
        "settings_reset_confirm": "确定要将所有符号重置为默认值吗？",
        "settings_reset_success": "符号已重置为默认值。",
        "json_error": "JSON 语法错误"
	}
};