import s from './avatar.module.sass';
import classNames from "classnames";


const Avatar = ({url, large, medium, small}) =>{

    const classes = classNames(
        large ? s.large : s.small,
        medium ? s.medium : s.small,
        small ? s.small : s.small
    );

    return(
        <div className={classes}>
            <img src={url} alt="avatar"/>
        </div>
    )
}

export default Avatar;