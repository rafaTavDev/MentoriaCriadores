import { Dispatch, SetStateAction } from "react"
import Task from "../Task/Task";
import { Droppable } from "@hello-pangea/dnd"

type objTask = {
    id: string,
    desc: string,
    titulo: string,
}

type Props = {
    tasks: objTask[],
    idColumn: number,
    temModalFn: Dispatch<SetStateAction<boolean>>,
    temModalEditFn: Dispatch<SetStateAction<boolean>>,
    actualColumnFn: Dispatch<SetStateAction<string>>,
    tituloColuna: string,
    removeFn: (id: string, idColumn: number) => void,
    openEditModal: (titleActualCard: string, descActualCard: string, id: string, idxColumn: number) => void,
    indexColuna: number,
    removeColumnFn: (idxRemovedColumn: number) => void
}

export default function ColunaItems({tasks, idColumn, temModalFn, actualColumnFn, tituloColuna, removeFn, openEditModal, indexColuna, removeColumnFn}: Props){

    function handleAddClick(){
        temModalFn(true)
        actualColumnFn(`${idColumn}`)
    }






    return (
        <div className="w-1/6 rounded-xl bg-slate-500 p-3">
                <Droppable droppableId={`${indexColuna}`}>
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
                                <div className="font-bold text-xl">
                                    {tituloColuna}
                                </div>
                                {tasks.map((item, index) => <Task key={item.id} titulo={item.titulo} texto={item.desc} id={item.id} index={index} removeFn={removeFn} idColumn={idColumn} openEditModal={openEditModal}/>)}
                                {provided.placeholder}
                                <button onClick={() => handleAddClick()} className="p-3 text-xl bg-white bg-opacity-50 text-white rounded-xl">Adicionar um card +</button>
                                <button onClick={() => removeColumnFn(indexColuna)} className="bg-red-500 text-white text-md p-3 rounded-xl self-center">Excluir Coluna</button>
                            </div>
                        )
                    }
                </Droppable>
        </div>
    )
}