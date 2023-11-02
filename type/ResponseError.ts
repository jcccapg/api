export enum RESPONSE_ERROR_CODE{
    INVALID_URL_ERROR = 1000,
    INVALID_API_KEY_ERROR,
    INVALID_PARAMETERS_ERROR,
    FETCH_ERROR
}

export type ResponseError = {
    code : RESPONSE_ERROR_CODE,
    msg : string
}