import { Dispatch, SetStateAction } from "react"
import xisBranco from "../../assets/imgs/xisBranco.svg"

type Props = {
    temModalFn: Dispatch<SetStateAction<boolean>>,
    tituloFn: Dispatch<SetStateAction<string>>,
    addColumnFn: () => void
}

export default function ModalAddColumn({temModalFn, tituloFn, addColumnFn}: Props){

    return (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-white/80">
            <div className="flex flex-col h-1/3 lg:w-1/3 w-5/6 bg-black p-6 rounded-xl">
                <div className="flex justify-end">
                    <img onClick={() => temModalFn(false)} src={xisBranco} alt="xis-fechar-modal" className="h-6 w-auto cursor-pointer" />
                </div>
                <div className="flex flex-col justify-center flex-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="textoTitulo" className="text-2xl font-bold text-white">Titulo</label>
                        <input onChange={e => tituloFn(e.target.value)} type="text" id="textoTitulo" className="outline-none border-none p-2 rounded-xl"/>
                    </div>
                </div>
                <div className="flex justify-center p-3">
                    <button className="p-3 rounded-md bg-zinc-800 text-white border-black border-2" onClick={() => {addColumnFn(); temModalFn(false)}}>Criar Coluna</button>
                </div>
            </div>
        </div>
    )
}