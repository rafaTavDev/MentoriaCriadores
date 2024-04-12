import { ErroContext } from "../../Contexts/ModalErroContext"
import Perfil from "../Perfil/Perfil"
import { useContext, useEffect, useState} from "react"
import { UsuarioType } from "../../Contexts/ModalErroContext"
import Select from 'react-select'
import iconeWpp from "../../assets/imgs/wppIconeBranco.svg"
import naoTemos from "../../assets/imgs/naoTemos.svg"

 


export default function Networking(){

   type profType = {
      profissao: string
   }

   type optionType = {
      value: string,
      label: string
   }

   const [profissoes, setProfissoes] = useState<profType[]>([])
   const {usuarios, setUsuarios} = useContext(ErroContext)
   const [usuariosTela, setUsusariosTela] = useState<UsuarioType[]>([])


   const options: optionType[] = [{value: "Ver Todos", label: "Ver Todos"}]

    profissoes.forEach((item) => {
      options.push({value: item.profissao, label: item.profissao})
    })



   useEffect(() => {
      fetch("http://localhost:3000/Usuarios", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json() as Promise<UsuarioType[]>).then(data => {
         data = data.filter(item => item.nome && item.sobrenome && item.descricao)
         setUsuarios(data)
         setUsusariosTela(data)
         console.log(data)
      })
      fetch("http://localhost:3000/pegarProfissoes").then(res => res.json()).then(data => setProfissoes(data))
   }, [])

   function selecionarProfissao(profissao: string){
      fetch("http://localhost:3000/Usuarios", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json() as Promise<UsuarioType[]>).then(data => {
         if(profissao != "Ver Todos"){
            data = data.filter(item => item.nome && item.sobrenome && item.descricao && item.profissao == profissao)
            setUsusariosTela(data)
         }else{
            data = data.filter(item => item.nome && item.sobrenome && item.descricao)
            setUsusariosTela(data)
         }

      })


   }


     return(
        <div className="flex-1 bg-black flex flex-col items-center">
         <div className="italic text-zinc-600 text-sm text-center p-3">*para o seu perfil aparecer aqui, você tem que ter informado pelo menos nome, sobrenome e descrição</div>
         <Select onChange={(option) => {if(option?.value){selecionarProfissao(option.value)}}} placeholder="Qual profissional está procurando?" options={options} styles={{control: (styles) => ({...styles, backgroundColor: "white", width: "300px", fontSize: "13px"})}} />
         <div className="flex lg:flex-row flex-col items-center flex-1 justify-center gap-3">
            {
               usuariosTela.length > 0 ?
               usuariosTela.map(item => <Perfil key={item.idUser} nome={item.nome} sobrenome={item.sobrenome} telefone={item.telefone} descricao={item.descricao} profissao={item.profissao} instagram={item.instagram} />)
               :
               <div className="flex flex-col justify-center items-center gap-6">
                  <img src={naoTemos} alt="carinha triste" className="h-[20vh] w-auto"/>
                  <div className="text-white">
                     Infelizmente não temos nenhum Criador nessa área no momento, mas fale diretamente conosco pelo botão abaixo para te indicarmos um profissional de nossa confiança!
                  </div>
                  <a href={"https://wa.me/5521987671995?text=Oi!%20gostaria%20de%20uma%20indicação%20de%20um%20profissional"} target="_blank">
                     <div className="rounded-md p-2 bg-green-500 text-white flex items-center gap-1">
                        <div>chamar no whatsapp</div>
                        <img className="h-4 w-auto" src={iconeWpp} alt="icone-wpp" />
                     </div>
                  </a>
               </div>
            }

         </div>
        </div>
     )
} 