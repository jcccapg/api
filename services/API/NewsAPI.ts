import InvalidAPIKey from "../../error/InvalidApiKey";
import InvalidURL from "../../error/InvalidURL";
import nodeFetch from 'node-fetch';
import https from 'https';
import { NewsRequestData } from "../../type/RequestData";
import { ResponseError, RESPONSE_ERROR_CODE } from "../../type/ResponseError";

class NewsAPI {
    public async getCountryNewsByName(data : NewsRequestData){
        const url : string | undefined = process.env.COUNTRY_NEWS_API;
        const apiKey : string | undefined = process.env.COUNTRY_NEWS_KEY;

        try{
            if(url == "" || url == null || url == undefined){
                throw new InvalidURL("URL para info no configurada");
            }

            if(apiKey == "" || apiKey == null || apiKey == undefined){
                throw new InvalidAPIKey("URL para info no configurada");
            }

            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const response = (await nodeFetch(url + "?" + new URLSearchParams({country: data.name, apiKey: apiKey}),
            {
                agent: httpsAgent
            }));
            const news : Promise<any[]> = await response.json() as Promise<any[]>;
            return news; 
        } catch(e : any){
            const response : ResponseError = {code: RESPONSE_ERROR_CODE.FETCH_ERROR, msg: e.message}
            return response
        }
    }
}

export default NewsAPI;