import { useState, useEffect, useContext } from "react"
import ColunaItems from "../ColunaItems/ColunaItems"
import { DragDropContext } from "@hello-pangea/dnd"
import ModalAddCard from "../ModalAddCard/ModalAddCard"
import ModalEditCard from "../ModalEditCard/ModalEditCard"
import ModalAddColumn from "../ModalAddColumn/ModalAddColumn"
import ModalExcluirColuna from "../ModalExcluirColuna/ModalExcluirColuna"
import ModalExcluirCard from "../ModalExcluirCard/ModalExcluirCard"
import { ErroContext } from "../../Contexts/ModalErroContext"



export default function OrganItem(){
    const [temModalCard, setTemModalCard] = useState<boolean>(false)
    const [temModalColumn, setTemModalColumn] = useState<boolean>(false)
    const [temModalEditCard, setTemModalEditCard] = useState<boolean>(false)
    const [actualColumnModal, setActualColumnModal] = useState<number>(0)
    const [newTitleCard, setNewTitleCard] = useState<string>("")
    const [newTitleEditedCard, setNewTitleEditedCard] = useState<string>("Titulo do card teste")
    const [newDescEditedCard, setNewDescEditedCard] = useState<string>("desc do card teste")
    const [idEditedCard, setIdEditedCard] = useState<number>(0)
    const [idEditedColumn, setIdEditedColumn] = useState<number>(0)
    const [newTitleColumn, setNewTitleColumn] = useState<string>("")
    const [newDesc, setNewDesc] = useState<string>("")
    const [maxId, setMaxId] = useState<number>(0)
    const [maxIdColumn, setMaxIdColumn] = useState<number>(0)
    const [temModalExcluirColuna, setTemModalExcluirColuna] = useState<boolean>(false)
    const [temModalExcluirCard, setTemModalExcluirCard] = useState<boolean>(false)
    const [colunaPraRemoverIdx, setColunaPraRemoverIdx] = useState<number>(0)
    const [colunaCardRemover, setColunaCardRemover] = useState<number>(0)
    const [idxCardRemover, setIdxCardRemover] = useState<number>(0)
    const [idCardRemover, setIdCardRemover] = useState<number>(0)
    const [idColunaRemover, setIdColunaRemover]  = useState<number>(0)

    const {temErro, setTemErro, carregando, setCarregando} = useContext(ErroContext)

    let url = "http://localhost:3000"

    useEffect(() => {
        console.log(temErro)
    }, [temErro])


    type cardType = {
        id: number,
        titulo: string,
        desc: string
    }

    type ColumnType = {
        titleColumn: string,
        Tasks: cardType[],
        idColumn: number
    }
    type taskColumnsType = ColumnType[]

  
    const [taskColumns, setTaskColumns] = useState<taskColumnsType>([])

    useEffect(() => {
      fetch(url + "/pegarColunas", {
        method: "POST",
        headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
        body: JSON.stringify({})
      }).then(res => res.json()).then(data => {
        if(data[0] == "erro"){
            setTemErro(true)
        }else{
            setTaskColumns(data)
        }
    }).catch(() => setTemErro(true)).finally(() => setCarregando(false))
      setCarregando(true)
    }, [])
  

    function openEditModal(titleActualCard: string, descActualCard: string, id: number, idColumn: number){
        setTemModalEditCard(true)
        setNewTitleEditedCard(titleActualCard)
        setNewDescEditedCard(descActualCard)
        setIdEditedCard(id)
        setIdEditedColumn(idColumn)
    }

    function activeModalRemoveCard(id: number, idColumn: number, idxCardRemover: number){
        setTemModalExcluirCard(true)
        setColunaCardRemover(idColumn)
        setIdCardRemover(id)
        setIdxCardRemover(idxCardRemover)
    }

    function removeCard(){
        /*const taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        console.log(taskColumnsCopy.filter(item => item.idColumn == `${colunaCardRemover}`)[0])
        let newTasks = taskColumnsCopy.filter(item => item.idColumn == `${colunaCardRemover}`)[0].Tasks.filter(item => item.id !== idCardRemover)
        taskColumnsCopy.filter(item => item.idColumn == `${colunaCardRemover}`)[0].Tasks = newTasks
        setTaskColumns(taskColumnsCopy) 
        setTemModalExcluirCard(false)*/
        fetch(url + "/removerCard", {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
            body: JSON.stringify({id_card: idCardRemover, idxCardRemover, colunaCardRemover})
        }).then(res => res.json()).then(data => {
            if(data[0] == "erro"){
                setTemErro(true)
            }else{
                setTaskColumns(data)
            }
        }).catch(() => setTemErro(true)).finally(() => setCarregando(false))
        setCarregando(true)
    }

    function editCard(){
        /*const taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        let idxEditedItem = taskColumnsCopy.filter(item => item.idColumn == idEditedColumn)[0].Tasks.indexOf(taskColumnsCopy.filter(item => item.idColumn == idEditedColumn)[0].Tasks.filter(item => item.id == idEditedCard)[0]) 
        taskColumnsCopy.filter(item => item.idColumn ==idEditedColumn)[0].Tasks[idxEditedItem].titulo = newTitleEditedCard
        taskColumnsCopy.filter(item => item.idColumn == idEditedColumn)[0].Tasks[idxEditedItem].desc = newDescEditedCard
        setTaskColumns(taskColumnsCopy)
        setTemModalEditCard(false)*/


        fetch(url + "/editCard", {
            method: "PUT",
            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
            body: JSON.stringify({id_card: idEditedCard, novoTituloCard: newTitleEditedCard, novaDescricao: newDescEditedCard})
        }).then(res => res.json()).then(data => {
            if(data[0] == "erro"){
                setTemErro(true)
            }else{
                setTaskColumns(data)
            }
        }).catch(() => setTemErro(true)).finally(() => setCarregando(false))
        setCarregando(true)

    }


    function addCard(){
        /*const taskColumnsCopy:taskColumnsType = JSON.parse(JSON.stringify(taskColumns))

        setMaxId(maxId + 1)
        setTaskColumns(taskColumnsCopy)
        taskColumnsCopy[idxColumnToAdd].Tasks.push({id: `${maxId + 1}`, titulo: newTitleCard, desc: newDesc})
        */

        let idxColumnToAdd = taskColumns.findIndex(item => item.idColumn == actualColumnModal)
        let idColumn = taskColumns[idxColumnToAdd].idColumn
        let idxCard = taskColumns[idxColumnToAdd].Tasks.length

        fetch(url + "/adicionarCard", {
            method: "POST",
            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
            body: JSON.stringify({tituloCard: newTitleCard, descricao: newDesc, id_column: idColumn, idxCard})
        }).then(res => res.json()).then(data => {
            if(data[0] == "erro"){
                setTemErro(true)
            }else{
                setTaskColumns(data)
            }
        }).catch(() => setTemErro(true)).finally(() => setCarregando(false))
        setCarregando(true)
    }

    function addColumn(){
        /*const taskColumnsCopy = JSON.parse(JSON.stringify(taskColumns))
        taskColumnsCopy.push({titleColumn: newTitleColumn, Tasks:[], idColumn: `${maxIdColumn + 1}`})
        setMaxIdColumn(maxIdColumn + 1)
        setUltimoTaskColumns(taskColumns)
        setTaskColumns(taskColumnsCopy)*/
        fetch(url + "/adicionarColuna", {//Por causa da arquitetura restful a url tem que ser stateless, ou seja, eu mandaria aqui o seguinte: ${maxIdColumn + 1}, mas isso estaria ussando um state e indo contra o pasrão da arquitetura, então o que devemos fazer é usar os ids das colunas gerados unicamente por um uuid
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""
            },
            body: JSON.stringify({
                titulo: newTitleColumn
            })
        }).then(res => res.json()).then(data => {setTaskColumns(data)}).catch(err => setTemErro(true)).finally(() => setCarregando(false))
        setCarregando(true)
    }


    /*function reorder(startIdx: number, endIdx: number, startCol: number, endCol: number){
        const taskColumnsCopy = JSON.parse(JSON.stringify(taskColumns))
        const [removed] = taskColumnsCopy[startCol].Tasks.splice(startIdx, 1)
        taskColumnsCopy[endCol].Tasks.splice(endIdx, 0, removed)
        return taskColumnsCopy
    }*/


    function onDragEnd(result: any){

        /*const newTaskColumns = reorder(result.source.index, result.destination.index, result.source.droppableId, result.destination.droppableId)//Aqui preciso do index da coluna que solto o item pra fazer taskColumns[indexColunaFinal]
        setTaskColumns(newTaskColumns)*/

        fetch(url + "/moverCard", {
            method: "PUT",
            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
            body: JSON.stringify({idSourceColumn: result.source.droppableId, idDestColumn: result.destination.droppableId, sourceIdx: result.source.index, destIdx: result.destination.index})
        }).then(res => res.json()).then(data => setTaskColumns(data)).catch(() => setTemErro(true)).finally(() => setCarregando(false))
        setCarregando(true)

    }

    function activeModalRemoveColumn(idRemovedColumn: number){
        setTemModalExcluirColuna(true)
        setIdColunaRemover(idRemovedColumn)
    }

    function removeColumn(){
        /*let taskColumnsCopy: taskColumnsType = JSON.parse(JSON.stringify(taskColumns))
        taskColumnsCopy.splice(colunaPraRemoverIdx, 1)
        setTaskColumns(taskColumnsCopy) 
        setTemModalExcluirColuna(false)*/

        fetch(url + "/removerColuna", {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""},
            body: JSON.stringify({
                idColunaRemover
            })
        }).then(res => res.json()).then(data => {
                console.log(data)
                if(data[0] == "erro"){
                    setTemModalExcluirColuna(false)
                    setTemErro(true)
                }else{
                    console.log(data)
                    setTaskColumns(data)
                    setTemModalExcluirColuna(false)
                }
        }).catch(() => setTemErro(true)).finally(() => setCarregando(false))
    
        setCarregando(true)

    }



    return (
        <div className="flex lg:flex-row flex-col flex-1 items-start gap-3 bg-black p-3 overflow-y-hidden overflow-x-scroll w-auto">
            <div className="flex items-start gap-3 bg-black">
                <DragDropContext onDragEnd={onDragEnd}>
                    {taskColumns.map((item, index) => <ColunaItems setTemModalExcluirColuna={setTemModalExcluirColuna} activeModalRemoveColumn={activeModalRemoveColumn} indexColuna={index} openEditModal={openEditModal} activeModalRemoveCard={activeModalRemoveCard} tituloColuna={item.titleColumn} actualColumnFn={setActualColumnModal} temModalFn={setTemModalCard} key={item.idColumn} tasks={item.Tasks} idColumn={Number(item.idColumn)} temModalEditFn={setTemModalEditCard}/>)}
                </DragDropContext>
            </div>
            <button onClick={() => setTemModalColumn(true)} className="p-3 text-xl bg-white bg-opacity-50 text-white rounded-xl order-first lg:order-1">
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
                <ModalExcluirColuna removeColumnFn={removeColumn} setTemModalExcluirColuna={setTemModalExcluirColuna}/>
            }
            {
                temModalExcluirCard &&
                <ModalExcluirCard removeCardFn={removeCard} setTemModalExcluirCard={setTemModalExcluirCard}/>
            }
        </div>
    )
}