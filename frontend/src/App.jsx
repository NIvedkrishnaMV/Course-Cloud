import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
    </Routes>
  )
}

export default App