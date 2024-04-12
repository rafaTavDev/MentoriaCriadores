import { useState, useContext } from "react"
import EditarPerfil from "../EditarPerfil/EditarPerfil"
import { Link } from "react-router-dom"
import { ErroContext } from "../../Contexts/ModalErroContext"


export default function Menu(){

    const {setLogged, usuario, wantEdit, setWantEdit} = useContext(ErroContext)



    return (
        <div className="h-24 flex justify-between p-2 color-white px-32 border-b-solid border-b-[2px] border-b-white/[.100]">      
            <div className="h-full flex justify-center items-center">
                <img className="h-full w-auto" src="../../src/assets/imgs/logo-thales.png" alt="LOGO" />
            </div>
            <div className="h-full">
                <nav className="h-full flex">
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer text-white">
                        <Link className="h-full flex items-center" to={"/"}>Página Principal</Link>
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer text-white">
                        Metas
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer text-white">
                        <Link className="h-full flex items-center" to={"/Networking"}>Networking</Link>
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer text-white">   
                        <Link className="h-full flex items-center" to={"/Organizador"}>Organizador</Link>
                    </div>
                </nav>
            </div>
            <div className="h-full lg:flex hidden">
                <div className="h-full flex flex-col justify-around items-center text-white">
                    <div>Olá {usuario.nome}</div>
                    <div className="flex gap-3">
                        <button className="px-2 py-1 rounded-md bg-gray-700 text-sm" onClick={() => setWantEdit(true)}>Editar perfil</button>
                        <button className="px-2 py-1 rounded-md bg-red-700 text-sm" onClick={() => {localStorage.setItem("authToken", ""); setLogged(false)}}>Sair</button>
                    </div>
                    {
                        wantEdit &&
                        <EditarPerfil/>
                    }
                </div>
            </div>
        </div>
    )
}