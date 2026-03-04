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

    // 1. Prevent empty searches (FRQ-4003)
    if (trimmedQuery.length === 0) {
        return { 
            isValid: false, 
            errorMessage: "No results found. Please enter a search term." 
        };
    }

    // 2. Validate special character escaping (FRQ-3010)
    // Ensures the query does not end with a dangling/unfinished backslash.
    if (trimmedQuery.endsWith('\\') && !trimmedQuery.endsWith('\\\\')) {
        return { 
            isValid: false, 
            errorMessage: "Invalid query: Cannot end with an unescaped backslash." 
        };
    }

    // 3. Phrase support - Balanced quotation marks (FRQ-3003)
    // Counts double quotes but ignores those escaped with a backslash (\").
    const quoteMatches = query.match(/(?<!\\)"/g);
    if (quoteMatches && quoteMatches.length % 2 !== 0) {
        return { 
            isValid: false, 
            errorMessage: "Unbalanced quotation marks. Ensure phrase queries are closed." 
        };
    }

    // 4. Operator placement for +, -, and ! (FRQ-3007 & Peer feedback)
    // Operators must be attached to a term and cannot be followed by whitespace or end the query.
    const invalidOperatorMatch = /(?<!\\)[!+-](\s+|$)/.test(trimmedQuery);
    if (invalidOperatorMatch) {
        return { 
            isValid: false, 
            errorMessage: "Operators (+, -, !) must be placed at the start of the term/phrase (e.g., +dogs, -cats or +\"brown dogs\")."
        };
    }

    // 5. Parentheses balance and integrity (Peer feedback)
    // Ensures every opening parenthesis has a matching closing one.
    const openParen = (query.match(/(?<!\\)\(/g) || []).length;
    const closeParen = (query.match(/(?<!\\)\)/g) || []).length;

    if (openParen !== closeParen) {
        return { 
            isValid: false, 
            errorMessage: `Mismatched parentheses. You have ${openParen} opening and ${closeParen} closing parentheses.` 
        };
    }

    // Prevent empty parentheses as they provide no logical value.
    if (/\(\s*\)/.test(trimmedQuery)) {
        return { 
            isValid: false, 
            errorMessage: "Empty parentheses are not allowed." 
        };
    }

    // 6. Multiple consecutive logical operators (Architecture constraint)
    // Prevents invalid logic like "AND AND" or "OR AND".
    if (/\b(AND|OR|NOT)\s+(AND|OR|NOT)\b/i.test(trimmedQuery)) {
        return { 
            isValid: false, 
            errorMessage: "Invalid query: Multiple logical operators cannot be placed next to each other." 
        };
    }

    // 7. Implicit logic check (UX feedback)
    // Ensures operators are used between terms and parentheses to avoid ambiguity.
    if (/\w+\s+\(/i.test(trimmedQuery) || /\)\s+\w+/i.test(trimmedQuery)) {
         return { 
            isValid: false, 
            errorMessage: "Please use logical operators (AND, OR) between terms and parentheses." 
        };
    }

    // 8. Parenthetical redundancy check
    // Parentheses should contain an expression (e.g., A AND B), not a single term.
    if (/\(\s*\w+\s*\)/.test(trimmedQuery)) {
        return { 
            isValid: false, 
            errorMessage: "Parentheses must contain a logical expression (e.g., 'word AND word'), not a single term." 
        };
    }

    // 9. Boolean operator casing warning (FRQ-3004)
    // Warns the user that the backend requires uppercase AND, OR, NOT.
    let warningMessage: string | undefined = undefined;
    if (/\b(and|or|not)\b/.test(trimmedQuery)) {
        warningMessage = "Note: Boolean operators must be UPPERCASE (AND, OR, NOT).";
    }

    return { isValid: true, warningMessage };
};