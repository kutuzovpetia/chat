import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../input";
import {useNavigate} from "react-router-dom";
import Message from "../message";
import Avatar from '../avatar';

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

                    <Avatar url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}/>

                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>

                </div>

                <h5 className={s.userName}>Hell Boy</h5>
            </div>

            <div className={s.chatContent}>

                <Message own={false} text={'Привет!'}/>
                <Message own={true} text={'Говори по Українськи!'}/>

            </div>

            {/*Input Message*/}
            <Input/>

        </div>
    )
}

export default Chat;