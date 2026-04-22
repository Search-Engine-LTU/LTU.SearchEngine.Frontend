export class CustomError extends Error {
    errorCode: number;

    constructor( errorCode: number, name: string, message: string ){
        super(message);
        this.errorCode = errorCode;
        this.name = name;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}