import InvalidAPIKey from "../../error/InvalidApiKey";
import InvalidURL from "../../error/InvalidURL";
import { WeatherRequestData } from "../../type/RequestData";
import { ResponseError, RESPONSE_ERROR_CODE } from "../../type/ResponseError";

class WeatherAPI {

    public async getCountryWeatherByGeo(data : WeatherRequestData){
        const url : string | undefined = process.env.COUNTRY_WEATHER_API;
        const apiKey : string | undefined = process.env.COUNTRY_WEATHER_KEY;

        try{
            if(url == "" || url == null || url == undefined){
                throw new InvalidURL("URL para info no configurada");
            }

            if(apiKey == "" || apiKey == null || apiKey == undefined){
                throw new InvalidAPIKey("URL para info no configurada");
            }

            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const response = (await fetch(url + "?" + new URLSearchParams({lat: data.lat, lon: data.lon, appid: apiKey})));
            const weather : Promise<any[]> = await response.json() as Promise<any[]>;
            return weather;  
        } catch(e : any){
            const response : ResponseError = {code: RESPONSE_ERROR_CODE.FETCH_ERROR, msg: e.message}
            return response
        }
    }
}

export default WeatherAPI;