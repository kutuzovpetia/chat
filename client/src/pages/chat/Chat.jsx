import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../../components/input";
import Avatar from '../../components/avatar';
import {Link, useParams} from "react-router-dom";
import ListChat from "../../components/list-chat";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState} from 'recoil';
import {user as u, messages as m} from '../../state/atoms';

const Chat = ({socket}) =>{

    const [currentUser] = useRecoilState(u)
    const [currentMessages, setCurrentMessages] = useRecoilState(m);
    // const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});
    let { id } = useParams(); // Conversation ID

console.log(user)

    useEffect(()=>{
        (async function(){
            const conversation = await axios.get(`/conversation/getOne/${id}`)
            const companionId = conversation.data.members.find(u => u._id !== currentUser._id);
            setUser(companionId);
        })()
    },[])

    useEffect(()=>{
        (async function(){
            const m = await axios.get(`/message/${id}`);
            setCurrentMessages(m.data);
            // setMessages(m.data);
        })()
    },[])


    useEffect(()=>{
        socket.on('getMessage', ({message, receiverId}) =>{
            console.log(receiverId)
            if (id === message.conversationId){
                setCurrentMessages([...currentMessages, message])
            }
        })

    }, [currentMessages])


    return(
        <div className={s.chatWrapper}>
            <header className={s.header}>
                <nav className={s.headerControls}>
                    <Link to="/">
                        <img src={arrow} alt="arrow"/>
                    </Link>
                    <Link to={`/user/${user._id}/${id}`}>
                        <Avatar url={user.imgUrl}
                                medium
                                user={user}
                        />
                    </Link>
                    <button>
                        {/*<img src={camera} alt="arrow"/>*/}
                    </button>
                </nav>

                <Link to={`/user/${user._id}/${id}`} className={s.userName}>
                    {user.firstName}
                </Link>
            </header>

            <ListChat messages={currentMessages} currentUser={currentUser}/>

            <footer>
                <Input conversationId={id}
                       sender={currentUser._id}
                       socket={socket}
                       setCurrentMessages={setCurrentMessages}
                       currentMessages={currentMessages}
                />
            </footer>
        </div>
    )
}

export default Chat;