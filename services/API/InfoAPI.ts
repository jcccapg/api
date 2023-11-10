import { ResponseError, RESPONSE_ERROR_CODE } from "../../type/ResponseError";
import { InfoRequestData } from "../../type/RequestData";
import nodeFetch from 'node-fetch';
import InvalidURL from "../../error/InvalidURLError";
import { CircuitBreaker } from '../../utils/CircuitBreaker';

interface InfoRequest {
    data: InfoRequestData;
}

class InfoAPI {
    private countryBreaker: CircuitBreaker<string>;

    constructor() {
        this.countryBreaker = new CircuitBreaker<string>(this.callApi, {
            failureThreshold: 3,
            successThreshold: 2,
            timeout: 20000,
            resetTimeout: 30000
        });
    }

    public async getCountryInfoByName({name}: InfoRequestData) {
        return await this.countryBreaker.exec(name);
    }

    private async callApi(name: string) {
        const url: string | undefined = process.env.COUNTRY_INFO_API;

        if (url == "" || url == null || url == undefined) {
            throw new InvalidURL("URL para info no configurada");
        }

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        console.log(`${url}/${name}`);

        try {
            const response = await nodeFetch(`${url}/${name}`);
            const country = await response.json();
            return country;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default InfoAPI;