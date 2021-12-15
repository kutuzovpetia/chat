import s from './avatar.module.sass';

const Avatar = ({url}) =>{
    return(
        <>
            <div className={s.avatar}>
                <img src={url} alt="avatar"/>
            </div>
        </>
    )
}

export default Avatar;