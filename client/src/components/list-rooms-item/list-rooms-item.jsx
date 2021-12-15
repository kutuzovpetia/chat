import s from './style.module.sass';
import {useNavigate} from "react-router-dom";
import Avatar from '../avatar';

const ListRoomsItem = ({url, userName, time, text}) =>{

    const navigate = useNavigate();
    const to = () => navigate('/chat');

    return(
        <>
            <div className={s.itemWrapper} onClick={to}>

                <Avatar url={url}/>

                <div className={s.itemContent}>
                    <div className={s.itemContentHeader}>
                        <h3>Hell Boy</h3>
                        <span>1:20 PM</span>
                    </div>
                    <p className={s.itemMessage}>
                        Send me some jams, I’ve been listening to way too much bad bunny
                    </p>
                </div>
            </div>
        </>
    )
}

export default ListRoomsItem;