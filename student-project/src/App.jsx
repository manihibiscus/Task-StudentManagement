
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
  import './App.css'
  import { Header } from './components/Header'
  import { Home } from './components/Home'
  import { About } from './components/About'
  import { Login } from './components/Login'
  import { Provider } from 'react-redux';
  import store from './Redux/Store'
  import { Register } from './components/Register'
  // import { AdminPage } from './components/AdminPage'
  import { Student } from './components/Student'
  // import { AdminPage } from './components/AdminPage'
  // import { AttendStudent } from './components/AttendStudent'
  // import { Attendence } from './components/Attendence'
  import { Attendence } from './components/Attendence'
import ProctectRoute from '../ProtectedRouter/Protectroute'
import { LeaveRequest } from './components/LeaveRequest'
  // import ProtectedRoute from '../ProtectedRouter/Protectroute'
  function App() {

    return (
      <BrowserRouter>
      <Provider store={store}>
      <Header />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      {/* <Route path='/adminpage' element={<AdminPage />} /> */} 

      <Route element={<ProctectRoute />}>
      <Route path='/studentdetails' element={<Student />} />
      <Route path='/attendence' element={<Attendence />} />
      <Route path='/leaverequest' element={<LeaveRequest />} />
      </Route>
      </Routes>
      </Provider>
      </BrowserRouter>
      
    )
  }

  export default App
