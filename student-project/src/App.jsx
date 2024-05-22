
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Login } from './components/Login'
import { Provider } from 'react-redux';
import store from './Redux/Store'
import { Register } from './components/Register'
// import { AdminPage } from './components/AdminPage'
import { Student } from './components/Student'
function App() {

  return (
    <BrowserRouter>
    <Provider store={store}>
    <Header />
    <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/home" element={<Home />}/>
     <Route path="/about" element={<About />}/>
     <Route path="/contact" element={<Contact />}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/register" element={<Register />}/>
     <Route path='/adminpage' element={<Student />} />
     </Routes>
     </Provider>
     </BrowserRouter>
    
  )
}

export default App
