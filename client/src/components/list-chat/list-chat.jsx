import s from './chat.module.sass';
import Message from "../message";
import {useEffect, useRef} from "react";


const ListChat = ({messages, currentUser}) =>{

    const scrollRef = useRef();

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    return(
        <div className={s.wrapper}>
            <ul className={s.chatContent}>
                {
                    messages && messages.map(m => {
                        return  <Message key={m._id} own={currentUser._id === m.sender} text={m.text}/>
                    })
                }
                <div ref={scrollRef}></div>
            </ul>
        </div>
    )
}

export default ListChat;