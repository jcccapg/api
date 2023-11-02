class InvalidAPIKey extends Error {
    constructor (msg : string){
        super(msg);

        Object.setPrototypeOf(this, InvalidAPIKey.prototype);
    }
}

export default InvalidAPIKey;