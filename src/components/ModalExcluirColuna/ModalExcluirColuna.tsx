import { Dispatch, SetStateAction } from "react"

type Props = {
    setTemModalExcluirColuna: Dispatch<SetStateAction<boolean>>,
    removeColumnFn: () => void
}

export default function ModalExcluirColuna({ setTemModalExcluirColuna, removeColumnFn }: Props){
    return (
        <div className="flex items-center justify-center gap-3 absolute inset-0 bg-white/80">
            <div className="w-1/6 p-3 flex flex-col gap-3">
                <div className="text-center">
                    Tem certeza que quer excluir?
                </div>
                <div className="flex justify-center gap-3">
                    <div onClick={() => {removeColumnFn(); setTemModalExcluirColuna(false)}} className="bg-white rounded-md cursor-pointer p-2">Sim</div>
                    <div onClick={() => setTemModalExcluirColuna(false)} className="bg-white rounded-md cursor-pointer p-2">Não</div>
                </div>
            </div>
        </div>
    )
}