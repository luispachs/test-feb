import { Program } from "@app/models"

import { responseUtility } from "@core/utilities/responseUtility"
import moment from "moment";

class ProgramService {
    construtor(){

    }   

    public async list(_params){
        try{
            const where:any = {}
            
            let programs  = await Program.find(where,null);
            return responseUtility.success({list:programs},200);
            
            
          } catch (error) {
            console.log('error', error)
          }
    }


}

export default ProgramService;