import s from './avatar.module.sass';
import classNames from "classnames";
import {LongPressDetectEvents, useLongPress} from "use-long-press";
import {useState} from "react";

const Avatar = ({id, url, large, medium, small, userName, newMessage, cbLongTouch}) =>{

    const classes = classNames(
        large ? s.large : s.small,
        medium ? s.medium : s.small,
        small ? s.small : s.small
    );

    const onLongPress = (id) => cbLongTouch && cbLongTouch(id);

    const [enabled, setEnabled] = useState(true);
    const bind = useLongPress(enabled ? ()=> onLongPress(id) : null, {
        threshold: 350,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    });

    return(
        <div {...bind}>

            <img  src={url} alt="avatar" className={classes}/>

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