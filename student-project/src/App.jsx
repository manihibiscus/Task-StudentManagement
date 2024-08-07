
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
import { LeaveStatus } from './components/LeaveStatus'
import { LeaveConfrim } from './components/LeaveConfrim'
import { StudentHome } from './components/StudentHome'
import { StudentRegistration } from './components/StudentRegistration'
import { Mark } from './components/Mark/Mark'
import { Entry } from './components/Mark/Entry'
// import { useState } from 'react'
// import Alert from './Alert'
  // import ProtectedRoute from '../ProtectedRouter/Protectroute'
  function App() {
    // const [alertVisible, setAlertVisible] = useState(true);

    // const showAlert = () => {
    //   setAlertVisible(true);
    // };
  
    // const closeAlert = () => {
    //   setAlertVisible(false);
    // };
    
    return (
      <Provider store={store}>

      <BrowserRouter>
      {/* {alertVisible && <Alert message="This is an alert message." onClose={closeAlert} />} */}
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
      <Route path='/leavestatus' element={<LeaveStatus />}/>
      <Route path='/leaveconfrim' element={<LeaveConfrim />} />
      <Route path='/studenthome' element={<StudentHome />} />
      <Route path='/studentregistration' element={<StudentRegistration />} />
      <Route path='/mark' element={<Mark />} />
      <Route path='/entry' element={<Entry />} />
      </Route>
      </Routes>
      </BrowserRouter>
      </Provider>

      
    )
  }

  export default App
