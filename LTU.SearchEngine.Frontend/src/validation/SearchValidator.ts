export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
    warningMessage?: string;
}

export const validateQuery = (query: string): ValidationResult => {
    const trimmedQuery = query.trim();

    // 1. Empty searching (FRQ-4003)
    if (trimmedQuery.length === 0) {
        return { 
            isValid: false, 
            errorMessage: "No results found. Please enter a search term." 
        };
    }

    // 2. Special Character Escaping (FRQ-3010)
    // A search should not end with a unfinished escape-sign(\)
    if (trimmedQuery.endsWith('\\') && !trimmedQuery.endsWith('\\\\')) {
        return { 
            isValid: false, 
            errorMessage: "Invalid query: Cannot end with an unescaped backslash." 
        };
    }

    // 3. Phrase Support - Balanserade citationstecken (FRQ-3003)
    // Vi räknar citationstecken (") men ignorerar de som är escapade (\")
    const quoteMatches = query.match(/(?<!\\)"/g);
    if (quoteMatches && quoteMatches.length % 2 !== 0) {
        return { 
            isValid: false, 
            errorMessage: "Unbalanced quotation marks. Ensure phrase queries are closed." 
        };
    }

// 4. Operator-placering (+, -, !)
    // Vi kollar nu även efter ! och - enligt feedback från Arnith86
    const invalidOperatorMatch = /(?<!\\)[!+-](\s+|$)/.test(trimmedQuery);
    if (invalidOperatorMatch) {
        return { 
            isValid: false, 
            errorMessage: "Operators (+, -, !) must be placed at the start of the term/phrase (e.g., +dogs, -cats or +\"brown dogs\")."
        };
    }

    // 5. Parentes-validering
    const openParen = (query.match(/(?<!\\)\(/g) || []).length;
    const closeParen = (query.match(/(?<!\\)\)/g) || []).length;

    // Kontrollera antal
    if (openParen !== closeParen) {
        return { 
            isValid: false, 
            errorMessage: `Mismatched parentheses. You have ${openParen} opening and ${closeParen} closing parentheses.` 
        };
    }

    // Kontrollera felaktig start/slut på parentes (t.ex. tomma parenteser eller stängande före öppnande)
    if (/\(\s*\)/.test(trimmedQuery)) {
        return { isValid: false, errorMessage: "Empty parentheses are not allowed." };
    }

    // 5. Boolean Operators - Varning för gemener (FRQ-3004)
    let warningMessage: string | undefined = undefined;
    // Regex kollar efter and, or, not som hela ord med små bokstäver
    if (/\b(and|or|not)\b/.test(trimmedQuery)) {
        warningMessage = "Note: Boolean operators must be UPPERCASE (AND, OR, NOT).";
    }

    return { isValid: true, warningMessage };
};