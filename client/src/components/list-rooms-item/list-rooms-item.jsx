import s from './style.module.sass';
import Avatar from '../avatar';

const ListRoomsItem = ({url, userName, time, text}) =>{

    return(
            <div className={s.itemWrapper}>

                <Avatar url={url} size={'medium'}/>

                <a href={'/chat'} className={s.itemContent}>
                    <div className={s.itemContentHeader}>
                        <h3>Hell Boy</h3>
                        <span>1:20 PM</span>
                    </div>
                    <p className={s.itemMessage}>
                        Send me some jams, I’ve been listening to way too much bad bunny
                    </p>
                </a>
            </div>
    )
}

export default ListRoomsItem;