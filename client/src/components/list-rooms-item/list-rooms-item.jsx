import s from './style.module.sass';
import Avatar from '../avatar';
import {useEffect, useState} from "react";
import {useLongPress, LongPressDetectEvents} from "use-long-press";
import axios from "axios";
import ta from 'time-ago';
import {Link} from "react-router-dom";


const ListRoomsItem = ({conversation, currentUser, cbLongTouch, selectedConversation, setSelectedConversation, deletingMode}) =>{

    const {members} = conversation;
    const [user,] = useState(members.find(u => u._id !== currentUser._id));
    const [lastMessage, setLastMessage] = useState('');
    const [timeLastMessage, setTimeLastMessage] = useState('');


    useEffect(()=>{
        (async function(){
            const m = await axios.get(`/message/${conversation._id}`);
            setLastMessage(m.data[m.data.length-1]?.text);
            setTimeLastMessage(ta.ago(m.data[m.data.length-1]?.createdAt))
        })()

    },[conversation._id])


    const onLongPress = (id) => cbLongTouch && cbLongTouch(id);
    const [enabled,] = useState(true);
    const bind = useLongPress(enabled ? () => onLongPress(conversation._id) : null, {
        threshold: 350,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    });


    // console.log(selectedConversation)

    const onChecked = (e) =>{
        e.target.checked ?
        setSelectedConversation((prev)=>[...prev, conversation._id]) :
        setSelectedConversation( selectedConversation.filter(id => id !== conversation._id))
    }

    return(

            <li className={s.itemWrapper} >

                {
                    deletingMode &&
                    <input type="checkbox"
                           className={s.customControl}
                           onChange={onChecked}
                    />
                }

                <Avatar url={user.imgUrl} medium user={user}/>

                <Link to={`/chat/${conversation._id}`}>
                    <div className={s.itemContent} {...bind}>
                        <div className={s.itemContentHeader}>
                            <h3>{`${user.firstName} ${user.secondName}`}</h3>
                            <time>{timeLastMessage}</time>
                        </div>
                        <div className={s.itemMessage}>{lastMessage}</div>
                    </div>
                </Link>

            </li>

    )
}

export default ListRoomsItem;