import { ResponseError, RESPONSE_ERROR_CODE } from "../../type/ResponseError";
import { InfoRequestData } from "../../type/RequestData";
import nodeFetch from 'node-fetch';
import InvalidURL from "../../error/InvalidURL";

class InfoAPI {

    public async getCountryInfoByName(data : InfoRequestData){
        try{
            const url : string | undefined = process.env.COUNTRY_INFO_API;

            if(url == "" || url == null || url == undefined){
                throw new InvalidURL("URL para info no configurada");
            }

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            console.log(`${url}/${data.name}`);
            const response : any = await nodeFetch(`${url}/${data.name}`);
            const country = await response.json();

            return country;
        } catch(e : any){
            const response : ResponseError = {code: RESPONSE_ERROR_CODE.FETCH_ERROR, msg: e.message}
            return response
        }
    }
}

export default InfoAPI;