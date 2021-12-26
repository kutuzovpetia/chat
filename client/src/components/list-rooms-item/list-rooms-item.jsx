import s from './style.module.sass';
import Avatar from '../avatar';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useLongPress, LongPressDetectEvents} from "use-long-press";


const ListRoomsItem = ({id, url, userName, time, text, cbLongTouch}) =>{

    const onLongPress = (id) => cbLongTouch && cbLongTouch(id);
    const [enabled, setEnabled] = useState(true);
    const bind = useLongPress(enabled ? ()=>onLongPress(id) : null, {
        threshold: 350,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    });

    return(

            <li className={s.itemWrapper} {...bind}>

                    <Avatar url={url} medium/>
                    <div className={s.itemContent} >

                        <Link to={`/chat/${id}`}>
                            <div className={s.itemContentHeader}>
                                <h3>{userName}</h3>
                                <time>1:20 PM</time>
                            </div>
                            <div className={s.itemMessage}>{text}</div>
                        </Link>

                    </div>
            </li>

    )
}

export default ListRoomsItem;