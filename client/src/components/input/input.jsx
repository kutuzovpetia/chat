import {useState} from "react";
import s from './input.module.sass';
import send from "../../img/send.svg";
import sendBlue from "../../img/send-blue.svg";
import DataService from "../../dataService";
import {user} from '../../state/atoms';
import {useRecoilState} from "recoil";

const Input = ({conversationId, sender, selectedContact, socket, setCurrentMessages, currentMessages}) =>{

    const dataService = new DataService();
    const [message, setMessage] = useState('');
    const [currentUser,] = useRecoilState(user);

    const onInput = (e) => setMessage(e.target.value);

    const onSend =  async () => {

        const dataService = new DataService();
         const m = await dataService.sendMessage({
            conversationId,
            sender,
            text: message
        })

        if(m){
            const conversation = await dataService.getData(`/conversation/getOne/${conversationId}`);
            const user = conversation.members.find(u => u._id !== currentUser._id);

            socket.emit("sendMessage", {
                message: m,
                receiverId: user._id,
            })

            // setCurrentMessages([...currentMessages, m])
        }

        setMessage('');
    }

    const createConversation = async () => {
        if(currentUser._id && selectedContact._id){
            const conversation = await dataService.addConversation({
                senderId: currentUser._id,
                receiverId: selectedContact._id
            });
            console.log(conversation);
        }
    }

    return(
        <div className={s.inputWrapper}>
            <input type="text"
                   placeholder={'iMessage'}
                   value={message}
                   onChange={onInput}
            />
            <button className={s.buttonSend}
                    onClick={conversationId ? onSend : createConversation}
            >
                <img src={conversationId ? sendBlue : send} alt="send"/>
            </button>
        </div>
    )
}

export default Input;