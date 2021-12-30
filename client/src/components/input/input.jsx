import {useState} from "react";
import s from './input.module.sass';
import send from "../../img/send.svg";
import DataService from "../../dataService";

const Input = ({conversationId, sender}) =>{

    const [message, setMessage] = useState('');

    const onInput = (e) => setMessage(e.target.value);
    const onSend =  async () => {
        const dataService = new DataService();
            await dataService.sendMessage({
            conversationId,
            sender,
            text: message
        })
        setMessage('');
    }

    return(
        <div className={s.inputWrapper}>
            <input type="text"
                   placeholder={'iMessage'}
                   value={message}
                   onChange={onInput}
            />
            <button className={s.buttonSend} onClick={onSend}>
                <img src={send} alt="send"/>
            </button>
        </div>
    )
}

export default Input;