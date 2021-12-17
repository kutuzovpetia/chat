import s from './app.module.sass';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Error404 from '../pages/404';
import Chat from '../pages/chat';
import Rooms from '../pages/list-rooms/list-rooms';
import User from '../pages/user';


function App() {
  return (
    <Router>
        <div className={s.app}>

            <Routes>
                <Route path="/" element={<Rooms/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/user/:id" element={<User/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
