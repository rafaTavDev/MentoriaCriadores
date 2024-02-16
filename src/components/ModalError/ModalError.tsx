import iconeWpp from "../../assets/imgs/wppIconeBranco.svg"
import { Dispatch, SetStateAction, useContext } from "react"
import { ErroContext } from "../../Contexts/ModalErroContext"


export default function ModalError(){

    const {setTemErro} = useContext(ErroContext)

    return (
        <div className="absolute inset-0 z-50 bg-white/80 flex justify-center items-center">
            <div className="flex flex-col gap-4">
                <div className="text-lg ">Ocorreu um erro, por favor, tente novamente. Caso o erro persista, entre em contato com o suporte pelo botão abaixo</div>
                <div className="flex gap-2 justify-center items-center">
                <button className="p-2 rounded-md bg-zinc-900 text-white border-black border-2" onClick={() => setTemErro(false)}>Tentar novamente</button>
                    <a href="https://wa.me//5521987671995?text=Tive%20um%20problema%20com%20o%20site%20da%20criadores" target="_blank">
                        <div onClick={() => setTemErro(false)} className="rounded-md p-2 bg-green-500 text-white flex items-center gap-1">
                            <div>chamar suporte no whatsapp</div>
                            <img className="h-4 w-auto" src={iconeWpp} alt="icone-whatsapp" />
                        </div>
                    </a>
                </div>  
            </div>
        </div>
    )
}

