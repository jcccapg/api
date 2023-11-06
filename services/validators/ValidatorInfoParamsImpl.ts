import { InfoRequestData } from "../../type/RequestData";
import IValidator from "./IValidator";
import _ from "lodash";

class ValidatorInfoParamsImpl implements IValidator<InfoRequestData> {
  public validar(data: InfoRequestData): boolean {
    return _.isEmpty(data.name);
  }
}

export default ValidatorInfoParamsImpl;
