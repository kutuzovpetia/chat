import s from './avatar.module.sass';


const Avatar = ({url, handlerClick, to, style}) =>{

    return(
        <>
            <div className={s.avatar}
                 onClick={()=>handlerClick?.(to)}
                 style={style}
            >
                <img src={url} alt="avatar"/>
            </div>
        </>
    )
}

export default Avatar;