import s from './style.module.sass';
import Avatar from '../avatar';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLongPress, LongPressDetectEvents} from "use-long-press";
import DataService from "../../dataService";


const ListRoomsItem = ({conversation, currentUser, cbLongTouch}) =>{

    const dataService = new DataService();
    const {members} = conversation;
    const id = members.find(u => u !== currentUser._id);
    const [user, setUser] = useState({});

    useEffect(()=>{
        (async function (){
            const user = await dataService.getUserById(id)
            setUser(user);
        })()
    },[])

    const onLongPress = (id) => cbLongTouch && cbLongTouch(id);
    const [enabled, setEnabled] = useState(true);
    const bind = useLongPress(enabled ? () => onLongPress(conversation._id) : null, {
        threshold: 350,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    });

    return(

            <li className={s.itemWrapper} {...bind}>

                    <Avatar url={user.imgUrl} medium/>
                    <div className={s.itemContent} >

                        <Link to={`/chat/${user._id}`}>
                            <div className={s.itemContentHeader}>
                                <h3>{`${user.firstName} ${user.secondName}`}</h3>
                                <time>1:20 PM</time>
                            </div>
                            <div className={s.itemMessage}>{'TEXT'}</div>
                        </Link>

                    </div>
            </li>

    )
}

export default ListRoomsItem;