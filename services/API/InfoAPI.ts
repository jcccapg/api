import InvalidURL from "../../error/InvalidURL";
import { InfoRequestData } from "../../type/RequestData";

class InfoAPI {
    public async getCountriesInfo() : Promise<any[]> {
        const url : string | undefined = process.env.COUNTRY_INFO_API;
        
        try{
            if(url == "" || url == null || url == undefined){
                throw new InvalidURL("URL para info no configurada");
            }

            const response = (await fetch(url));
            const countries : Promise<any[]> = await response.json() as Promise<any[]>;
            return countries;    
        }
        catch(e: any){
            console.log(e)
            return [];
        }
    }

    public async getCountryInfoByName(data : InfoRequestData){
        try{
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const countryList : any[] = await this.getCountriesInfo();
            const searchedCountry = countryList.find((country : any) => country.name.common.toLowerCase() == data.name.toLowerCase());

            return searchedCountry;
        } catch(e : any){
            console.log(e);
            return ""
        }
    }
}

export default InfoAPI;