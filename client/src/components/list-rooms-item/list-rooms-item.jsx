import s from './style.module.sass';
import Avatar from '../avatar';

const ListRoomsItem = ({url, userName, time, text}) =>{

    return(
            <li className={s.itemWrapper}>

                <Avatar url={url} size={'medium'}/>

                <a href={'/chat'} className={s.itemContent}>
                    <div className={s.itemContentHeader}>
                        <h3>Hell Boy</h3>
                        <time>1:20 PM</time>
                    </div>
                    <div className={s.itemMessage}>
                        Send me some jams, I’ve been listening to way too much bad bunny
                    </div>
                </a>
            </li>
    )
}

export default ListRoomsItem;