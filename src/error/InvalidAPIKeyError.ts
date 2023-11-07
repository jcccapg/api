class InvalidAPIKeyError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, InvalidAPIKeyError.prototype);
    }
}

export default InvalidAPIKeyError;