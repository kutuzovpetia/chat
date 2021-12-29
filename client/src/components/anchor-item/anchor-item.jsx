import Avatar from "../avatar";
import {useEffect, useState} from "react";
import DataService from "../../dataService";


const AnchorItem = ({cbLongTouch, anchor, currentUser}) =>{

    const id = anchor.members.find(u => u !== currentUser._id )
    const [user, setUser] = useState({});

    useEffect(()=>{
        const dataService = new DataService();
        (async function (){
            const user = await dataService.getUserById(id);
            setUser(user)
            console.log(user)
        })()

    },[id])

    return(
        <div>
            <Avatar
                id={anchor._id}
                url={user.imgUrl}
                large
                userName={user.firstName}
                newMessage
                cbLongTouch={cbLongTouch}
                user={user}
            />
        </div>
    )
}

export default AnchorItem;