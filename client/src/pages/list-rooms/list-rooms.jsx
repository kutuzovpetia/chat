import s from './list-rooms.module.sass';
import compose from '../../img/btn-compose.svg';
import ListRoomsItem from "../../components/list-rooms-item";
import Avatar from '../../components/avatar';
import {useState} from "react";
import ListChat from "../../components/list-chat";
import {Link} from "react-router-dom";

const Rooms = () =>{

    const testMessages = [
        {id: '150', text: 'Привет', own: false},
        {id: 'gsdf', text: 'Говори по Українськи!', own: true},
        {id: '2345', text: 'Привет', own: false},
        {id: '374567', text: 'Говори по Українськи!', own: true}
    ];

    const c = [
        {id: '001', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'Hell Boy'},
        {id: '002', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 2'},
        {id: '003', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 3'},
        {id: '004', text: 'Send me some jams, I’ve been listening to way too much bad bunny', userName: 'User 4'}
    ];


    const [menuOpen, setMenuOpen] = useState(false);
    const [anchors, setAnchors] = useState([]);
    const [conversation, setConversation] = useState(c);

    const handlerInAnchor = (id) => {
        setAnchors([...anchors, conversation.find(c => c.id === id)])
        setConversation(conversation.filter(c => c.id !== id))
    }

    const handlerOutAnchor = (id) => {
        setConversation([...conversation, anchors.find(c => c.id === id)])
        setAnchors(anchors.filter(c => c.id !== id))
    }

    const handlerMenu = () => setMenuOpen(!menuOpen);

    return(
        <>
            <header className={s.messagesHeader}>
                <div className={s.headerControls}>
                    <button className={s.buttonEdit}>Edit</button>
                    <h1>Messages</h1>
                    <button>
                        <img src={compose} alt="icon"/>
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

                                        { menuOpen &&
                                            <div className={s.menu} onClick={handlerMenu}>
                                                <ListChat messages={testMessages}/>
                                            </div>
                                        }

                                        <Link to={`/chat/${item.id}`}>
                                            <Avatar
                                                id={item.id}
                                                url={'https://upload.wikimedia.org/wikipedia/commons/0/0d/SBandera.jpg'}
                                                large
                                                userName={'Бандера'}
                                                newMessage
                                                cbLongTouch={handlerOutAnchor}
                                            />
                                        </Link>
                                    </li>
                        })
                    }

                </ul>
                {
                    conversation.map((item, i) => {

                        return <ListRoomsItem
                                    key={item.id}
                                    id={item.id}
                                    url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}
                                    text={item.text}
                                    userName={item.userName}
                                    cbLongTouch={handlerInAnchor}
                                />
                    })
                }
            </ul>
        </>
    )
}

export default Rooms;