import { useState, Dispatch, SetStateAction } from "react"
import xisBranco from "../../assets/imgs/xisBranco.svg"

type Props = {
    temModalFn: Dispatch<SetStateAction<boolean>>,
    tituloFn: Dispatch<SetStateAction<string>>,
    descFn: Dispatch<SetStateAction<string>>,
    editCardFn: () => void,
    newTitleEditedCard: string,
    newDescEditedCard: string
}

export default function ModalAddCard({temModalFn, tituloFn, descFn, editCardFn, newTitleEditedCard, newDescEditedCard}: Props){

    return (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-white/80">
            <div className="flex flex-col h-1/2 w-1/3 bg-black p-6 rounded-xl">
                <div className="flex justify-end">
                    <img onClick={() => temModalFn(false)} src={xisBranco} alt="xis-fechar-modal" className="h-6 w-auto cursor-pointer" />
                </div>
                <div className="flex flex-col justify-center flex-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="textoTitulo" className="text-2xl font-bold text-white">Novo Titulo</label>
                        <input onChange={e => tituloFn(e.target.value)} value={newTitleEditedCard} type="text" id="textoTitulo" className="outline-none border-none p-2 rounded-xl"/>{/* tituloFn(e.target.value) */}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="textoDesc" className="text-2xl font-bold text-white">Descrição</label>
                        <textarea onChange={e => descFn(e.target.value)} value={newDescEditedCard} className="resize-none outline-none border-none p-2 h-32 rounded-xl"></textarea>{/* descFn(e.target.value) */}
                    </div>
                </div>
                <div className="flex justify-center p-3">
                    <button className="p-3 rounded-md bg-zinc-800 text-white border-black border-2" onClick={() => {editCardFn(); temModalFn(false)}}>Editar Card</button>
                </div>
            </div>
        </div>
    )
}