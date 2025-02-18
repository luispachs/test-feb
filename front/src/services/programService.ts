import { get, post } from "../util/http"
const api = '/program'
export const programService = {
  api,
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  all: async()=>{
    return await get({api: `${api}/`,options:{}})
  },

  post:async({user}:{user:{incremental:number;full_name:string;first_name:string,last_name:string;email:string;mobile_phone:string;interestProgram:string;status:string}})=>{
    return await get({api: `${api}/upsert`,options:{
        body:JSON.stringify({user})
    }})
  }
}
