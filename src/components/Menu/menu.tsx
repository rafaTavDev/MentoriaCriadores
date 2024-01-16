import { useState } from "react"
import EditarPerfil from "../EditarPerfil/EditarPerfil"
import { Link } from "react-router-dom"


export default function Menu(){
    const [wantEdit, setWantEdit] = useState<boolean>(false)


    return (
        <div className="h-20 bg-cyan-500 flex justify-between p-2">      
            <div className="h-full flex justify-center items-center">
                <img className="h-full w-auto" src="" alt="LOGO" />
            </div>
            <div className="h-full">
                <nav className="h-full flex">
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">
                        Metas
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">
                        <Link to={"/Networking"}>Networking</Link>
                    </div>
                    <div className="h-full flex justify-center items-center p-2 cursor-pointer">   
                        <Link to={"/Organizador"}>Organizador</Link>
                    </div>
                </nav>
            </div>
            <div className="h-full">
                <div className="h-full flex flex-col justify-center items-center">
                    <img className="h-1/2 w-auto" src="" alt="" />
                    <div>Nome Criador</div>
                    <button onClick={() => setWantEdit(true)}>Editar perfil</button>
                    {
                        wantEdit &&
                        <EditarPerfil setWantEdit={setWantEdit}/>
                    }
                </div>
            </div>
        </div>
    )
}