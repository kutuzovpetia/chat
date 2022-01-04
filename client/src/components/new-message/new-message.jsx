import s from './newMessage.module.sass';
import add from '../../img/add.svg';
import Input from '../input/input';
import ContactItem from "../contact-item";
import {useEffect, useState} from "react";
import DataService from "../../dataService";
import {useRecoilState} from 'recoil';
import {user, conversation as c} from '../../state/atoms';


const NewMessage = ({onClose, socket}) =>{

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectConversationId, setSelectConversationId] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [currentUser,] = useRecoilState(user);
    const [conversation,] = useRecoilState(c);


    useEffect(()=>{
        const dataService = new DataService();
        (async function(){
           const users = await dataService.getAllUsers();
           setContacts(users);
        })()
    },[])

    const onFilter = (e) => setFilterValue(e.target.value);

    const selectContact = (contact) =>{
        setSelectedContact(contact)

        conversation.forEach(item=>{
            if(item.members[1]._id === contact._id  && item.members[0]._id === currentUser._id){
                setSelectConversationId(item._id)
            }
        })
    }

    return(
        <div className={s.newMessage}>
            <header>
                <h1>New Message</h1>
                <button onClick={onClose}>Cancel</button>
            </header>

            <div className={s.inputTo}>
                <input type="text"
                       value={selectedContact ? `${selectedContact.firstName} ${selectedContact.secondName}` : filterValue}
                       onChange={onFilter}
                       onFocus={(e)=>{
                           setSelectedContact(null);
                           e.target.value = '';
                       }}
                />
                <button>
                    <img src={add} alt="icon"/>
                </button>
            </div>

            <div className={s.content}>
                <ul>
                    {
                        contacts.filter((val)=>{
                            if(filterValue === ""){ return val }
                            else if (val.firstName.toLowerCase().includes(filterValue.toLowerCase())){ return val}
                        }).map((c) => {
                            if(currentUser._id !== c._id){
                                return <ContactItem key={c._id}
                                                    contact={c}
                                                    setSelectedContact={setSelectedContact}
                                                    selectContact={selectContact}/>
                            }
                        })
                    }
                </ul>
            </div>

            <footer>
                <Input conversationId={selectConversationId}
                       selectedContact={selectedContact}
                       on={!!selectedContact}
                       socket={socket}
                       sender={currentUser._id}
                />
            </footer>

        </div>
    )
}

export default NewMessage;