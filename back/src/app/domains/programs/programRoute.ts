import { Application } from "express"

// @import_controllers
import {ProgramController} from "./programController"


// @import_utilities
import { RouterUtility, IRouteParams } from "@core/utilities/routerUtility"
import { request as auth } from "@app/middleware/authMiddleware"


class ProgramRoute{

    private className:string = 'ProgramRoute'  
    private app: Application
    private routerUtility: RouterUtility

    private controller =  new ProgramController;
    private prefix: string = '/program'
    constructor(app: Application, prefix: string){
        this.app = app
        this.routerUtility = new RouterUtility(this.app, `${prefix}${this.prefix}`)
    }

    private route:Array<IRouteParams> = [
        { method: 'get', path: '/', handler: this.controller.list , middleware: [auth] },
    ]

    public init(){
        this.route.forEach(elem=>{
            this.routerUtility.route(
                {
                    method: elem.method,
                    path: elem.path,
                    handler: elem.handler,
                    middleware: elem.middleware
                }
            )
        })
    }
}

export {ProgramRoute}