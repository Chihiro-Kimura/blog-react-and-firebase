import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Welcome from './components/Welcome';
import LogoutSuccess from './components/LogoutSuccess'; // 追加

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={isAuth ? <Home isAuth={isAuth} /> : <Welcome />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/logout-success" element={<LogoutSuccess />} /> {/* 追加 */}
      </Routes>
    </Router>
  );
}

export default App;
