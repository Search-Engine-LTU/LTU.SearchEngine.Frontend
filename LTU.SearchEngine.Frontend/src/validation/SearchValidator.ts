export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
    warningMessage?: string;
}

/**
 * Validates the search query based on business requirements and backend parser constraints.
 * Covers requirements FRQ-4003, FRQ-3010, FRQ-3003, FRQ-3007, and FRQ-3004.
 */
export const validateQuery = (query: string): ValidationResult => {
    const trimmedQuery = query.trim();
    let warningMessage: string | undefined = undefined;

    // 1. Prevent empty searches (FRQ-4003)
    if (trimmedQuery.length === 0) {
        return { 
            isValid: false, 
            errorMessage: "No results found. Please enter a search term." 
        };
    }

    // 2. Validate special character escaping (FRQ-3010)
    if (trimmedQuery.endsWith('\\') && !trimmedQuery.endsWith('\\\\')) {
        return { 
            isValid: false, 
            errorMessage: "Invalid query: Cannot end with an unescaped backslash." 
        };
    }

    // 3. Phrase support - Balanced quotation marks (FRQ-3003)
    const quoteMatches = query.match(/(?<!\\)"/g);
    if (quoteMatches && quoteMatches.length % 2 !== 0) {
        return { 
            isValid: false, 
            errorMessage: "Unbalanced quotation marks. Ensure phrase queries are closed." 
        };
    }

    // 4. Operator placement for +, -, and ! (FRQ-3007 & Peer feedback)
    const invalidOperatorMatch = /(?<!\\)[!+-](\s+|$)/.test(trimmedQuery);
    if (invalidOperatorMatch) {
        return { 
            isValid: false, 
            errorMessage: "Operators (+, -, !) must be placed at the start of the term/phrase (e.g., +dogs, -cats or +\"brown dogs\")."
        };
    }

    // 5. Parentheses balance and integrity (Peer feedback)
    const openParen = (query.match(/(?<!\\)\(/g) || []).length;
    const closeParen = (query.match(/(?<!\\)\)/g) || []).length;

    if (openParen !== closeParen) {
        return { 
            isValid: false, 
            errorMessage: `Mismatched parentheses. You have ${openParen} opening and ${closeParen} closing parentheses.` 
        };
    }

    if (/\(\s*\)/.test(trimmedQuery)) {
        return { 
            isValid: false, 
            errorMessage: "Empty parentheses are not allowed." 
        };
    }

    // --- WARNING SECTION (Based on Jean Paul Hanna's feedback) ---

    // 6. Multiple consecutive logical operators (Architecture constraint)
    // Now handled as a warning to allow the backend to handle the noise.
    if (/\b(AND|OR|NOT)\s+(AND|OR|NOT)\b/i.test(trimmedQuery)) {
        warningMessage = "Note: Multiple logical operators detected. This might lead to unexpected results.";
    }

    // 7. Implicit logic check (UX feedback)
    // Handled as warning to allow "implicit OR" between terms and parentheses.
    if (/\w+\s+\(/i.test(trimmedQuery) || /\)\s+\w+/i.test(trimmedQuery)) {
         const implicitWarning = "Note: Missing operators between terms and parentheses. Using implicit OR.";
         warningMessage = warningMessage ? `${warningMessage} ${implicitWarning}` : implicitWarning;
    }

    // 8. Parenthetical redundancy check
    // Warning for single terms in parentheses (e.g., "(word)").
    if (/\(\s*\w+\s*\)/.test(trimmedQuery)) {
        const redundancyWarning = "Note: Parentheses around a single term are unnecessary.";
        warningMessage = warningMessage ? `${warningMessage} ${redundancyWarning}` : redundancyWarning;
    }

    // 9. Boolean operator casing warning (FRQ-3004)
    if (/\b(and|or|not)\b/.test(trimmedQuery)) {
        const casingWarning = "Note: Boolean operators must be UPPERCASE (AND, OR, NOT).";
        warningMessage = warningMessage ? `${warningMessage} ${casingWarning}` : casingWarning;
    }

    return { isValid: true, warningMessage };
};