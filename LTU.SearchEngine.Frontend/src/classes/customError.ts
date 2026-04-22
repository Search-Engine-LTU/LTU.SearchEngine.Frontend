/**
 * @class CustomError
 * @extends Error
 * @description A specialized error class that extends the built-in JavaScript Error.
 * It allows for passing a numeric error code and a custom name alongside the error message,
 * making it easier to handle specific API failures (like 429 Rate Limiting) in the UI.
 */
export class CustomError extends Error {
    errorCode: number;

    /**
     * Creates an instance of CustomError.
     * @param {number} errorCode - The numeric code associated with the error (e.g., 400, 429, 500).
     * @param {string} name - A descriptive name for the error type (e.g., "RateLimitError").
     * @param {string} message - The human-readable error message.
     */
    constructor( errorCode: number, name: string, message: string ){
        super(message);
        this.errorCode = errorCode;
        this.name = name;

        /**
         * Explicitly set the prototype.
         * This is a known requirement when extending built-in classes like Error in TypeScript/ES5
         * to ensure that 'instanceof CustomError' checks work correctly.
         */
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}