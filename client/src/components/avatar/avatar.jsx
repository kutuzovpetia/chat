import s from './avatar.module.sass';
import classNames from "classnames";
import {LongPressDetectEvents, useLongPress} from "use-long-press";
import {useState} from "react";

import {useRecoilState} from 'recoil';
import { usersOnline as uo } from "../../state/atoms";



const Avatar = ({id, url, large, medium, small, userName, newMessage, cbLongTouch, user}) =>{

    const [usersOnline,] = useRecoilState(uo);
    const online = usersOnline.some(u => u._id === user?._id)

    const classes = classNames(
        large ? s.large : s.small,
        medium ? s.medium : s.small,
        small ? s.small : s.small
    );

    const classesOnline = classNames(
        large && classNames(online ? s.onlineStatusLarge : s.offlineStatusLarge),
        medium && classNames(online ? s.onlineStatusMedium : s.offlineStatusMedium)
    );

    const onLongPress = (id) => cbLongTouch && cbLongTouch(id);

    const [enabled,] = useState(true);
    const bind = useLongPress(enabled ? ()=> onLongPress(id) : null, {
        threshold: 350,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    });

    return(
        <div className={s.avatarWrapper} {...bind}>

            <img  src={url} alt="avatar" className={classes}/>
            <div className={classesOnline}></div>

            {
                userName &&
                <div className={s.statusWrapper}>
                    {newMessage && <div className={s.status}></div>}
                    <div className={s.userName}>{userName}</div>
                </div>
            }
        </div>
    )
}

export default Avatar;