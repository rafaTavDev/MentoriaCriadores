import { Dispatch, SetStateAction } from "react"
import Task from "../Task/Task";
import { Droppable } from "@hello-pangea/dnd"

type objTask = {
    id: string,
    desc: string,
    titulo: string
}

type Props = {
    tasks: objTask[],
    index: number,
    temModalFn: Dispatch<SetStateAction<boolean>>,
    actualColumnFn: Dispatch<SetStateAction<string>>
}

export default function ColunaItems({tasks, index, temModalFn, actualColumnFn}: Props){

    function handleAddClick(){
        temModalFn(true)
        actualColumnFn(`${index}`)
    }






    return (
        <div className="w-1/6 rounded-xl bg-slate-500 p-3">
                <Droppable droppableId={`${index}`}>
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
                                <button onClick={() => handleAddClick()} className="p-3 text-xl bg-white bg-opacity-50 text-white rounded-xl">Adicionar um card +</button> {/*o bt vai reconhecer a coluna pela variável index*/}
                                {tasks.map((item, index) => <Task key={item.id} titulo={item.titulo} texto={item.desc} id={item.id} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
        </div>
    )
}