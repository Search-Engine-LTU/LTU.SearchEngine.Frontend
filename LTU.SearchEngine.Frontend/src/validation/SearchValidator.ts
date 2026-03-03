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

    // 4. Required Term Operator (FRQ-3007)
    // '+' får inte stå helt ensamt i slutet eller följas av enbart mellanslag
    if (/(?<!\\)\+\s*$/.test(trimmedQuery) || /(?<!\\)\+\s+/.test(trimmedQuery)) {
        return { 
            isValid: false, 
            errorMessage: "The '+' operator must be attached directly to a term (e.g., +dogs)." 
        };
    }

    // 5. Boolean Operators - Varning för gemener (FRQ-3004)
    let warningMessage: string | undefined = undefined;
    // Regex kollar efter and, or, not som hela ord med små bokstäver
    if (/\b(and|or|not)\b/.test(trimmedQuery)) {
        warningMessage = "Note: Boolean operators must be UPPERCASE (AND, OR, NOT).";
    }


    return { isValid: true, warningMessage };
};