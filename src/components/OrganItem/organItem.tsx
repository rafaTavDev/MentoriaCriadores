import { useState, useEffect } from "react"
import ColunaItems from "../ColunaItems/ColunaItems"
import { DragDropContext } from "@hello-pangea/dnd"
import ModalAddCard from "../ModalAddCard/ModalAddCard"
import ModalEditCard from "../ModalEditCard/ModalEditCard"
import ModalAddColumn from "../ModalAddColumn/ModalAddColumn"
import ModalExcluirColuna from "../ModalExcluirColuna/ModalExcluirColuna"



export default function OrganItem(){
    const [temModalCard, setTemModalCard] = useState<boolean>(false)
    const [temModalColumn, setTemModalColumn] = useState<boolean>(false)
    const [temModalEditCard, setTemModalEditCard] = useState<boolean>(false)
    const [actualColumnModal, setActualColumnModal] = useState<string>("0")
    const [newTitleCard, setNewTitleCard] = useState<string>("")
    const [newTitleEditedCard, setNewTitleEditedCard] = useState<string>("Titulo do card teste")
    const [newDescEditedCard, setNewDescEditedCard] = useState<string>("desc do card teste")
    const [idEditedCard, setIdEditedCard] = useState<string>("")
    const [idEditedColumn, setIdEditedColumn] = useState<number>(0)
    const [newTitleColumn, setNewTitleColumn] = useState<string>("")
    const [newDesc, setNewDesc] = useState<string>("")
    const [maxId, setMaxId] = useState<number>(0)
    const [maxIdColumn, setMaxIdColumn] = useState<number>(0)
    const [temModalExcluirColuna, setTemModalExcluirColuna] = useState<boolean>(true)
    const [colunaPraRemoverIdx, setColunaPraRemoverIdx] = useState<number>(0)

    type cardType = {
        id: string,
        titulo: string,
        desc: string
    }

    type ColumnType = {
        titleColumn: string,
        Tasks: cardType[],
        idColumn: string
    }
    type taskColumnsType = ColumnType[]

  
    const [taskColumns, setTaskColumns] = useState<taskColumnsType>([])

    useEffect(() => {
        //Salvar o atual taskColumns no banco de dados aqui, pq ai toda vez que mudar vai salvar (Pra isso não dar merda com os usuários, tem que ter confirmação pra fazer tudo, pelo menos pra apagar as coisas tem que ter)

    }, [taskColumns])

    useEffect(() => {
        console.log(taskColumns)
    }, [taskColumns])

    function openEditModal(titleActualCard: string, descActualCard: string, id: string, idColumn: number){
        setTemModalEditCard(true)
        setNewTitleEditedCard(titleActualCard)
        setNewDescEditedCard(descActualCard)
        setIdEditedCard(id)
        setIdEditedColumn(idColumn)
    }

    function removeCard(id: string, idColumn: number){
        const taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        console.log(taskColumnsCopy.filter(item => item.idColumn == `${idColumn}`)[0])
        let newTasks = taskColumnsCopy.filter(item => item.idColumn == `${idColumn}`)[0].Tasks.filter(item => item.id !== id)
        taskColumnsCopy.filter(item => item.idColumn == `${idColumn}`)[0].Tasks = newTasks
        setTaskColumns(taskColumnsCopy) 

    }

    function editCard(){
        const taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        let idxEditedItem = taskColumnsCopy.filter(item => item.idColumn == `${idEditedColumn}`)[0].Tasks.indexOf(taskColumnsCopy.filter(item => item.idColumn == `${idEditedColumn}`)[0].Tasks.filter(item => item.id == idEditedCard)[0]) 
        taskColumnsCopy.filter(item => item.idColumn == `${idEditedColumn}`)[0].Tasks[idxEditedItem].titulo = newTitleEditedCard
        taskColumnsCopy.filter(item => item.idColumn == `${idEditedColumn}`)[0].Tasks[idxEditedItem].desc = newDescEditedCard
        setTaskColumns(taskColumnsCopy)
        setTemModalEditCard(false)
    }


    function addCard(){
        const taskColumnsCopy:taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        let idxColumnToAdd = taskColumnsCopy.findIndex(item => item.idColumn == actualColumnModal)
        taskColumnsCopy[idxColumnToAdd].Tasks.push({id: `${maxId + 1}`, titulo: newTitleCard, desc: newDesc})
        setMaxId(maxId + 1)
        setTaskColumns(taskColumnsCopy)
    }

    function addColumn(){
        const taskColumnsCopy = JSON.parse(JSON.stringify(taskColumns))
        taskColumnsCopy.push({titleColumn: newTitleColumn, Tasks:[], idColumn: `${maxIdColumn + 1}`})
        setMaxIdColumn(maxIdColumn + 1)
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

    function removeColumn(idxRemovedColumn: number){
        let taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        taskColumnsCopy.splice(idxRemovedColumn, 1)
        setTaskColumns(taskColumnsCopy) 
    }

    return (
        <div className="flex items-start gap-3 bg-black flex-1 p-3">
            <DragDropContext onDragEnd={onDragEnd}>
                {taskColumns.map((item, index) => <ColunaItems setTemModalExcluirColuna={setTemModalExcluirColuna} removeColumnFn={removeColumn} indexColuna={index} openEditModal={openEditModal} removeFn={removeCard} tituloColuna={item.titleColumn} actualColumnFn={setActualColumnModal} temModalFn={setTemModalCard} key={item.idColumn} tasks={item.Tasks} idColumn={Number(item.idColumn)} temModalEditFn={setTemModalEditCard}/>)}
            </DragDropContext>
            <button onClick={() => setTemModalColumn(true)} className="p-3 text-xl bg-white bg-opacity-50 text-white rounded-xl">
                Adicionar lista +
            </button>
            {
                temModalCard &&
                <ModalAddCard temModalFn={setTemModalCard} tituloFn={setNewTitleCard} descFn={setNewDesc} addCardFn={addCard} />
            }
            {
                temModalColumn &&
                <ModalAddColumn temModalFn={setTemModalColumn} tituloFn={setNewTitleColumn} addColumnFn={addColumn} />
            }
            {
                temModalEditCard &&
                <ModalEditCard temModalFn={setTemModalEditCard} tituloFn={setNewTitleEditedCard} descFn={setNewDescEditedCard} editCardFn={editCard} newTitleEditedCard={newTitleEditedCard} newDescEditedCard={newDescEditedCard} />
            }
            {
                temModalExcluirColuna &&
                <ModalExcluirColuna who="coluna" setTemModalExcluirColuna={setTemModalExcluirColuna}/>
            }
        </div>
    )
}