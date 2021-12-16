import s from './avatar.module.sass';


const Avatar = ({url, size}) =>{

    let styleAvatar = null;
    switch (size){
        case 'small': styleAvatar = s.small;
            break;
        case 'medium': styleAvatar = s.medium;
            break;
        case 'large': styleAvatar = s.large;
            break;
        default: styleAvatar = s.small;
    }

    return(
        <div className={styleAvatar}>
            <img src={url} alt="avatar"/>
        </div>
    )
}

export default Avatar;