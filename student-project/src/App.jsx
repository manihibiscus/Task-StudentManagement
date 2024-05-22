
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Login } from './components/Login'

function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/about" element={<About />}/>
     <Route path="/contact" element={<Contact />}/>
     <Route path="/login" element={<Login />}/>
     </Routes>
     </BrowserRouter>
    
  )
}

export default App
