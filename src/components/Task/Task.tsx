

import { Draggable } from "@hello-pangea/dnd"
import imgEditar from "../../assets/imgs/icone-editar.svg"
import imgApagar from "../../assets/imgs/icone-apagar.svg"

type Props = {
    texto: string,
    id: number,
    index: number,
    titulo: string,
    activeModalRemoveCard: (id: number, idColumn: number, index: number) => void,
    idColumn: number,
    openEditModal: (titleActualCard: string, descActualCard: string, id: number, idxColumn: number) => void
}

export default function Task({texto, id, index, titulo, activeModalRemoveCard, idColumn, openEditModal}: Props){

    return (
        <Draggable draggableId={`${id}`} index={index} >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex flex-col gap-2 bg-black rounded-xl p-3">
                        <div  className="text-xl text-white break-words">
                            {titulo}
                        </div>
                        <div className="text-md text-white break-words">
                            {texto}
                        </div>
                        <div className="flex gap-3">
                            <img onClick={() => openEditModal(titulo, texto, id, idColumn)} className="w-6 h-auto p-1 bg-white opacity-80 rounded-md" src={imgEditar} alt="icone-editar" />{/*id==id, idColumn == index */}
                            <img onClick={() => {activeModalRemoveCard(id, idColumn, index)}} className="w-6 h-auto p-1 bg-white opacity-80 rounded-md" src={imgApagar} alt="icone-apagar" />
                        </div>  
                    </div>
                )
            }
        </Draggable>
    )
}