import s from './contact-item.module.sass';

const ContactItem = (props) => {
    const {imgUrl, firstName, secondName, phoneOrEmail} = props.contact;

    return(
        <li onClick={()=>props.selectContact(props.contact)}>
            <div className={s.contactItem}>
                <img className={s.contactItemImg} src={imgUrl} alt="avatar"/>

                <div className={s.userData}>
                    <h1>{`${firstName} ${secondName}`}</h1>
                    <div>{phoneOrEmail}</div>
                </div>
            </div>
        </li>
    )
}

export default ContactItem;