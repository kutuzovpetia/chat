import s from './message.module.sass';
import {useState} from "react";
import {useRecoilState} from 'recoil';
import {messages as m} from '../../state/atoms';
import DataService from "../../dataService";

const Message = ({id, own, text }) =>{

    const dataService = new DataService();
    const [menuActive, setMenuActive] = useState(false);
    const send = { bottom: '-112px', right: 0};
    const receive = { bottom: '-112px', left: 0};
    const [messages, setMessages] = useRecoilState(m);

    const openMenu = () => setMenuActive(!menuActive)

    const removeMessage = async () =>{
        await dataService.removeMessage(id);
        setMessages([...messages].filter(m => m._id !== id));
    }

    return(
        <li className={s.messageWrapper}>
            <h6 className={own ? s.send : s.receive} onClick={openMenu}>{text}</h6>
            <ul className={menuActive ? s.messageMenuActive : s.messageMenu} style={own? send : receive}>
                <li>Like</li>
                <li onClick={removeMessage}>Delete</li>
                <li>Forward</li>
            </ul>
        </li>
    )
}

export default Message;