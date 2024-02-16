import { useContext, useEffect } from "react"
import { ErroContext } from "../../Contexts/ModalErroContext"




export default function PaginaPrincipal(){

    const {primeiraVez, setWantEdit, setUsuario, setTemErro} = useContext(ErroContext)
    
    useEffect(() => {
        fetch("http://localhost:3000/Usuario", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
            setUsuario(data[0])
        }).catch(() => setTemErro(true))
        if(primeiraVez){
          setWantEdit(true)
        }
    }, [])


    return (
        <div className="flex-1 bg-bannerPrincipal bg-cover bg-bottom"></div>
    )
}