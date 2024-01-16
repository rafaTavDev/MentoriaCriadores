import imgOlho from "../../assets/imgs/olhoSenha.svg"
import { useState, MouseEvent } from "react"


export default function Login(){
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [msgErrLogin, setMsgErrLogin] = useState<boolean>(false)

    function conferirUsuario(e: MouseEvent<HTMLInputElement>){
        e.preventDefault() //o preventDefault previne até que a conferencia do required seja feita, então vai ter que fazer essa conferência por JS
        setMsgErrLogin(false)
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
                console.log(result)
                if(result.code == 400){
                    setMsgErrLogin(true)
                }
            }).catch(err => console.log(err))
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
                    msgErrLogin &&
                    <div className="text-red-600 self-center">
                        email ou senha inválidos
                    </div>
                }
                <input type="submit" onClick={e => {conferirUsuario(e)}} className="self-center p-2 rounded-md bg-red-700 text-white" value="Entrar"/>
            </form>
        </div>
    )
}