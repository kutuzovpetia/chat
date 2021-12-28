import s from './list-rooms.module.sass';
import compose from '../../img/btn-compose.svg';
import ListRoomsItem from "../../components/list-rooms-item";
import Avatar from '../../components/avatar';
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from 'recoil';
import {conversation as c, anchors as a, user, isLogged as logged} from '../../state/atoms';
import {useEffect, useState} from "react";
// import {io} from 'socket.io-client';
import DataService from "../../dataService";
import AnchorItem from "../../components/anchor-item";

const dataService = new DataService();

const Rooms = ({socket, toggleModal}) =>{

    const navigate = useNavigate();
    const [conversation, setConversation] = useRecoilState(c);
    const [anchors, setAnchors] = useRecoilState(a);
    const [currentUser, setCurrentUser] = useRecoilState(user);
    const [isLogged, setIsLogged] = useRecoilState(logged);

    const [users, setUsers] = useState([]);

    const handlerInAnchor = async (id) => {
        await dataService.addConversationToFavorite(currentUser._id, id);
        setAnchors([...anchors, conversation.find(c => c._id === id)])
        setConversation(conversation.filter(c => c._id !== id))
    }

    const handlerOutAnchor = async (id) => {
        await dataService.removeConversationFromFavorite(currentUser._id, id);
        setConversation([...conversation, anchors.find(c => c._id === id)])
        setAnchors(anchors.filter(c => c._id !== id))
    }

    useEffect(()=>{

        (async function (){
            const result = await dataService.getConversations(currentUser._id);
            const inConversation = result.filter(c => !c.favorite.includes(currentUser._id));
            const inAnchors = result.filter(c => c.favorite.includes(currentUser._id))
            setConversation(inConversation);
            setAnchors(inAnchors);
        })()

    },[])

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
                    <button onClick={toggleModal}>
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
                        anchors.map((item)=>{

                                return  <li key={item._id}>
                                            <Link to={`/chat/${item._id}`}>

                                                <AnchorItem
                                                    anchor={item}
                                                    cbLongTouch={handlerOutAnchor}
                                                    currentUser={currentUser}
                                                />
                                                {/*<Avatar*/}
                                                {/*    id={item._id}*/}
                                                {/*    url={'https://upload.wikimedia.org/wikipedia/commons/0/0d/SBandera.jpg'}*/}
                                                {/*    large*/}
                                                {/*    userName={item.firstName}*/}
                                                {/*    newMessage*/}
                                                {/*    cbLongTouch={handlerOutAnchor}*/}
                                                {/*/>*/}

                                            </Link>
                                        </li>

                        })
                    }

                </ul>
                {
                    conversation.map((item) => {

                        // return <ListRoomsItem
                        //             key={item._id}
                        //             id={item._id}
                        //             url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}
                        //             text={item.text}
                        //             userName={item.userName}
                        //             cbLongTouch={handlerInAnchor}
                        //         />

                        return <ListRoomsItem
                            key={item._id}
                            conversation={item}
                            currentUser={currentUser}
                            cbLongTouch={handlerInAnchor}
                        />

                    })
                }

                {/*{*/}
                {/*    users.map((u) => {*/}
                {/*        if(u._id !== currentUser._id){*/}
                {/*            return <ListRoomsItem*/}
                {/*                key={u._id}*/}
                {/*                id={u._id}*/}
                {/*                url={`https://avochka.ru/img/kartinka/1/enot_glass.jpg`}*/}
                {/*                text={'Some text'}*/}
                {/*                userName={u.firstName}*/}
                {/*                cbLongTouch={handlerInAnchor}*/}
                {/*            />*/}
                {/*        }*/}
                {/*    })*/}
                {/*}*/}
            </ul>
        </>
    )
}

export default Rooms;