import s from './chat.module.sass';
import Message from "../message";


const ListChat = ({messages, currentUser}) =>{

    return(
        <div className={s.wrapper}>
            <ul className={s.chatContent}>
                {
                    messages && messages.map(m => {
                        return  <Message key={m._id} own={currentUser._id === m.sender} text={m.text}/>
                    })
                }
            </ul>
        </div>
    )
}

export default ListChat;