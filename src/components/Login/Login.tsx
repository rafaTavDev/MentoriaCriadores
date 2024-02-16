import imgOlho from "../../assets/imgs/olhoSenha.svg"
import { useState, MouseEvent, useContext, useEffect } from "react"
import { ErroContext } from "../../Contexts/ModalErroContext"
import { redirect } from "react-router-dom"



export default function Login(){
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [msgErrLogin, setMsgErrLogin] = useState<string>("")
    const [temErrLogin, setTemErrLogin] = useState<boolean>(false)

    const {setLogged, setPrimeiraVez} = useContext(ErroContext)


    function conferirUsuario(e: MouseEvent<HTMLInputElement>){
        e.preventDefault() //o preventDefault previne até que a conferencia do required seja feita, então vai ter que fazer essa conferência por JS
        setTemErrLogin(false)

        if(email !== "" && senha !== ""){
            fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                senha
            })
            }).then(resp => resp.json()).then(result => {
                if(result[0] == "erro"){
                    setTemErrLogin(true)
                    if(result[1]){
                        setMsgErrLogin(result[1])
                    }else{
                        setMsgErrLogin("ocorreu um erro, tente novamente. Caso persista, entre em contato com o suporte.")
                    }
                }else{
                    setPrimeiraVez(result[0].primeiraVez)
                    localStorage.setItem('authToken', result[0].token)
                    if(localStorage.getItem("authToken")){
                        setLogged(true)
                        redirect("/")
                    }
                } 
            }).catch(err => console.log(err))
        }else{
            setTemErrLogin(true)
            setMsgErrLogin("email e senha não podem estar vazios")
        }
    }

    return(
        <div className="h-screen bg-black flex flex-col justify-center items-center">
            <form className="p-3 bg-white/20 rounded-md flex flex-col gap-3 w-1/3">
                <div className="font-bold text-white text-3xl flex justify-center">Mentoria Criadores</div>
                <input type="email" placeholder="email" onChange={e => {setEmail(e.target.value)}} className="rounded-md p-2"/>
                <div className="rounded-md flex overflow-hidden bg-white">
                    <input type={showPassword ? "text" : "password"} placeholder="senha" onChange={e => {setSenha(e.target.value)}} className="p-2 flex-1 outline-none"/>
                    <img onClick={() => setShowPassword(!showPassword)} src={imgOlho} alt="imagem-para-ver-senha" className="h-10 w-auto p-1 cursor-pointer"/>
                </div>
                {
                    temErrLogin &&
                    <div className="text-red-600 self-center">
                        {msgErrLogin}
                    </div>
                }
                <input type="submit" onClick={e => {conferirUsuario(e)}} className="self-center p-2 rounded-md bg-red-700 text-white cursor-pointer" value="Entrar"/>
            </form>
        </div>
    )
}