
import { Dispatch, SetStateAction } from "react"
import { Draggable } from "@hello-pangea/dnd"
import imgEditar from "../../assets/imgs/icone-editar.svg"
import imgApagar from "../../assets/imgs/icone-apagar.svg"

type Props = {
    texto: string,
    id: string,
    index: number,
    titulo: string,
    activeModalRemoveCard: (id: string, idColumn: number) => void,
    idColumn: number,
    openEditModal: (titleActualCard: string, descActualCard: string, id: string, idxColumn: number) => void
}

export default function Task({texto, id, index, titulo, activeModalRemoveCard, idColumn, openEditModal}: Props){
    return (
        <Draggable draggableId={id} index={index} >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex flex-col gap-2 bg-green-600 rounded-xl p-3">
                        <div  className="text-xl">
                            {titulo}
                        </div>
                        <div className="text-lg">
                            {texto}
                        </div>
                        <div className="flex gap-3">
                            <img onClick={() => openEditModal(titulo, texto, id, idColumn)} className="w-6 h-auto p-1 bg-white opacity-80 rounded-md" src={imgEditar} alt="icone-editar" />{/*id==id, idColumn == index */}
                            <img onClick={() => { console.log(`o id do card é: ${id}`); console.log(`o id da coluna é: ${idColumn}`); activeModalRemoveCard(id, idColumn)}} className="w-6 h-auto p-1 bg-white opacity-80 rounded-md" src={imgApagar} alt="icone-apagar" />
                        </div>  
                    </div>
                )
            }
        </Draggable>
    )
}