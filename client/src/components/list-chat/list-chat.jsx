import s from './chat.module.sass';
import Message from "../message";


const ListChat = ({messages}) =>{

    return(
        <section>
            <ul className={s.chatContent}>
                {
                    messages && messages.map(m => {
                        return  <Message key={m.id} own={m.own} text={m.text}/>
                    })
                }
            </ul>
        </section>
    )
}

export default ListChat;