import s from './anchor.module.sass';
import Avatar from "../avatar";
import {useEffect, useState} from "react";
import DataService from "../../dataService";


const AnchorItem = ({cbLongTouch, anchor, currentUser}) =>{

    const dataService = new DataService();
    const id = anchor.members.find(u => u !== currentUser._id )
    const [user, setUser] = useState({});

    useEffect(()=>{

        (async function (){
            const user = await dataService.getUserById(id);
            setUser(user)
        })()
    },[])



    return(
        <div>
            <Avatar
                id={anchor._id}
                url={user.imgUrl}
                large
                userName={user.firstName}
                newMessage
                cbLongTouch={cbLongTouch}
            />
        </div>
    )
}

export default AnchorItem;