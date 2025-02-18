import { responseUtility } from "@core/utilities/responseUtility";
import ProgramService from "./programService"
import { Request, Response } from 'express'


class ProgramController{


    private service = new ProgramService();
    constructor(){

    }


    public list = async (req:Request,res:Response)=>{
            const _params = req._data()
            const response = await this.service.list(_params)
            return responseUtility.build(res, response);
    }


}

export const programController =new ProgramController()
export { ProgramController };