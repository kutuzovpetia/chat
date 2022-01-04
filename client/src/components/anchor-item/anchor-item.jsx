import Avatar from "../avatar";
import {useEffect, useState} from "react";


const AnchorItem = ({cbLongTouch, anchor, currentUser, socket}) =>{


    const [user,] = useState(anchor.members.find(u => u._id !== currentUser._id));
    const [newMessage, setNewMessage] = useState(false);

    useEffect(()=>{
        socket.on('getMessage', newMessage=>{
            if(anchor._id === newMessage.message.conversationId){
                setNewMessage(true)
            }
        })
    })

    return(
        <div>
            <Avatar
                id={anchor._id}
                url={user.imgUrl}
                large
                userName={user.firstName}
                newMessage={newMessage}
                cbLongTouch={cbLongTouch}
                user={user}
                showOnline={true}
            />
        </div>
    )
}

export default AnchorItem;