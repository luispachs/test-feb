import { app } from "@/atoms/kuepa"
import { FormEvent, FormEventHandler, ReactElement, Suspense, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { List ,IListProps} from "@/components/ui/list";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";
import { leadService } from "@/services/leadService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem, SelectScrollDownButton, SelectScrollUpButton } from "@radix-ui/react-select";
import { programService } from "@/services/programService";
import { set } from "date-fns";
 
export interface LeadsProps {
}

export default function Leads (props?: LeadsProps) {
 
  const [leads,setLeads] = useState([]);
  const [programs,setPrograms] = useState([]);
  const [rawPrograms,setRawPrograms] = useState([])
  const [control,setcontrol] = useState(0);

  const [selectValue,setSelectValue] = useState("")
  const [selectLabel,setSelectLabel] = useState("Seleccione el programa")

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const [formErrors,setFormErrors] = useState([]) 

  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',
      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb:[
        {
          title: 'Leads',
          url: '/leads'
        }
      ]
    })
  }, [])

  useEffect(()=>{
      leadService.all().then(resp => {
       let l = resp.list.map(
          (elem) =>{
            return {
              title:elem.fullname,
              content: <section key={elem._id}>
                <article>{elem.fullname}</article>
                <article>{elem.email}</article>
                <article>{elem.mobile_phone}</article>
                <article>{elem.interestProgram}</article>
                <article>{elem.status}</article>
              </section>,
              key:elem._id
            }
          }
        )
        setLeads(l);
      });

      programService.all().then(resp=>{
          
         let  p = resp.list.map(
            elem =>{
              return (<SelectItem key={elem._id} value={elem._id}>{elem.name}</SelectItem>)
            }
          )
          setPrograms(p);
          setRawPrograms(resp.list);
      })
  },[control]);

  const submitForm =(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      let auxErrors = [];
      if(nameRef.current.value==""){
        auxErrors.push(<span>Nombre no puede esta vacio<br/></span>)
      }
      if(lastnameRef.current.value==""){
        auxErrors.push(<span>Apellido no puede esta vacio<br/></span>)
      }
      if(emailRef.current.value==""){
        auxErrors.push(<span>Email no puede esta vacio<br/></span>)
      }
      if(phoneRef.current.value==""){
        auxErrors.push(<span>telefono no puede esta vacio<br/></span>)
      }
      console.log(selectValue)
      if(selectValue==""){
        auxErrors.push(<span>Se debe de seleccionar un programa<br/></span>)
      }

      setFormErrors(auxErrors);

      if(auxErrors.length >0){
        return;
      }

      leadService.post({
          user:{
            first_name: nameRef.current.value,
            last_name:lastnameRef.current.value,
            full_name:lastnameRef.current.value+" "+nameRef.current.value,
            email:emailRef.current.value,
            mobile_phone:phoneRef.current.value,
            interestProgram:selectValue,
            status:'active'
          }
      })
      setcontrol(control+1);
  }

  return (
    <section className="w-[100%] h-[100dvh] columns-1 md:columns-2 lg:columns-2">
      <article className="w-[100%] columns-1 md:columns-1 lg:columns-1 d-flex flex-col">
                <div className={formErrors.length==0?"invisible": "w-[100%] d-flex flex-col justify-center items-center columns-1 md:columns-1 lg:columns-1 bg-red-200 text-red-800"}>
                  {formErrors}
                </div>
                <form className="w-[100%] h-[100dvh] columns-1 md:columns-1 lg:columns-1 d-flex flex-col " onSubmit={submitForm}>
                    <article>
                    <Label htmlFor="first_name">Primer Nombre</Label>
                    <Input placeholder="Primer Nombre" type="text" id="first_name" name="first_name" ref={nameRef}/>
                    </article>
                    <article>
                    <Label htmlFor="last_name">Apellido</Label>
                    <Input placeholder="Apellido" type="text" id="last_name" name="last_name" ref={lastnameRef}/>
                    </article>
                    <article>
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="Email" type="email" id="email" name="email" ref={emailRef}/>
                    </article>

                    <article>
                    <Label htmlFor="mobile_phone">Celular</Label>
                    <Input placeholder="celular" type="phone" id="mobile_phone" name="mobile_phone" ref={phoneRef}/>
                    </article>
                    <article>
                    <Label htmlFor="program">Programa</Label>
                    <Select value={selectValue} onValueChange={(v)=>{
                    rawPrograms.forEach(elem=>{
                          if(elem._id == v){
                            console.log(elem);
                            setSelectValue(elem._id);
                            setSelectLabel(elem.name);
                          }
                        })
                     
                    }}>
                      <SelectTrigger>
                      <SelectValue placeholder={selectLabel} onChange={e=>{console.log(e)}}></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {programs}
                      </SelectContent>
                    </Select>
                    <Separator/>
                    </article>
                    <article className="w-[100%] py-[10px]">
                      <button className="w-[100%] bg-emerald-400">Crear</button>
                    </article>
                </form>
            </article>
    
      <article className="w-[100%] h-[100dvh] columns-1 md:columns-1 lg:columns-1 d-flex flex-col items-start justify-start">
        <Suspense fallback={<Skeleton/>}>
          <List list={leads}/>
        </Suspense>
      </article>

    </section>
  )
}