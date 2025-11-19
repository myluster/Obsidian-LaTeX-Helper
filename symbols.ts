// symbols.ts
export interface SymbolDisplay {
    en: string;
    zh: string;
}

export interface SymbolDefinition {
    display: string | SymbolDisplay;
    code: string;
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
        { display: "$()$", code: "()" }, { display: "$[]$", code: "[]" }, { display: "$\\{\\}$", code: "\\{\\}" }, { display: "$||$", code: "||" }, { display: "$\\langle\\rangle$", code: "\\langle\\rangle" },
        { display: "$\\lfloor\\rfloor$", code: "\\lfloor \\rfloor" }, { display: "$\\lceil\\rceil$", code: "\\lceil \\rceil" }, { display: "$\\vert$", code: "\\vert" }, { display: "$\\Vert$", code: "\\Vert" },
        { display: "$\\ulcorner$", code: "\\ulcorner" },
        { display: "$\\urcorner$", code: "\\urcorner" },
        { display: "$\\llcorner$", code: "\\llcorner" },
        { display: "$\\lrcorner$", code: "\\lrcorner" },
        { display: "$\\uparrow\\downarrow$", code: "\\uparrow\\downarrow" },
    ],
    "maths_constructs": [
        { display: "$x^{2}$", code: "^{}" }, { display: "$x_{i}$", code: "_{}" }, { display: "$\\frac{a}{b}$", code: "\\frac{}{}" }, { display: "$\\sqrt{x}$", code: "\\sqrt{}" }, { display: "$\\sqrt[n]{x}$", code: "\\sqrt[]{-}" },
        { display: "$\\overline{x}$", code: "\\overline{}" }, { display: "$\\vec{x}$", code: "\\vec{}" }, { display: "$\\hat{x}$", code: "\\hat{}" }, { display: "$\\tilde{x}$", code: "\\tilde{}" }, { display: "$\\dot{x}$", code: "\\dot{}" }, { display: "$\\ddot{x}$", code: "\\ddot{}" },
        { display: "$\\overleftarrow{x}$", code: "\\overleftarrow{}" },
        { display: "$\\overrightarrow{x}$", code: "\\overrightarrow{}" },
        { display: "$\\overbrace{x}$", code: "\\overbrace{}" },
        { display: "$\\underbrace{x}$", code: "\\underbrace{}" },
        { display: "$\\stackrel{x}{y}$", code: "\\stackrel{}{}" },
        { display: "$\\overset{x}{y}$", code: "\\overset{}{}" },
        { display: "$\\underset{x}{y}$", code: "\\underset{}{}" },
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
        { display: "$\\mathbb{A}$", code: "\\mathbb{}" }, { display: "$\\mathcal{A}$", code: "\\mathcal{}" }, { display: "$\\mathfrak{A}$", code: "\\mathfrak{}" }, { display: "$\\mathscr{A}$", code: "\\mathscr{}" }, { display: "$\\mathbf{A}$", code: "\\mathbf{}" }, { display: "$\\mathrm{A}$", code: "\\mathrm{}" },
        { display: "$\\mathit{A}$", code: "\\mathit{}" },
        { display: "$\\mathsf{A}$", code: "\\mathsf{}" },
        { display: "$\\mathtt{A}$", code: "\\mathtt{}" },
        { display: "$\\boldsymbol{A}$", code: "\\boldsymbol{}" },
    ],
     "matrices": [
        { 
            display: {
                en: "Basic matrix",
                zh: "基础矩阵"
            }, 
            code: "\\begin{matrix}\na & b \\\\\nc & d\n\\end{matrix}"
        },
        { 
            display: {
                en: "Parentheses matrix",
                zh: "小括号矩阵"
            }, 
            code: "\\begin{pmatrix}\na & b \\\\\nc & d\n\\end{pmatrix}"
        },
        { 
            display: {
                en: "Bracket matrix",
                zh: "中括号矩阵"
            }, 
            code: "\\begin{bmatrix}\na & b \\\\\nc & d\n\\end{bmatrix}"
        },
        { 
            display: {
                en: "Single line matrix",
                zh: "单竖线矩阵"
            }, 
            code: "\\begin{vmatrix}\na & b \\\\\nc & d\n\\end{vmatrix}"
        },
        { 
            display: {
                en: "Double line matrix",
                zh: "双竖线矩阵"
            }, 
            code: "\\begin{Vmatrix}\na & b \\\\\nc & d\n\\end{Vmatrix}"
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
            code: "\\begin{equation}\n\n\\end{equation}"
        },
        { 
            display: {
                en: "Align",
                zh: "对齐方程组"
            }, 
            code: "\\begin{align}\n\n\\end{align}"
        },
        { 
            display: {
                en: "Cases",
                zh: "分段函数"
            }, 
            code: "\\begin{cases}\n\n\\end{cases}"
        },
        { 
            display: {
                en: "Array",
                zh: "矩阵数组"
            }, 
            code: "\\begin{array}{}\n\n\\end{array}"
        }
    ]
};