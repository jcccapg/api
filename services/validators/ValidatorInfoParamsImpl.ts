import { InfoRequestData } from "../../type/RequestData";
import IValidator from "./IValidator";

class ValidatorInfoParamsImpl implements IValidator<InfoRequestData>{
    public validar(data: InfoRequestData): boolean {
        if(data.name == undefined || data.name == null || data.name == ""){
            return false;
        }

        return true;
    }
}

export default ValidatorInfoParamsImpl;