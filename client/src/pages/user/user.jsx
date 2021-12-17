import s from './user.module.sass';
import Avatar from '../../components/avatar';
import {Link} from 'react-router-dom'

const User = ({}) =>{

    return(
        <div className={s.userWrapper}>

            <header>
                <div className={s.userHeader}>

                    <Link to="/chat">Cancel</Link>

                    <div className={s.userAvatar}>
                        <Avatar url={'https://avochka.ru/img/kartinka/1/enot_glass.jpg'} large/>
                        <button>Set New Photo</button>
                    </div>

                    <button>Done</button>
                </div>
            </header>

            <section>
                <ul className={s.list}>
                    <li>Hell</li>
                    <li>Boy</li>
                </ul>
                <div className={s.context}>Enter your name adn add an optional profile photo</div>

                <div className={s.details}>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae corporis dicta
                        dolorem doloremque, doloribus earum esse eum excepturi explicabo fuga itaque iusto modi quod
                        repellat repudiandae, sapiente veniam voluptatibus!
                    </div>
                    <div>Ad laudantium optio provident repellat. A accusamus amet cumque cupiditate eius ex
                        exercitationem ipsa iusto laudantium molestiae, nemo nihil non, odio porro quas reiciendis rem
                        saepe suscipit. Cumque, facere vero!
                    </div>
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