import { get, post } from "../util/http"
const api = '/lead'
export const leadService = {
  api,
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  all: async()=>{
    return await get({api: `${api}/`,options:{}})
  },
  post:async(user)=>{
    return await post({api:`${api}/save`,options:{
      data:JSON.stringify({user})
    }})
  }
}

