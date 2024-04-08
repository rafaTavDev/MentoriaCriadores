import { ErroContext } from "../../Contexts/ModalErroContext"
import Perfil from "../Perfil/Perfil"
import { useContext, useEffect, useState} from "react"
import { UsuarioType } from "../../Contexts/ModalErroContext"

 


export default function Networking(){

   const {usuarios, setUsuarios} = useContext(ErroContext)



   useEffect(() => {
      fetch("http://localhost:3000/Usuarios", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json() as Promise<UsuarioType[]>).then(data => {
         data = data.filter(item => item.nome && item.sobrenome && item.descricao)
         setUsuarios(data)
         console.log(data)
      })
   }, [])


     return(
        <div className="flex-1 bg-black flex flex-col items-center">
         <div className="italic text-zinc-600 text-sm text-center p-3">*para o seu perfil aparecer aqui, você tem que ter informado pelo menos nome, sobrenome e descrição</div>


         <div className="flex lg:flex-row flex-col items-center flex-1 justify-center gap-3">
            {usuarios.map(item => <Perfil key={item.idUser} nome={item.nome} sobrenome={item.sobrenome} telefone={item.telefone} descricao={item.descricao} profissao={item.profissao} instagram={item.instagram} />)}
         </div>
        </div>
     )
} 