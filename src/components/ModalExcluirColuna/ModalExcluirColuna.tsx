import { Dispatch, SetStateAction } from "react"

type Props = {
    who: string,
    setTemModalExcluirColuna: Dispatch<SetStateAction<boolean>>
}

export default function ModalExcluirColuna({who, setTemModalExcluirColuna}: Props){
    return (
        <div className="flex items-center justify-center gap-3 absolute inset-0 bg-white/80">
            <div className="w-1/6 p-3 flex flex-col gap-3">
                <div className="text-center">
                    Tem certeza que quer excluir?
                </div>
                <div className="flex justify-center gap-3">
                    <div className="bg-white rounded-md cursor-pointer p-2">Sim</div>
                    <div onClick={() => setTemModalExcluirColuna(false)} className="bg-white rounded-md cursor-pointer p-2">Não</div>
                </div>
            </div>
        </div>
    )
}