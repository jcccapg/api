import { NewsRequestData } from "../../type/RequestData";
import IValidator from "./IValidator";

class ValidatorNewsParamsImpl implements IValidator<NewsRequestData>{
    public validar(data: NewsRequestData): boolean {
        if(data.name == undefined || data.name == null || data.name == "" || data.name.length > 2){
            return false;
        }
        return true;
    }
}

export default ValidatorNewsParamsImpl;