import s from './style.module.sass';
import Avatar from '../avatar';
import {useEffect, useState} from "react";
import {useLongPress, LongPressDetectEvents} from "use-long-press";
import axios from "axios";
import ta from 'time-ago';


const ListRoomsItem = ({conversation, currentUser, cbLongTouch, socket}) =>{

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

    return(

            <li className={s.itemWrapper} >

                    <Avatar url={user.imgUrl} medium user={user}/>

                    <div className={s.itemContent} {...bind}>
                        <div className={s.itemContentHeader}>
                            <h3>{`${user.firstName} ${user.secondName}`}</h3>
                            <time>{timeLastMessage}</time>
                        </div>
                        <div className={s.itemMessage}>{lastMessage}</div>
                    </div>
            </li>

    )
}

export default ListRoomsItem;