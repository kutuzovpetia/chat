import s from './list-rooms.module.sass';
import compose from '../../img/btn-compose.svg';
import ListRoomsItem from "../../components/list-rooms-item";
// import Avatar from '../../components/avatar';
import {Link, useNavigate} from "react-router-dom";
import {useRecoilState} from 'recoil';
import { conversation as c, anchors as a, user, isLogged as logged, usersOnline as online} from '../../state/atoms';
import {useEffect, useState} from "react";
import DataService from "../../dataService";
import AnchorItem from "../../components/anchor-item";
import axios from "axios";

const dataService = new DataService();

const Rooms = ({socket, toggleModal}) =>{

    const navigate = useNavigate();
    const [conversation, setConversation] = useRecoilState(c);
    const [anchors, setAnchors] = useRecoilState(a);
    const [currentUser, setCurrentUser] = useRecoilState(user);
    const [, setIsLogged] = useRecoilState(logged);
    const [, setUsersOnline] = useRecoilState(online);
    const [selectedConversation, setSelectedConversation] = useState([]);
    const [deletingMode, setDeletingMode] = useState(false);


    const [filterValue, setFilterValue] = useState('');

    const onFilter = (e) => setFilterValue(e.target.value);

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

    },[currentUser._id, setAnchors, setConversation])

    const logOut = () => {
        socket.disconnect();
        navigate('/');
        setCurrentUser({});
        setIsLogged(false);
        localStorage.removeItem('token');
        socket.on('getUsers', users => setUsersOnline(users))
    }

    const deletingModeToogle = () => {
        !deletingMode && setSelectedConversation([]);
        setDeletingMode(!deletingMode);
    }

    const deleteConversation = async () =>{
      await axios.delete('/conversation/remove', {data: selectedConversation});
      setConversation([...conversation].filter(c => !selectedConversation.includes(c._id)));
    }

    return(
        <>
            <header className={s.messagesHeader}>
                <div className={s.headerControls}>
                    <button className={s.buttonEdit} onClick={deletingModeToogle}>Edit</button>
                    <h1>Messages</h1>
                    <button onClick={toggleModal}>
                        <img src={compose} alt="icon"/>
                    </button>

                    <button className={s.btnLogOut} onClick={logOut}>
                        Log Out
                    </button>

                    {
                        deletingMode &&
                        <button className={s.btnDelete}
                                onClick={deleteConversation}
                        > Delete </button>
                    }

                </div>
                <div className={s.inputSearch}>
                    <input type="text" placeholder={'Search'} onChange={onFilter}/>
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
                                        </Link>
                                    </li>

                        })
                    }
                </ul>
                {
                    conversation.filter((val)=>{

                        if(filterValue === ""){ return val }
                        else if (val.members[1].firstName.toLowerCase().includes(filterValue.toLowerCase())){ return val}

                        }).map((item) => {

                            return <ListRoomsItem
                                    conversation={item}
                                    currentUser={currentUser}
                                    cbLongTouch={handlerInAnchor}
                                    socket={socket}
                                    key={item._id}
                                    selectedConversation={selectedConversation}
                                    setSelectedConversation={setSelectedConversation}
                                    deletingMode={deletingMode}
                                    />

                        })
                }

            </ul>
        </>
    )
}

export default Rooms;