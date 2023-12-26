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
    idxColumn: number,
    temModalFn: Dispatch<SetStateAction<boolean>>,
    temModalEditFn: Dispatch<SetStateAction<boolean>>,
    actualColumnFn: Dispatch<SetStateAction<string>>,
    tituloColuna: string,
    removeFn: (id: string, idColumn: number) => void,
    openEditModal: (titleActualCard: string, descActualCard: string, id: string, idxColumn: number) => void
}

export default function ColunaItems({tasks, idxColumn, temModalFn, actualColumnFn, tituloColuna, removeFn, openEditModal}: Props){

    function handleAddClick(){
        temModalFn(true)
        actualColumnFn(`${idxColumn}`)
    }






    return (
        <div className="w-1/6 rounded-xl bg-slate-500 p-3">
                <Droppable droppableId={`${idxColumn}`}>
                    {
                        (provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3">
                                <div className="font-bold text-xl">
                                    {tituloColuna}
                                </div>
                                {tasks.map((item, index) => <Task key={item.id} titulo={item.titulo} texto={item.desc} id={item.id} index={index} removeFn={removeFn} idxColumn={idxColumn} openEditModal={openEditModal}/>)}
                                {provided.placeholder}
                                <button onClick={() => handleAddClick()} className="p-3 text-xl bg-white bg-opacity-50 text-white rounded-xl">Adicionar um card +</button>
                            </div>
                        )
                    }
                </Droppable>
        </div>
    )
}