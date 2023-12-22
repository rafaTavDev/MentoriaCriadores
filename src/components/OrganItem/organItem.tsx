import { useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import Task from "../Task/Task"


type Props = {
    index: number
}

export default function OrganItem({index}: Props){

    const [tasks, setTasks] = useState([
        {
            id: "0",
            task: "Sou a primeira task"
        },
        {
            id: "1",
            task: "Sou a segunda task"
        }
    ])


    function reorder<T>(list: T[], startIdx: number, endIdx: number){
        const result = Array.from(list)
        console.log(result)
        const [removed] = result.splice(startIdx, 1)
        result.splice(endIdx, 0, removed)
        console.log(result)
        return result
    }


    function onDragEnd(result: any){
        const items = reorder(tasks, result.source.index, result.destination.index)
        console.log(items)
        setTasks(items)
    }

    return (
        <div className="w-1/6 rounded-xl bg-slate-500 p-3">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`item${index }`}>
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
                                {tasks.map((item, index) => <Task key={item.id} texto={item.task} id={item.id} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
}