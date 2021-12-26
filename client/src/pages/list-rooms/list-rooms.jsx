import s from './list-rooms.module.sass';
import compose from '../../img/btn-compose.svg';
import ListRoomsItem from "../../components/list-rooms-item";
import Avatar from '../../components/avatar';
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from 'recoil';
import {conversation as c, anchors as a, user, isLogged as logged} from '../../state/atoms';
import {useEffect, useState} from "react";
// import {io} from 'socket.io-client';



const Rooms = ({socket}) =>{

    const navigate = useNavigate();
    const [conversation, setConversation] = useRecoilState(c);
    const [anchors, setAnchors] = useRecoilState(a);
    const [currentUser, setCurrentUser] = useRecoilState(user);
    const [isLogged, setIsLogged] = useRecoilState(logged);

    const [users, setUsers] = useState([]);

    const handlerInAnchor = (id) => {
        setAnchors([...anchors, conversation.find(c => c.id === id)])
        setConversation(conversation.filter(c => c.id !== id))
    }

    const handlerOutAnchor = (id) => {
        setConversation([...conversation, anchors.find(c => c.id === id)])
        setAnchors(anchors.filter(c => c.id !== id))
    }


    useEffect(()=>{
        socket?.emit('logIn', currentUser);
        socket?.on('getUsers', (users)=>{
            setUsers(users)
        })
    },[currentUser, socket])

    const logOut = () => {
        socket.disconnect();
        navigate('/');
        setCurrentUser({});
        setIsLogged(false);
        localStorage.removeItem('token');
    }

    return(
        <>
            <header className={s.messagesHeader}>
                <div className={s.headerControls}>
                    <button className={s.buttonEdit}>Edit</button>
                    <h1>Messages</h1>
                    <button>
                        <img src={compose} alt="icon"/>
                    </button>

                    <button className={s.btnLogOut} onClick={logOut}>
                        Log Out
                    </button>
                </div>
                <div className={s.inputSearch}>
                    <input type="text" placeholder={'Search'}/>
                </div>
            </header>

            <ul className={s.chatList}>

                <ul className={s.anchorsWrapper}>
                    {
                        anchors.map((item, i)=>{
                            return  <li key={i}>

                                        <Link to={`/chat/${item.id}`}>
                                            <Avatar
                                                id={item.id}
                                                url={'https://upload.wikimedia.org/wikipedia/commons/0/0d/SBandera.jpg'}
                                                large
                                                userName={item.userName}
                                                newMessage
                                                cbLongTouch={handlerOutAnchor}
                                            />
                                        </Link>
                                    </li>
                        })
                    }

                </ul>
                {/*{*/}
                {/*    conversation.map((item) => {*/}

                {/*        return <ListRoomsItem*/}
                {/*                    key={item.id}*/}
                {/*                    id={item.id}*/}
                {/*                    url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}*/}
                {/*                    text={item.text}*/}
                {/*                    userName={item.userName}*/}
                {/*                    cbLongTouch={handlerInAnchor}*/}
                {/*                />*/}
                {/*    })*/}
                {/*}*/}

                {
                    users.map((u) => {
                        if(u._id !== currentUser._id){
                            return <ListRoomsItem
                                key={u._id}
                                id={u._id}
                                url={`https://avochka.ru/img/kartinka/1/enot_glass.jpg`}
                                text={'Some text'}
                                userName={u.firstName}
                                cbLongTouch={handlerInAnchor}
                            />
                        }
                    })
                }
            </ul>
        </>
    )
}

export default Rooms;