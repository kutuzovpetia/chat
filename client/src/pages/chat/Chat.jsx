import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../../components/input";
import Message from "../../components/message";
import Avatar from '../../components/avatar';

const Chat = () =>{

    return(
        <div className={s.chatWrapper}>
            <header className={s.header}>
                <nav className={s.headerControls}>
                    <a href="/">
                        <img src={arrow} alt="arrow"/>
                    </a>
                    <a href="/user/id">
                        <Avatar url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'} size={'medium'}/>
                    </a>
                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>
                </nav>

                <a href={'/user/id'} className={s.userName}>
                    Hell Boy
                </a>
            </header>

            <section>
                <ul className={s.chatContent}>
                    <Message own={false} text={'Привет!'}/>
                    <Message own={true} text={'Говори по Українськи!'}/>
                </ul>
            </section>

            <footer>
                <div className={s.status}>Tobias has notifications silenced</div>
                <Input/>
            </footer>
        </div>
    )
}

export default Chat;