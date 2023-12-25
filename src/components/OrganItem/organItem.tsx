import { useState } from "react"
import ColunaItems from "../ColunaItems/ColunaItems"
import { DragDropContext } from "@hello-pangea/dnd"
import ModalAddCard from "../ModalAddCard/ModalAddCard"



export default function OrganItem(){
    const [temModal, setTemModal] = useState<boolean>(false)
    const [actualColumnModal, setActualColumnModal] = useState<string>("0")
    const [newTitle, setNewTitle] = useState<string>("")
    const [newDesc, setNewDesc] = useState<string>("")
    const [maxIdx, setMaxIdx] = useState<number>(4)

  
    const [taskColumns, setTaskColumns] = useState([
        {
            Tasks:[
                {
                    id: "0",
                    titulo: "Titulo 1",
                    desc: "Sou a primeira task"
                },
                {
                    id: "1",
                    titulo: "Titulo 2",
                    desc: "Sou a segunda task"
                }
            ],
            idColumn: "0"
        },
        {
            Tasks:[
                {
                    id: "2",
                    titulo: "Titulo 3",
                    desc: "Sou a terceira task"
                },
                {
                    id: "3",
                    titulo: "Titulo 4",
                    desc: "Sou a quarta task"
                }
            ],
            idColumn: "1"
        },
    ])


    function addCard(){
        const taskColumnsCopy = JSON.parse(JSON.stringify(taskColumns))
        taskColumnsCopy[Number(actualColumnModal)].Tasks.push({id: `${maxIdx + 1}`, titulo: newTitle, desc: newDesc})
        setMaxIdx(maxIdx + 1)
        setTaskColumns(taskColumnsCopy)
    }


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
                {taskColumns.map((item, index) => <ColunaItems actualColumnFn={setActualColumnModal} temModalFn={setTemModal} key={item.idColumn} tasks={item.Tasks} index={index}/>)}
            </DragDropContext>
            {
                temModal &&
                <ModalAddCard temModalFn={setTemModal} tituloFn={setNewTitle} descFn={setNewDesc} addCardFn={addCard} />
            }
        </div>
    )
}