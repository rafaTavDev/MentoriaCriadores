
import { Draggable } from "@hello-pangea/dnd"

type Props = {
    texto: string,
    id: string,
    index: number
}

export default function Task({texto, id, index}: Props){
    return (
        <Draggable draggableId={id} index={index} >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="p-3 text-xl bg-green-600 rounded-xl">
                        {texto}
                    </div>
                )
            }
        </Draggable>
    )
}