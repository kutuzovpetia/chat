import s from './chat-style.module.sass';

const Chat = () =>{
    return(
        <>
            <div className={s.header}>
                <button>
                    <img src="" alt="arrow"/>
                </button>

                <div className={s.avatar}>
                    <img src="https://avochka.ru/img/kartinka/1/enot_glass.jpg" alt="avatar"/>
                </div>

                <a href="/">камера</a>
            </div>
        </>
    )
}

export default Chat;