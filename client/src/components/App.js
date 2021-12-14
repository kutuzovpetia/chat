import s from './app.module.sass';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Error404 from './404';
import Chat from './chat';
import Rooms from './list-rooms/list-rooms';

function App() {
  return (
    <Router>
        <div className={s.app}>

            <Routes>
                <Route path="/" element={<Rooms/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
