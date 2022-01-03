import s from './newMessage.module.sass';
import add from '../../img/add.svg';
import Input from '../input/input';
import ContactItem from "../contact-item";
import {useEffect, useState} from "react";
import DataService from "../../dataService";


const NewMessage = ({onClose}) =>{



    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [filterValue, setFilterValue] = useState('');


    useEffect(()=>{
        const dataService = new DataService();
        (async function(){
           const users = await dataService.getAllUsers();
           setContacts(users);
        })()
    },[])

    const onFilter = (e) => setFilterValue(e.target.value);

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
                            return <ContactItem key={c._id} contact={c} setSelectedContact={setSelectedContact}/>
                        })
                    }
                </ul>
            </div>

            <footer>
                <Input selectedContact={selectedContact}/>
            </footer>

        </div>
    )
}

export default NewMessage;