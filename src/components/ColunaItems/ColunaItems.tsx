import { Dispatch, SetStateAction } from "react"
import Task from "../Task/Task";
import { Droppable } from "@hello-pangea/dnd"

type objTask = {
    id: number,
    desc: string,
    titulo: string,
}

type Props = {
    setTemModalExcluirColuna: Dispatch<SetStateAction<boolean>>,
    tasks: objTask[],
    idColumn: number,
    temModalFn: Dispatch<SetStateAction<boolean>>,
    temModalEditFn: Dispatch<SetStateAction<boolean>>,
    actualColumnFn: Dispatch<SetStateAction<number>>,
    tituloColuna: string,
    activeModalRemoveCard: (id: number, idColumn: number, index: number) => void,
    openEditModal: (titleActualCard: string, descActualCard: string, id: number, idxColumn: number) => void,
    indexColuna: number,
    activeModalRemoveColumn: (idRemovedColumn: number) => void,
}

export default function ColunaItems({tasks, idColumn, temModalFn, actualColumnFn, tituloColuna, activeModalRemoveCard, openEditModal, indexColuna, activeModalRemoveColumn}: Props){

    function handleAddClick(){
        temModalFn(true)
        actualColumnFn(idColumn)
    }






    return (
        <div className="lg:w-[17vw] w-[80vw] rounded-xl bg-slate-500 lg:p-3 p-3 pr-10 max-h-[80vh] overflow-y-auto scrollbar-thin
         scrollbar-track-gray-950 scrollbar-thumb-slate-600">
                <Droppable droppableId={`${idColumn}`}>
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
                                <div className="font-bold text-xl">
                                    {tituloColuna}
                                </div>
                                {tasks.map((item, index) => <Task key={item.id} titulo={item.titulo} texto={item.desc} id={item.id} index={index} activeModalRemoveCard={activeModalRemoveCard} idColumn={idColumn} openEditModal={openEditModal}/>)}
                                {provided.placeholder}
                                <div className="flex lg:flex-col gap-3 order-first lg:order-1">
                                    <button onClick={() => handleAddClick()} className="p-3 lg:text-xl text-md bg-white bg-opacity-50 text-white rounded-xl">Add card +</button>
                                    <button onClick={() => activeModalRemoveColumn(idColumn)} className="bg-red-500 text-white text-md p-3 rounded-xl lg:self-center">Excluir Coluna</button>
                                </div>
                            </div>
                        )
                    }
                </Droppable>
        </div>
    )
}