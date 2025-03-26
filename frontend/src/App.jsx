import { Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Upload from './pages/Upload';
import AdminPanel from './pages/AdminPanel';
import PdfComp from './pages/PdfComp';
import Profile from './pages/Profile';
import ULandingPage from './pages/ULandingPage';
import Uni from './pages/Uni';
import Cor from './pages/Cor';
import EditPdf from './pages/EditPdf';
import AddUniversity from './pages/AddUniversity';
import Edit from './pages/Edit';
import UEdit from './pages/UEdit';
import UProfile from './pages/UProfile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/landing' element={<LandingPage />}/>
      <Route path='/ulanding' element={<ULandingPage />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/uprofile" element={<UProfile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path='/admin' element={<AdminPanel/>} />
      <Route path='/pdf' element={<PdfComp/>} />    
      <Route path='/uni' element={<Uni/>} />
      <Route path='/cor' element={<Cor/>} />
      <Route path='/editPdf' element={<EditPdf/>} />
      <Route path='/tedit' element={<Edit/>} />
      <Route path='/edit' element={<UEdit/>} />
    </Routes>
  )
}

export default App
