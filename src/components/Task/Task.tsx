
import { Draggable } from "@hello-pangea/dnd"

type Props = {
    texto: string,
    id: string,
    index: number,
    titulo: string
}

export default function Task({texto, id, index, titulo}: Props){
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
                    </div>
                )
            }
        </Draggable>
    )
}