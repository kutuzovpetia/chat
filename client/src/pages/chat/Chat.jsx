import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../../components/input";
import Avatar from '../../components/avatar';
import {Link, useParams} from "react-router-dom";
import ListChat from "../../components/list-chat";
import {useEffect, useState} from "react";
import DataService from "../../dataService";
import axios from "axios";
import {useRecoilState} from 'recoil';
import {user as u} from '../../state/atoms';

const Chat = () =>{

    const [currentUser] = useRecoilState(u)


    const testMessages = [
        {id: 1, text: 'Привет', own: false},
        {id: 2, text: 'Говори по Українськи!', own: true}
    ]

    const [user, setUser] = useState({});

    let { id } = useParams(); // Conversation ID

    useEffect(()=>{

        (async function(){

            const conversation = await axios.get(`/conversation/getOne/${id}`)
            const companionId = conversation.data.members.find(u => u !== currentUser._id);
            console.log(companionId)
            const user = await axios.get(`/auth/user/${companionId}`);
            setUser(user.data);

        })()

    },[])

    return(
        <div className={s.chatWrapper}>
            <header className={s.header}>
                <nav className={s.headerControls}>
                    <Link to="/">
                        <img src={arrow} alt="arrow"/>
                    </Link>
                    <Link to={`/user/${id}`}>
                        <Avatar url={user.imgUrl}
                                medium
                                user={user}
                        />
                    </Link>
                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>
                </nav>

                <Link to={`/user/${id}`} className={s.userName}>
                    {user.firstName}
                </Link>
            </header>

            <ListChat messages={testMessages}/>

            <footer>
                {/*<div className={s.status}>Tobias has notifications silenced</div>*/}
                <Input/>
            </footer>
        </div>
    )
}

export default Chat;