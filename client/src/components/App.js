import s from './app.module.sass';
import { Routes, Route} from 'react-router-dom';
import Chat from '../pages/chat';
import Rooms from '../pages/list-rooms/list-rooms';
import User from '../pages/user';
import Registration from "../pages/registration";
import Login from '../pages/login';
import React, {useEffect} from "react";
import {useRecoilState} from 'recoil';
import {user, isLogged as logged, usersOnline as online, isModalOpen as m} from '../state/atoms';
import axios from "axios";
import {io} from "socket.io-client";
import Modal from "./modal";
import DataService from "../dataService";
import NewMessage from "./new-message";



const socket = io();
const dataService = new DataService();

function App() {

    const [, setUsersOnline] = useRecoilState(online);
    const [isLogged, setIsLogged] = useRecoilState(logged);
    const [, setCurrentUser] = useRecoilState(user);
    const [isModalOpen, setIsModalOpen] = useRecoilState(m);
    const toogleModal = () => setIsModalOpen(!isModalOpen);


    useEffect(()=>{


        (async function (){

            try {
                const response = await axios.get(`/auth/auth`,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
                )
                setCurrentUser(response.data.user);
                setIsLogged(true);
                localStorage.setItem('token', response.data.token);
                socket.emit('logIn', response.data.user);
                socket.emit('getUsers');
                socket.on('getUsers', users => {
                    setUsersOnline(users)
                })
            } catch (e) {
                localStorage.removeItem('token')
            }
        })();
    },[setIsLogged, setCurrentUser, setUsersOnline])


    return (

        <div className={s.app}>

            {
                isModalOpen && <Modal content={<NewMessage onClose={toogleModal}/>}/>
            }


            <Routes>

                <Route path="/" element={isLogged ? <Rooms socket={socket} toggleModal={toogleModal} dataService={dataService}/> : <Login/>}/>

                {isLogged && <Route path="/chat/:id" element={<Chat socket={socket}/>}/>}
                {isLogged && <Route path="/user/:id/:prevPage" element={<User socket={socket}/>}/>}
                {!isLogged && <Route path="/registration" element={<Registration/>}/>}

                <Route path="*" element={ isLogged ? <Rooms/> : <Login/>}/>

            </Routes>

        </div>
    );
}

export default App;
