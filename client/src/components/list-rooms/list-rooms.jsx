import s from './list-rooms.module.sass';
import compose from '../../img/btn-compose.svg';
import ListRoomsItem from "../list-rooms-item";

const Rooms = () =>{

    return(
        <>
            <div className={s.messagesWrapper}>
                <div className={s.messagesHeader}>
                    <div className={s.headerControls}>
                        <button className={s.buttonEdit}>Edit</button>
                        <h1>Messages</h1>
                        <button>
                            <img src={compose} alt="icon"/>
                        </button>
                    </div>
                    <div className={s.inputSearch}>
                        <input type="text" placeholder={'Search'}/>
                    </div>
                </div>

                <div className={s.chatList}>
                    {
                       Array(10).fill(null).map((item, i) => {
                            return <ListRoomsItem key={i} url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}/>
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Rooms;