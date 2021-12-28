import s from './modal.module.sass';

const Modal = ({onClose, content}) => {

    return (
        <div className={s.modal} onClick={onClose}>
            {
                content
            }
        </div>
    )
}




export default Modal;