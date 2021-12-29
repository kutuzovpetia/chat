import s from './user.module.sass';
import Avatar from '../../components/avatar';
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";

const User = () =>{

    const params = useParams();
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        (async function(){
           await axios.get(`/auth/user/${id}`)
                .then(res=>{
                    setUser(res.data)
                })
        })()
    }, [id])

    return(
        <div className={s.userWrapper}>

            <header>
                <div className={s.userHeader}>

                    <Link to={`/chat/${params.id}`}>Cancel</Link>

                    <div className={s.userAvatar}>
                        <Avatar url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'} large/>
                        <button>Set New Photo</button>
                    </div>

                    <button>Done</button>
                </div>
            </header>

            <section>

                <ul className={s.list}>
                    <li>{user?.firstName}</li>
                    <li>{user?.secondName}</li>
                </ul>
                <div className={s.context}>Enter your name adn add an optional profile photo</div>

                <div className={s.details}>
                    { user?.details}
                </div>


                <div className={s.context}>
                    Any details such as age, occupation or city.
                    Example: 23 y.o. designer from San Francisco
                </div>

            </section>
        </div>
    )
}

export default User;