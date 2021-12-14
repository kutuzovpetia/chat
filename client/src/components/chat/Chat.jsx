import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../input";
import {useNavigate} from "react-router-dom";

const Chat = () =>{

    const navigate = useNavigate();
    const to = () => navigate('/');

    return(
        <div className={s.chatWrapper}>
            <div className={s.header}>
                <div className={s.headerControls}>
                    <button onClick={to}>
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

            <div className={s.chatContent}>

                <div className={s.message}>
                    <p>
                        If you guys are free; we’re going to mt baldy Sunday and will be doing some training all (~8am to 1pm)
                    </p>
                </div>

                <div className={s.message}>
                    <img src="" alt="avatar"/>

                    <p>
                        If you guys are free; we’re going to mt baldy Sunday and will be doing some training all (~8am to 1pm)
                    </p>
                </div>

            </div>

            {/*Input Message*/}
            <Input/>

        </div>
    )
}

export default Chat;