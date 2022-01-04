import Avatar from "../avatar";
import {useState} from "react";


const AnchorItem = ({cbLongTouch, anchor, currentUser}) =>{


    const [user,] = useState(anchor.members.find(u => u._id !== currentUser._id));

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
                showOnline={true}
            />
        </div>
    )
}

export default AnchorItem;