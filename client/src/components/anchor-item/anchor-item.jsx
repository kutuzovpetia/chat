import Avatar from "../avatar";
import {useEffect, useState} from "react";
import DataService from "../../dataService";


const AnchorItem = ({cbLongTouch, anchor, currentUser}) =>{


    const [user, setUser] = useState(anchor.members.find(u => u._id !== currentUser._id));

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