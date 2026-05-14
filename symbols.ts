// symbols.ts
export interface SymbolDisplay {
    en: string;
    zh: string;
}

export interface SymbolDefinition {
    display: string | SymbolDisplay;
    code: string;
    cursorOffset?: number;
}

export const DEFAULT_SYMBOLS: Record<string, SymbolDefinition[]> = {
    "greek_letters": [
        // Lowercase
        { display: "$\\alpha$", code: "\\alpha" }, { display: "$\\beta$", code: "\\beta" }, { display: "$\\gamma$", code: "\\gamma" }, { display: "$\\delta$", code: "\\delta" }, { display: "$\\epsilon$", code: "\\epsilon" }, { display: "$\\zeta$", code: "\\zeta" }, { display: "$\\eta$", code: "\\eta" }, { display: "$\\theta$", code: "\\theta" }, { display: "$\\iota$", code: "\\iota" }, { display: "$\\kappa$", code: "\\kappa" }, { display: "$\\lambda$", code: "\\lambda" }, { display: "$\\mu$", code: "\\mu" }, { display: "$\\nu$", code: "\\nu" }, { display: "$\\xi$", code: "\\xi" }, { display: "$\\omicron$", code: "\\omicron" }, { display: "$\\pi$", code: "\\pi" }, { display: "$\\rho$", code: "\\rho" }, { display: "$\\sigma$", code: "\\sigma" }, { display: "$\\tau$", code: "\\tau" }, { display: "$\\upsilon$", code: "\\upsilon" }, { display: "$\\phi$", code: "\\phi" }, { display: "$\\chi$", code: "\\chi" }, { display: "$\\psi$", code: "\\psi" }, { display: "$\\omega$", code: "\\omega" },
        // Uppercase
        { display: "$\\Gamma$", code: "\\Gamma" }, { display: "$\\Delta$", code: "\\Delta" }, { display: "$\\Theta$", code: "\\Theta" }, { display: "$\\Lambda$", code: "\\Lambda" }, { display: "$\\Xi$", code: "\\Xi" }, { display: "$\\Pi$", code: "\\Pi" }, { display: "$\\Sigma$", code: "\\Sigma" }, { display: "$\\Upsilon$", code: "\\Upsilon" }, { display: "$\\Phi$", code: "\\Phi" }, { display: "$\\Psi$", code: "\\Psi" }, { display: "$\\Omega$", code: "\\Omega" },

        // 变体
        { display: "$\\varepsilon$", code: "\\varepsilon" },
        { display: "$\\vartheta$", code: "\\vartheta" },
        { display: "$\\varpi$", code: "\\varpi" },
        { display: "$\\varrho$", code: "\\varrho" },
        { display: "$\\varsigma$", code: "\\varsigma" },
        { display: "$\\varphi$", code: "\\varphi" }, 
    ],
    "operators_and_relations": [
        { display: "$\\pm$", code: "\\pm" }, { display: "$\\mp$", code: "\\mp" }, { display: "$\\times$", code: "\\times" }, { display: "$\\div$", code: "\\div" }, { display: "$\\ast$", code: "\\ast" }, { display: "$\\cdot$", code: "\\cdot" }, { display: "$\\circ$", code: "\\circ" }, { display: "$\\bullet$", code: "\\bullet" },
        { display: "$\\leq$", code: "\\leq" }, { display: "$\\geq$", code: "\\geq" }, { display: "$\\neq$", code: "\\neq" }, { display: "$\\approx$", code: "\\approx" }, { display: "$\\equiv$", code: "\\equiv" }, { display: "$\\sim$", code: "\\sim" }, { display: "$\\simeq$", code: "\\simeq" }, { display: "$\\propto$", code: "\\propto" },
        { display: "$\\in$", code: "\\in" }, { display: "$\\notin$", code: "\\notin" }, { display: "$\\subset$", code: "\\subset" }, { display: "$\\supset$", code: "\\supset" }, { display: "$\\subseteq$", code: "\\subseteq" }, { display: "$\\supseteq$", code: "\\supseteq" }, { display: "$\\cap$", code: "\\cap" }, { display: "$\\cup$", code: "\\cup" },
        { display: "$\\forall$", code: "\\forall" }, { display: "$\\exists$", code: "\\exists" }, { display: "$\\nabla$", code: "\\nabla" }, { display: "$\\partial$", code: "\\partial" }, { display: "$\\wedge$", code: "\\wedge" }, { display: "$\\vee$", code: "\\vee" }, { display: "$\\neg$", code: "\\neg" },

        { display: "$\\prec$", code: "\\prec" },
        { display: "$\\succ$", code: "\\succ" },
        { display: "$\\preceq$", code: "\\preceq" },
        { display: "$\\succeq$", code: "\\succeq" },
        { display: "$\\ll$", code: "\\ll" },
        { display: "$\\gg$", code: "\\gg" },
        { display: "$\\parallel$", code: "\\parallel" },
        { display: "$\\nparallel$", code: "\\nparallel" },
        { display: "$\\perp$", code: "\\perp" },
    ],
    "arrows": [
        { display: "$\\leftarrow$", code: "\\leftarrow" }, { display: "$\\rightarrow$", code: "\\rightarrow" }, { display: "$\\leftrightarrow$", code: "\\leftrightarrow" }, { display: "$\\Leftarrow$", code: "\\Leftarrow" }, { display: "$\\Rightarrow$", code: "\\Rightarrow" }, { display: "$\\Leftrightarrow$", code: "\\Leftrightarrow" },
        { display: "$\\uparrow$", code: "\\uparrow" }, { display: "$\\downarrow$", code: "\\downarrow" }, { display: "$\\updownarrow$", code: "\\updownarrow" }, { display: "$\\Uparrow$", code: "\\Uparrow" }, { display: "$\\Downarrow$", code: "\\Downarrow" }, { display: "$\\Updownarrow$", code: "\\Updownarrow" },
        { display: "$\\longleftarrow$", code: "\\longleftarrow" }, { display: "$\\longrightarrow$", code: "\\longrightarrow" }, { display: "$\\longleftrightarrow$", code: "\\longleftrightarrow" }, { display: "$\\Longleftarrow$", code: "\\Longleftarrow" }, { display: "$\\Longrightarrow$", code: "\\Longrightarrow" }, { display: "$\\Longleftrightarrow$", code: "\\Longleftrightarrow" },
        { display: "$\\mapsto$", code: "\\mapsto" },
        { display: "$\\hookrightarrow$", code: "\\hookrightarrow" },
        { display: "$\\hookleftarrow$", code: "\\hookleftarrow" },
        { display: "$\\nearrow$", code: "\\nearrow" },
        { display: "$\\searrow$", code: "\\searrow" },
        { display: "$\\swarrow$", code: "\\swarrow" },
        { display: "$\\nwarrow$", code: "\\nwarrow" },
        { display: "$\\leadsto$", code: "\\leadsto" },
    ],
    "delimiters": [
        { display: "$()$", code: "()", cursorOffset: 1 },
        { display: "$[]$", code: "[]", cursorOffset: 1 },
        { display: "$\\{\\}$", code: "\\{\\}", cursorOffset: 2 },
        { display: "$||$", code: "||", cursorOffset: 1 },
        { display: "$\\langle\\rangle$", code: "\\langle\\rangle", cursorOffset: 7 },
        { display: "$\\lfloor\\rfloor$", code: "\\lfloor \\rfloor", cursorOffset: 7 },
        { display: "$\\lceil\\rceil$", code: "\\lceil \\rceil", cursorOffset: 6 },
        { display: "$\\vert$", code: "\\vert" },
        { display: "$\\Vert$", code: "\\Vert" },
        { display: "$\\ulcorner$", code: "\\ulcorner" },
        { display: "$\\urcorner$", code: "\\urcorner" },
        { display: "$\\llcorner$", code: "\\llcorner" },
        { display: "$\\lrcorner$", code: "\\lrcorner" },
        { display: "$\\uparrow\\downarrow$", code: "\\uparrow\\downarrow", cursorOffset: 8 },
    ],
    "maths_constructs": [
        { display: "$x^{2}$", code: "^{}", cursorOffset: 2 },
        { display: "$x_{i}$", code: "_{}", cursorOffset: 2 },
        { display: "$\\frac{a}{b}$", code: "\\frac{}{}", cursorOffset: 6 },
        { display: "$\\sqrt{x}$", code: "\\sqrt{}", cursorOffset: 6 },
        { display: "$\\sqrt[n]{x}$", code: "\\sqrt[]{-}", cursorOffset: 6 },
        { display: "$\\overline{x}$", code: "\\overline{}", cursorOffset: 10 },
        { display: "$\\vec{x}$", code: "\\vec{}", cursorOffset: 5 },
        { display: "$\\hat{x}$", code: "\\hat{}", cursorOffset: 5 },
        { display: "$\\tilde{x}$", code: "\\tilde{}", cursorOffset: 7 },
        { display: "$\\dot{x}$", code: "\\dot{}", cursorOffset: 5 },
        { display: "$\\ddot{x}$", code: "\\ddot{}", cursorOffset: 6 },
        { display: "$\\overleftarrow{x}$", code: "\\overleftarrow{}", cursorOffset: 15 },
        { display: "$\\overrightarrow{x}$", code: "\\overrightarrow{}", cursorOffset: 16 },
        { display: "$\\overbrace{x}$", code: "\\overbrace{}", cursorOffset: 11 },
        { display: "$\\underbrace{x}$", code: "\\underbrace{}", cursorOffset: 12 },
        { display: "$\\stackrel{x}{y}$", code: "\\stackrel{}{}", cursorOffset: 10 },
        { display: "$\\overset{x}{y}$", code: "\\overset{}{}", cursorOffset: 9 },
        { display: "$\\underset{x}{y}$", code: "\\underset{}{}", cursorOffset: 10 },
    ],
    "variable_sized_symbols": [
        { display: "$\\sum$", code: "\\sum" }, { display: "$\\prod$", code: "\\prod" }, { display: "$\\coprod$", code: "\\coprod" }, { display: "$\\int$", code: "\\int" }, { display: "$\\oint$", code: "\\oint" },
        { display: "$\\bigcup$", code: "\\bigcup" }, { display: "$\\bigcap$", code: "\\bigcap" }, { display: "$\\bigoplus$", code: "\\bigoplus" }, { display: "$\\bigotimes$", code: "\\bigotimes" }, { display: "$\\bigvee$", code: "\\bigvee" }, { display: "$\\bigwedge$", code: "\\bigwedge" },
        { display: "$\\iint$", code: "\\iint" },
        { display: "$\\iiint$", code: "\\iiint" },
        { display: "$\\iiiint$", code: "\\iiiint" },
        { display: "$\\idotsint$", code: "\\idotsint" },
        { display: "$\\biguplus$", code: "\\biguplus" },
        { display: "$\\bigodot$", code: "\\bigodot" },
    ],
    "standard_functions": [
        { display: "$\\sin$", code: "\\sin" }, { display: "$\\cos$", code: "\\cos" }, { display: "$\\tan$", code: "\\tan" }, { display: "$\\csc$", code: "\\csc" }, { display: "$\\sec$", code: "\\sec" }, { display: "$\\cot$", code: "\\cot" },
        { display: "$\\arcsin$", code: "\\arcsin" }, { display: "$\\arccos$", code: "\\arccos" }, { display: "$\\arctan$", code: "\\arctan" },
        { display: "$\\sinh$", code: "\\sinh" }, { display: "$\\cosh$", code: "\\cosh" }, { display: "$\\tanh$", code: "\\tanh" },
        { display: "$\\lim$", code: "\\lim" }, { display: "$\\min$", code: "\\min" }, { display: "$\\max$", code: "\\max" }, { display: "$\\inf$", code: "\\inf" }, { display: "$\\sup$", code: "\\sup" },
        { display: "$\\log$", code: "\\log" }, { display: "$\\ln$", code: "\\ln" }, { display: "$\\det$", code: "\\det" }, { display: "$\\exp$", code: "\\exp" }, { display: "$\\deg$", code: "\\deg" }, { display: "$\\gcd$", code: "\\gcd" },
        { display: "$\\ker$", code: "\\ker" },
        { display: "$\\dim$", code: "\\dim" },
        { display: "$\\hom$", code: "\\hom" },
        { display: "$\\arg$", code: "\\arg" },
    ],
    "letter_styles": [
        { display: "$\\mathbb{A}$", code: "\\mathbb{}", cursorOffset: 8 },
        { display: "$\\mathcal{A}$", code: "\\mathcal{}", cursorOffset: 9 },
        { display: "$\\mathfrak{A}$", code: "\\mathfrak{}", cursorOffset: 10 },
        { display: "$\\mathscr{A}$", code: "\\mathscr{}", cursorOffset: 12 },
        { display: "$\\mathbf{A}$", code: "\\mathbf{}", cursorOffset: 8 },
        { display: "$\\mathrm{A}$", code: "\\mathrm{}", cursorOffset: 8 },
        { display: "$\\mathit{A}$", code: "\\mathit{}", cursorOffset: 8 },
        { display: "$\\mathsf{A}$", code: "\\mathsf{}", cursorOffset: 8 },
        { display: "$\\mathtt{A}$", code: "\\mathtt{}", cursorOffset: 8 },
        { display: "$\\boldsymbol{A}$", code: "\\boldsymbol{}", cursorOffset: 12 },
    ],
    "matrices": [
        { 
            display: {
                en: "Basic matrix",
                zh: "基础矩阵"
            }, 
            code: "\\begin{matrix}\na & b \\\\\nc & d\n\\end{matrix}",
            cursorOffset: 15
        },
        { 
            display: {
                en: "Parentheses matrix",
                zh: "小括号矩阵"
            }, 
            code: "\\begin{pmatrix}\na & b \\\\\nc & d\n\\end{pmatrix}",
            cursorOffset: 16
        },
        { 
            display: {
                en: "Bracket matrix",
                zh: "中括号矩阵"
            }, 
            code: "\\begin{bmatrix}\na & b \\\\\nc & d\n\\end{bmatrix}",
            cursorOffset: 16
        },
        { 
            display: {
                en: "Single line matrix",
                zh: "单竖线矩阵"
            }, 
            code: "\\begin{vmatrix}\na & b \\\\\nc & d\n\\end{vmatrix}",
            cursorOffset: 16
        },
        { 
            display: {
                en: "Double line matrix",
                zh: "双竖线矩阵"
            }, 
            code: "\\begin{Vmatrix}\na & b \\\\\nc & d\n\\end{Vmatrix}",
            cursorOffset: 16
        }
    ],
    "misc": [
        { display: "$\\infty$", code: "\\infty" }, { display: "$\\hbar$", code: "\\hbar" }, { display: "$\\ell$", code: "\\ell" }, { display: "$\\wp$", code: "\\wp" }, { display: "$\\emptyset$", code: "\\emptyset" }, { display: "$\\ldots$", code: "\\ldots" }, { display: "$\\cdots$", code: "\\cdots" }, { display: "$\\vdots$", code: "\\vdots" }, { display: "$\\ddots$", code: "\\ddots" },
        { display: "$\\eth$", code: "\\eth" },
        { display: "$\\mho$", code: "\\mho" },
        { display: "$\\partial$", code: "\\partial" },
        { display: "$\\nabla$", code: "\\nabla" },
        { display: "$\\square$", code: "\\square" },
        { display: "$\\blacksquare$", code: "\\blacksquare" },
        { display: "$\\triangle$", code: "\\triangle" },
        { display: "$\\blacktriangle$", code: "\\blacktriangle" },
        { display: "$\\diamondsuit$", code: "\\diamondsuit" },
        { display: "$\\heartsuit$", code: "\\heartsuit" },
        { display: "$\\clubsuit$", code: "\\clubsuit" },
        { display: "$\\spadesuit$", code: "\\spadesuit" },
    ],
    "environments": [
        { 
            display: {
                en: "Equation",
                zh: "带编号方程"
            }, 
            code: "\\begin{equation}\n\n\\end{equation}",
            cursorOffset: 17
        },
        { 
            display: {
                en: "Align",
                zh: "对齐方程组"
            }, 
            code: "\\begin{align}\n\n\\end{align}",
            cursorOffset: 12
        },
        { 
            display: {
                en: "Cases",
                zh: "分段函数"
            }, 
            code: "\\begin{cases}\n\n\\end{cases}",
            cursorOffset: 14
        },
        { 
            display: {
                en: "Array",
                zh: "矩阵数组"
            }, 
            code: "\\begin{array}{}\n\n\\end{array}",
            cursorOffset: 15
        }
    ]
};