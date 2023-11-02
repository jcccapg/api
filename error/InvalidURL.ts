class InvalidURL extends Error {
    constructor (msg : string){
        super(msg);

        Object.setPrototypeOf(this, InvalidURL.prototype);
    }
}

export default InvalidURL;