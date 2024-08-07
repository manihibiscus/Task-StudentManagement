import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSchoolCircleCheck, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {clickMenu } from "../Redux/Slice/menuSlice";
import { useEffect, useState } from "react";
import { logout } from "../Redux/Slice/loginSlice";
export const Header = () => {
    const data=useSelector((state)=>state.menu);
    const loginData = useSelector(state=>state.login)
    const dispatch= useDispatch();
    const logged = sessionStorage.getItem('adminLogged');
    // var boolValue = logged === null ? null : logged;
    const boolValue = JSON.parse(logged);

    const [value, setValue] = useState(false);
    const [userValue, setUserValue] = useState(false);
    const loggedUserString = sessionStorage.getItem('studentLogged');
    const loggedUser = JSON.parse(loggedUserString);
    // var loggedUser = loggedUserString === null ? null : loggedUser;

    useEffect(()=>{
        if(boolValue == "true"){
        setValue(true)
        }
        else if(boolValue == null){
            setValue(false)
        }
        if(loggedUser == "true"){
          setUserValue(true)
        }
        else if(loggedUser == null){
          setUserValue(false)
        }
        // alert(loggedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loginData.adminNavigation, loginData.navigation, loginData.studentNavigation, dispatch])
  return (
    <>
    <nav className="p-3 flex bg-white justify-between item-center border-b-2 border-blue-100 shadow-bottom">
        <a href="" id="brand" className="flex gap-4 item-center">
            {/* <FontAwesomeIcon onClick={(e)=>dispatch(adminMenu(e))} className={`w-[20px] h-[20px] ${boolValue == "true" ? 'sm:flex' : 'hidden'}`}  icon={faBars} /> */}
            <span><FontAwesomeIcon className="w-[25px] h-[25px] text-pink-500" icon={faSchoolCircleCheck} /></span>
            <span className="text-xl font-semibold">Student Management</span>
        </a>
            {!value && !userValue &&(
                <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
                    <a className="font-medium hover:bg-pink-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link 
                    // className={`${
                    //   location.pathname === '/home' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    // } px-3 py-2 rounded-md text-sm font-medium`} 
                    
                    to="/home">Home</Link></a>
                    <a className="font-medium hover:bg-pink-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link 
                    // className={`${
                    //   location.pathname === '/home' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    // } px-3 py-2 rounded-md text-sm font-medium`}
                    to="/about">About Us</Link></a>
                    <a className="font-medium hover:bg-pink-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link to="/login">Login</Link></a>
                </div>
            )}
            {value && !userValue && (
                <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
                    {/* <a className="font-medium hover:text-blue-500"><Link to="/adminpage">Home</Link></a> */}
                    <a className="font-medium hover:text-blue-500"><Link to="/studentdetails">Student Details</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/studentregistration">Student Registration</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/attendence">Attendence</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/leaveconfrim">Leave Confrim </Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/mark">Mark Entry</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link onClick={()=>dispatch(logout())} to="/home">Logout</Link></a>
                </div>
            )}
            {userValue && !value&& (
                <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
                    {/* <a className="font-medium hover:text-blue-500"><Link to="/adminpage">Home</Link></a> */}
                    <a className="font-medium hover:text-blue-500"><Link to="/studenthome">Home</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/leaverequest">Leave Request</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="/leavestatus">Leave Status</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link onClick={()=>dispatch(logout())} to="/home">Logout</Link></a>
                </div>
            )}
        <FontAwesomeIcon onClick={()=>dispatch(clickMenu())} className="w-[25px] h-[25px] md:hidden sm:flex"  icon={faBars} />
    </nav>
    {!value && (
    <div className={`absolute right-1 bg-white w-[200px] h-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <Link to="/home" onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2" >Home</a></Link>
        <Link to="/about" onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >About Us</a></Link>
        <Link to="/login" onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2" >Login</a></Link>
    </div>)}
    {value && (
    <div className={`absolute right-1 bg-white w-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <Link to="/studentdetails"  onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2" >Student Details</a></Link>
        <Link to="/studentregistration"  onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Student Registration</a></Link>
        <Link to="/attendence"  onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Attendence</a></Link>
        <Link to="/leaveconfrim"  onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Leave Confrim</a></Link>
        <Link to="/mark"  onClick={()=>dispatch(clickMenu())} ><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Mark Entry</a></Link>
        <Link onClick={()=>dispatch(logout())} to="/home"><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2">Logout</a></Link>
    </div>)}
    {userValue && !value && (
    <div className={`absolute right-1 bg-white w-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <Link to="/studenthome" onClick={()=>dispatch(clickMenu())}><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2" >Home</a></Link>
        <Link to="/leaverequest" onClick={()=>dispatch(clickMenu())}><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Leave Request</a> </Link>
        <Link to="/leavestatus" onClick={()=>dispatch(clickMenu())}><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2"  >Leave Status</a></Link>
        <Link onClick={()=>dispatch(logout())} to="/home"><a className="font-medium hover:text-pink-600 hover:bg-blue-200 block text-center p-2 border-blue-300 border-2">Logout</a></Link>
    </div>)}
    {/* {value && (
        <div className={`fixed w-[300px] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${data.adminToggle ? "translate-x-0" : "-translate-x-full"}`}>
        <ul className="flex flex-col space-y-2 p-4">
          <li className="bg-pink-200 hover:bg-pink-400 hover:text-white hover:font-semibold text-center py-3 rounded-lg text-lg cursor-pointer transition-colors duration-300">
            Student Details
          </li>
          <li className="bg-pink-200 hover:bg-pink-400 hover:text-white hover:font-semibold text-center py-3 rounded-lg text-lg cursor-pointer transition-colors duration-300">
            Faculty Details
          </li>
          <li className="bg-pink-200 hover:bg-pink-400 hover:text-white hover:font-semibold text-center py-3 rounded-lg text-lg cursor-pointer transition-colors duration-300">
            Leave Approval
          </li>
          <li className="bg-pink-200 hover:bg-pink-400 hover:text-white hover:font-semibold text-center py-3 rounded-lg text-lg cursor-pointer transition-colors duration-300">
            Attendance Approval
          </li>
          <li className="bg-pink-200 hover:bg-pink-400 hover:text-white hover:font-semibold text-center py-3 rounded-lg text-lg cursor-pointer transition-colors duration-300">
            Time Table
          </li>
        </ul>
      </div>
      
    )} */}
    </>
  )
}
