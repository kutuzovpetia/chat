import s from './app.module.sass';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Error404 from '../pages/404';
import Chat from '../pages/chat';
import Rooms from '../pages/list-rooms/list-rooms';
import User from '../pages/user';
import Auth from "../pages/auth";
import Login from '../pages/login';
import {useState} from "react";


function App() {
    const [isLogged, setIsLogged] = useState(true);

    return (
    <Router>
        <div className={s.app}>

            <Routes>
                {isLogged && <Route path="/rooms" element={<Rooms/>}/>}
                {isLogged && <Route path="/chat/:id" element={<Chat/>}/>}
                {isLogged && <Route path="/user/:id" element={<User/>}/>}

                <Route path="/" element={<Login/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    </Router>
    );
}

export default App;
