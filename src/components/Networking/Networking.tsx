import Perfil from "../Perfil/Perfil"


export default function Networking(){


   const perfis = [
      {fotoPerfil: "", nome: "Rafael", sobrenome: "Tavares", whatsapp: "21987671995", descricao: "eu que estou desenvolvendo saporra"},
      {fotoPerfil: "", nome: "Thales", sobrenome: "Ricardo", whatsapp: "21999999999", descricao: "o Rafael é o grandão e eu sou pequenininho"},
      {fotoPerfil: "", nome: "Lucca", sobrenome: "Franco", whatsapp: "21999999999", descricao: "O thales acha que me engana mas eu que engano ele"},
      {fotoPerfil: "", nome: "Iury", sobrenome: "Veggi", whatsapp: "21999999999", descricao: "Gostei cleide"}
   ]


     return(
        <div className="flex-1">
            <Perfil/>
        </div>
     )
} 