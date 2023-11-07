class InvalidURLError extends Error {
    constructor(msg: string) {
        super(msg);

        Object.setPrototypeOf(this, InvalidURLError.prototype);
    }
}

export default InvalidURLError;