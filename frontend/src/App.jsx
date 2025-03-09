import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Signup from '../src/pages/Signup';
import LandingPage from './pages/LandingPage';
import Upload from './pages/Upload';
import AdminPanel from './pages/AdminPanel';
import PdfComp from './pages/PdfComp';
import TeacherSign from './pages/TeacherSign';
import Profile from './pages/Profile';
import TeacherLogin from './pages/TeacherLogin';
import ULandingPage from './pages/ULandingPage';
import Uni from './pages/Uni';
import Cor from './pages/Cor';
import EditPdf from './pages/EditPdf';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/landing' element={<LandingPage />}/>
      <Route path='/ulanding' element={<ULandingPage />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/pdf' element={<PdfComp/>} />    
      <Route path='/logtcr' element={<TeacherSign/>} />  
      <Route path='/tcrlog' element={<TeacherLogin/>} />
      <Route path='/uni' element={<Uni/>} />
      <Route path='/cor' element={<Cor/>} />
      <Route path='/editPdf' element={<EditPdf/>} />
    </Routes>
  )
}

export default App
