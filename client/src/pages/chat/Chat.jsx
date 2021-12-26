import s from './chat-style.module.sass';
import arrow from '../../img/arrow-blue.svg';
import camera from '../../img/camera.svg';
import Input from "../../components/input";
import Avatar from '../../components/avatar';
import {Link, useParams} from "react-router-dom";
import ListChat from "../../components/list-chat";
import {useEffect} from "react";

const Chat = () =>{

    const testMessages = [
        {id: 1, text: 'Привет', own: false},
        {id: 2, text: 'Говори по Українськи!', own: true}
    ]

    let { id } = useParams(); // Conversation ID

    useEffect(()=>{
        // GET Conversation
    })

    return(
        <div className={s.chatWrapper}>
            <header className={s.header}>
                <nav className={s.headerControls}>
                    <Link to="/">
                        <img src={arrow} alt="arrow"/>
                    </Link>
                    <Link to={`/user/${id}`}>
                        <Avatar url={'https://www.parisbeacon.com/wp-content/uploads/2021/11/Rocket-Raccoon-James-Gunn-Guardianes-de-la-Galaxia-Marvel-Studios.jpg'} medium/>
                    </Link>
                    <button>
                        <img src={camera} alt="arrow"/>
                    </button>
                </nav>

                <Link to={`/user/${id}`} className={s.userName}>
                    Hell Boy
                </Link>
            </header>

            <ListChat messages={testMessages}/>

            <footer>
                <div className={s.status}>Tobias has notifications silenced</div>
                <Input/>
            </footer>
        </div>
    )
}

export default Chat;