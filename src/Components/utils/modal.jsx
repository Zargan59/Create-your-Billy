import Button from "./button"


export default function ModalContent({NameModal, setIsOpen}){

    const closeModal = ()=>{
        setIsOpen(false)
    }

return(
    <div className="modal">
        <div className="modalHeader">
            <h2>{NameModal} </h2>
            <span className="closeModal">
                <Button text="X" handleClick={closeModal} />
            </span>
        </div>
        <div className="modalContent">
            <input type="checkbox" />
        </div>

    </div>
)
}