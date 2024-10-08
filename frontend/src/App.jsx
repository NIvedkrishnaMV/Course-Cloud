import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import LandingPage from './pages/LandingPage';
import Upload from './pages/Upload';
import AdminPanel from './pages/AdminPanel';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/landing' element={<LandingPage />}/>
      <Route path="/upload" element={<Upload />} />
      <Route path='/admin' element={<AdminPanel/>} />
    </Routes>
  )
}

export default App
