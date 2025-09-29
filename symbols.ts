// symbols.ts

export const symbolCategories = {
    "greek_letters": [
        // Lowercase
        { display: "$\\alpha$", code: "\\alpha" }, { display: "$\\beta$", code: "\\beta" }, { display: "$\\gamma$", code: "\\gamma" }, { display: "$\\delta$", code: "\\delta" }, { display: "$\\epsilon$", code: "\\epsilon" }, { display: "$\\zeta$", code: "\\zeta" }, { display: "$\\eta$", code: "\\eta" }, { display: "$\\theta$", code: "\\theta" }, { display: "$\\iota$", code: "\\iota" }, { display: "$\\kappa$", code: "\\kappa" }, { display: "$\\lambda$", code: "\\lambda" }, { display: "$\\mu$", code: "\\mu" }, { display: "$\\nu$", code: "\\nu" }, { display: "$\\xi$", code: "\\xi" }, { display: "$\\omicron$", code: "\\omicron" }, { display: "$\\pi$", code: "\\pi" }, { display: "$\\rho$", code: "\\rho" }, { display: "$\\sigma$", code: "\\sigma" }, { display: "$\\tau$", code: "\\tau" }, { display: "$\\upsilon$", code: "\\upsilon" }, { display: "$\\phi$", code: "\\phi" }, { display: "$\\chi$", code: "\\chi" }, { display: "$\\psi$", code: "\\psi" }, { display: "$\\omega$", code: "\\omega" },
        // Uppercase
        { display: "$\\Gamma$", code: "\\Gamma" }, { display: "$\\Delta$", code: "\\Delta" }, { display: "$\\Theta$", code: "\\Theta" }, { display: "$\\Lambda$", code: "\\Lambda" }, { display: "$\\Xi$", code: "\\Xi" }, { display: "$\\Pi$", code: "\\Pi" }, { display: "$\\Sigma$", code: "\\Sigma" }, { display: "$\\Upsilon$", code: "\\Upsilon" }, { display: "$\\Phi$", code: "\\Phi" }, { display: "$\\Psi$", code: "\\Psi" }, { display: "$\\Omega$", code: "\\Omega" },
    ],
    "operators_and_relations": [
        { display: "$\\pm$", code: "\\pm" }, { display: "$\\mp$", code: "\\mp" }, { display: "$\\times$", code: "\\times" }, { display: "$\\div$", code: "\\div" }, { display: "$\\ast$", code: "\\ast" }, { display: "$\\cdot$", code: "\\cdot" }, { display: "$\\circ$", code: "\\circ" }, { display: "$\\bullet$", code: "\\bullet" },
        { display: "$\\leq$", code: "\\leq" }, { display: "$\\geq$", code: "\\geq" }, { display: "$\\neq$", code: "\\neq" }, { display: "$\\approx$", code: "\\approx" }, { display: "$\\equiv$", code: "\\equiv" }, { display: "$\\sim$", code: "\\sim" }, { display: "$\\simeq$", code: "\\simeq" }, { display: "$\\propto$", code: "\\propto" },
        { display: "$\\in$", code: "\\in" }, { display: "$\\notin$", code: "\\notin" }, { display: "$\\subset$", code: "\\subset" }, { display: "$\\supset$", code: "\\supset" }, { display: "$\\subseteq$", code: "\\subseteq" }, { display: "$\\supseteq$", code: "\\supseteq" }, { display: "$\\cap$", code: "\\cap" }, { display: "$\\cup$", code: "\\cup" },
        { display: "$\\forall$", code: "\\forall" }, { display: "$\\exists$", code: "\\exists" }, { display: "$\\nabla$", code: "\\nabla" }, { display: "$\\partial$", code: "\\partial" }, { display: "$\\wedge$", code: "\\wedge" }, { display: "$\\vee$", code: "\\vee" }, { display: "$\\neg$", code: "\\neg" },
    ],
    "arrows": [
        { display: "$\\leftarrow$", code: "\\leftarrow" }, { display: "$\\rightarrow$", code: "\\rightarrow" }, { display: "$\\leftrightarrow$", code: "\\leftrightarrow" }, { display: "$\\Leftarrow$", code: "\\Leftarrow" }, { display: "$\\Rightarrow$", code: "\\Rightarrow" }, { display: "$\\Leftrightarrow$", code: "\\Leftrightarrow" },
        { display: "$\\uparrow$", code: "\\uparrow" }, { display: "$\\downarrow$", code: "\\downarrow" }, { display: "$\\updownarrow$", code: "\\updownarrow" }, { display: "$\\Uparrow$", code: "\\Uparrow" }, { display: "$\\Downarrow$", code: "\\Downarrow" }, { display: "$\\Updownarrow$", code: "\\Updownarrow" },
        { display: "$\\longleftarrow$", code: "\\longleftarrow" }, { display: "$\\longrightarrow$", code: "\\longrightarrow" }, { display: "$\\longleftrightarrow$", code: "\\longleftrightarrow" }, { display: "$\\Longleftarrow$", code: "\\Longleftarrow" }, { display: "$\\Longrightarrow$", code: "\\Longrightarrow" }, { display: "$\\Longleftrightarrow$", code: "\\Longleftrightarrow" },
    ],
    "delimiters": [
        { display: "$()$", code: "()" }, { display: "$[]$", code: "[]" }, { display: "$\\{\\}$", code: "\\{\\}" }, { display: "$||$", code: "||" }, { display: "$\\langle\\rangle$", code: "\\langle\\rangle" },
        { display: "$\\lfloor\\rfloor$", code: "\\lfloor \\rfloor" }, { display: "$\\lceil\\rceil$", code: "\\lceil \\rceil" }, { display: "$\\vert$", code: "\\vert" }, { display: "$\\Vert$", code: "\\Vert" },
    ],
    "maths_constructs": [
        { display: "$x^{2}$", code: "^{}" }, { display: "$x_{i}$", code: "_{}" }, { display: "$\\frac{a}{b}$", code: "\\frac{}{}" }, { display: "$\\sqrt{x}$", code: "\\sqrt{}" }, { display: "$\\sqrt[n]{x}$", code: "\\sqrt[]{-}" },
        { display: "$\\overline{x}$", code: "\\overline{}" }, { display: "$\\vec{x}$", code: "\\vec{}" }, { display: "$\\hat{x}$", code: "\\hat{}" }, { display: "$\\tilde{x}$", code: "\\tilde{}" }, { display: "$\\dot{x}$", code: "\\dot{}" }, { display: "$\\ddot{x}$", code: "\\ddot{}" },
    ],
    "variable_sized_symbols": [
        { display: "$\\sum$", code: "\\sum" }, { display: "$\\prod$", code: "\\prod" }, { display: "$\\coprod$", code: "\\coprod" }, { display: "$\\int$", code: "\\int" }, { display: "$\\oint$", code: "\\oint" },
        { display: "$\\bigcup$", code: "\\bigcup" }, { display: "$\\bigcap$", code: "\\bigcap" }, { display: "$\\bigoplus$", code: "\\bigoplus" }, { display: "$\\bigotimes$", code: "\\bigotimes" }, { display: "$\\bigvee$", code: "\\bigvee" }, { display: "$\\bigwedge$", code: "\\bigwedge" },
    ],
    "standard_functions": [
        { display: "$\\sin$", code: "\\sin" }, { display: "$\\cos$", code: "\\cos" }, { display: "$\\tan$", code: "\\tan" }, { display: "$\\csc$", code: "\\csc" }, { display: "$\\sec$", code: "\\sec" }, { display: "$\\cot$", code: "\\cot" },
        { display: "$\\arcsin$", code: "\\arcsin" }, { display: "$\\arccos$", code: "\\arccos" }, { display: "$\\arctan$", code: "\\arctan" },
        { display: "$\\sinh$", code: "\\sinh" }, { display: "$\\cosh$", code: "\\cosh" }, { display: "$\\tanh$", code: "\\tanh" },
        { display: "$\\lim$", code: "\\lim" }, { display: "$\\min$", code: "\\min" }, { display: "$\\max$", code: "\\max" }, { display: "$\\inf$", code: "\\inf" }, { display: "$\\sup$", code: "\\sup" },
        { display: "$\\log$", code: "\\log" }, { display: "$\\ln$", code: "\\ln" }, { display: "$\\det$", code: "\\det" }, { display: "$\\exp$", code: "\\exp" }, { display: "$\\deg$", code: "\\deg" }, { display: "$\\gcd$", code: "\\gcd" },
    ],
    "letter_styles": [
        { display: "$\\mathbb{A}$", code: "\\mathbb{}" }, { display: "$\\mathcal{A}$", code: "\\mathcal{}" }, { display: "$\\mathfrak{A}$", code: "\\mathfrak{}" }, { display: "$\\mathscr{A}$", code: "\\mathscr{}" }, { display: "$\\mathbf{A}$", code: "\\mathbf{}" }, { display: "$\\mathrm{A}$", code: "\\mathrm{}" },
    ],
    "misc": [
        { display: "$\\infty$", code: "\\infty" }, { display: "$\\hbar$", code: "\\hbar" }, { display: "$\\ell$", code: "\\ell" }, { display: "$\\wp$", code: "\\wp" }, { display: "$\\emptyset$", code: "\\emptyset" }, { display: "$\\ldots$", code: "\\ldots" }, { display: "$\\cdots$", code: "\\cdots" }, { display: "$\\vdots$", code: "\\vdots" }, { display: "$\\ddots$", code: "\\ddots" },
    ]
};