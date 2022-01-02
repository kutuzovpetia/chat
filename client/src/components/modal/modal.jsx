import s from './modal.module.sass';
import ReactDOM from "react-dom";

const Modal = ({onClose, content}) => {

    return ReactDOM.createPortal(
        <div className={s.modal}>
            { content }
        </div>,
        document.getElementById('modal-root')
    )
}




export default Modal;