import { Dispatch, SetStateAction } from "react"
import xis from "../../assets/imgs/menu-aberto.svg"

type Props = {
    temModalFn: Dispatch<SetStateAction<boolean>>,
    tituloFn: Dispatch<SetStateAction<string>>,
    addColumnFn: () => void
}

export default function ModalAddColumn({temModalFn, tituloFn, addColumnFn}: Props){
    return (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-white/80">
            <div className="flex flex-col h-1/3 w-1/3 bg-cyan-900 p-6 rounded-xl">
                <div className="flex justify-end">
                    <img onClick={() => temModalFn(false)} src={xis} alt="xis-fechar-modal" className="h-6 w-auto cursor-pointer" />
                </div>
                <div className="flex flex-col justify-center flex-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="textoTitulo" className="text-2xl font-bold">Titulo</label>
                        <input onChange={e => tituloFn(e.target.value)} type="text" id="textoTitulo" className="outline-none border-none p-2 rounded-xl"/>
                    </div>
                </div>
                <div className="flex justify-center p-3">
                    <button onClick={() => {addColumnFn(); temModalFn(false)}}>Criar Card</button>
                </div>
            </div>
        </div>
    )
}