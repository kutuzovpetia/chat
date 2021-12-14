import s from './style.module.sass';

const ListRoomsItem = ({img, userName, time, text}) =>{
    return(
        <>
            <div className={s.itemWrapper}>
                <div className={s.itemAvatar}>
                    <img src="https://avochka.ru/img/kartinka/1/enot_glass.jpg" alt="avatar"/>
                </div>
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