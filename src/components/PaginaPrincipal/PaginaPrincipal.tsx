import './style.css'
import { useContext, useEffect } from "react"
import { ErroContext } from "../../Contexts/ModalErroContext"
import bannerImg from "../../assets/imgs/foto-banner.png"
import ParticlesBg from 'particles-bg'
import { Typewriter } from 'react-simple-typewriter'
import { Link } from "react-router-dom"





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
        <div className="flex-[1] flex">
            <ParticlesBg type='cobweb' bg={true} color="#ff0000"/>
            <div className="w-1/2 flex justify-center items-center">
                <img src={bannerImg} alt="" className="h-[80vh]"/>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center gap-12">
                <div className="text-center text-white text-5xl">
                    Nós somos<br/>
                    <span className='text-red-600 '>
                    <Typewriter
                        words={['criadores', 'disruptivos', 'fora da curva', 'a melhor mentoria do Brasil']}
                        loop={false}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1800}
                    />
                    </span>
                </div>
                <div className="flex gap-4">
                    <div className="rounded-md border-black bg-gray-700 text-white cursor-pointer">
                        <Link className="p-4 h-full flex items-center" to={"/Networking"}>Networking</Link>
                    </div>
                    <div className="rounded-md border-black bg-gray-700 text-white cursor-pointer">
                        <Link className="p-4 h-full flex items-center" to={"/Organizador"}>Organizador</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}