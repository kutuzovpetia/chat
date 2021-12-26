import s from './app.module.sass';
import { Routes, Route} from 'react-router-dom';
import Chat from '../pages/chat';
import Rooms from '../pages/list-rooms/list-rooms';
import User from '../pages/user';
import Registration from "../pages/registration";
import Login from '../pages/login';
import {useEffect, useState} from "react";
import {useRecoilState} from 'recoil';
import {user, isLogged as logged} from '../state/atoms';
import axios from "axios";
import {io} from "socket.io-client";

const socket = io();

function App() {
    const [isLogged, setIsLogged] = useRecoilState(logged);
    const [currentUser, setCurrentUser] = useRecoilState(user);


    useEffect(()=>{

        (async function (){
            try {
                const response = await axios.get(`/auth/auth`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                )
                setCurrentUser(response.data.user);
                setIsLogged(true);
                localStorage.setItem('token', response.data.token)
                console.log(response.data.user)


            } catch (e) {
                localStorage.removeItem('token')
            }
        })();
    },[setIsLogged, setCurrentUser])


    return (

        <div className={s.app}>

            <Routes>

                <Route path="/" element={isLogged ? <Rooms socket={socket}/> : <Login/>}/>

                {isLogged && <Route path="/chat/:id" element={<Chat socket={socket}/>}/>}
                {isLogged && <Route path="/user/:id" element={<User socket={socket}/>}/>}
                {!isLogged && <Route path="/registration" element={<Registration/>}/>}

                <Route path="*" element={ isLogged ? <Rooms/> : <Login/>}/>

            </Routes>
        </div>

    );
}

export default App;
