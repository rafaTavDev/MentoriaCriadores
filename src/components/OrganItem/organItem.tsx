import { useState, Dispatch, SetStateAction } from "react"
import ColunaItems from "../ColunaItems/ColunaItems"
import { DragDropContext } from "@hello-pangea/dnd"

type Props = {
    temModalFn: Dispatch<SetStateAction<boolean>>
}


export default function OrganItem({temModalFn}: Props){

    const [taskColumns, setTaskColumns] = useState([
        {
            Tasks:[
                {
                    id: "0",
                    task: "Sou a primeira task"
                },
                {
                    id: "1",
                    task: "Sou a segunda task"
                }
            ],
            idColumn: "0"
        },
        {
            Tasks:[
                {
                    id: "2",
                    task: "Sou a primeira task"
                },
                {
                    id: "3",
                    task: "Sou a segunda task"
                }
            ],
            idColumn: "1"
        },
    ])


    function reorder(startIdx: number, endIdx: number, startCol: number, endCol: number){
        const taskColumnsCopy = JSON.parse(JSON.stringify(taskColumns))
        const [removed] = taskColumnsCopy[startCol].Tasks.splice(startIdx, 1)
        taskColumnsCopy[endCol].Tasks.splice(endIdx, 0, removed)
        return taskColumnsCopy
    }


    function onDragEnd(result: any){

        const newTaskColumns = reorder(result.source.index, result.destination.index, result.source.droppableId, result.destination.droppableId) //Aqui preciso do index da coluna que solto o item pra fazer taskColumns[indexColunaFinal]
        setTaskColumns(newTaskColumns)
    }

    return (
        <div className="flex items-start gap-3">
            <DragDropContext onDragEnd={onDragEnd}>
                {taskColumns.map((item, index) => <ColunaItems temModalFn={temModalFn} key={item.idColumn} tasks={item.Tasks} index={index}/>)}
            </DragDropContext>
        </div>
    )
}