import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';

const Chat = () =>{

    return(
        <>
            <div className={s.header}>
                <div className={s.headerControls}>
                    <button>
                        <img src={arrow} alt="arrow"/>
                    </button>

                    <div className={s.avatar}>
                        <img src="https://avochka.ru/img/kartinka/1/enot_glass.jpg" alt="avatar"/>
                    </div>

                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>
                </div>

                <h5 className={s.userName}>Hell Boy</h5>
            </div>

            <div>
                <h1>Content</h1>
            </div>
        </>
    )
}

export default Chat;