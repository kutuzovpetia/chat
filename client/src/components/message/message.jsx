import s from './message.module.sass';
import {useState} from "react";

const Message = ({ own, text }) =>{

    const [menuActive, setMenuActive] = useState(false);
    const send = { bottom: '-112px', right: 0}
    const receive = { bottom: '-112px', left: 0}

    const openMenu = () => setMenuActive(!menuActive)

    return(
        <li className={s.messageWrapper}>
            <h6 className={own ? s.send : s.receive} onClick={openMenu}>{text}</h6>
            <ul className={menuActive ? s.messageMenuActive : s.messageMenu} style={own? send : receive}>
                <li>Like</li>
                <li>Delete</li>
                <li>Forward</li>
            </ul>
        </li>
    )
}

export default Message;