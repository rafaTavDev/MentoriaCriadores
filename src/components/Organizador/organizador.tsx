import { useState } from "react"
import OrganItem from "../OrganItem/organItem"
import ModalAddCard from "../ModalAddCard/ModalAddCard"

export default function Organizador(){
    const [temModal, setTemModal] = useState<boolean>(false)

    return (
        <>
            <OrganItem temModalFn={setTemModal} />
            {
                temModal &&
                <ModalAddCard temModalFn={setTemModal}/>
            }
        </>
    )
}