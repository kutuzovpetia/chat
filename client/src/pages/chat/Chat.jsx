import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../../components/input";
import {useNavigate} from "react-router-dom";
import Message from "../../components/message";
import Avatar from '../../components/avatar';

const Chat = () =>{

    const navigate = useNavigate();
    const to = (path) => navigate(path);

    return(
        <div className={s.chatWrapper}>
            <div className={s.header}>
                <div className={s.headerControls}>

                    <button onClick={()=>to('/')}>
                        <img src={arrow} alt="arrow"/>
                    </button>

                    <Avatar url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'}
                            handlerClick={to}
                            to={'/user/id'}/>

                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>

                </div>

                <h5 className={s.userName} onClick={()=>to('/user/id')}>Hell Boy</h5>


            </div>

            <div className={s.chatContent}>

                <Message own={false} text={'Привет!'}/>
                <Message own={true} text={'Говори по Українськи!'}/>

            </div>


            <span className={s.status}>Tobias has notifications silenced</span>
            {/*Input Message*/}
            <Input/>

        </div>
    )
}

export default Chat;