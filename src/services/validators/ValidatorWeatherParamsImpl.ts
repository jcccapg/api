import { WeatherRequestData } from "../../type/RequestData";
import IValidator from "./IValidator";

class ValidatorWeatherParamsImpl implements IValidator<WeatherRequestData>{
    public validar(data: WeatherRequestData): boolean {
        if(data.lat == undefined || data.lat == null || data.lat == "" || parseFloat(data.lat) > 90 || parseFloat(data.lat) < -90){
            console.log("Error de latitud");
            return false;
        }
    
        if(data.lon == undefined || data.lon == null || data.lon == "" || parseFloat(data.lon) > 180 || parseFloat(data.lon) < -180 ){
            console.log("Error de longitud");
            return false;
        }

        return true;
    }
}

export default ValidatorWeatherParamsImpl;