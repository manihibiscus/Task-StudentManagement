import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSchoolCircleCheck, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clickMenu } from "../Redux/Slice/menuSlice";
import { useEffect, useState } from "react";
import { logout } from "../Redux/Slice/loginSlice";
export const Header = () => {
    const data=useSelector((state)=>state.menu);
    const loginData = useSelector(state=>state.login)
    const dispatch= useDispatch();
    const logged = sessionStorage.getItem('adminLogged');
    var boolValue = logged === null ? null : logged;
    console.log("Boolean Value");
    console.log(boolValue);
    const [value, setValue] = useState(false);
    useEffect(()=>{
        if(boolValue == "true"){
        setValue(true)
        }
        else if(boolValue == "false"){
            setValue(false)
        }
    },[loginData.adminNavigation])
  return (
    <>
    <nav className="p-3 flex bg-white justify-between item-center border-b-2 border-blue-100 shadow-bottom">
        <a href="" id="brand" className="flex gap-4 item-center">
            <span><FontAwesomeIcon className="w-[25px] h-[25px] text-purple-500" icon={faSchoolCircleCheck} /></span>
            <span className="text-xl font-semibold">Student Management</span>
        </a>
            {!value && (
                <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
                    <a className="font-medium hover:bg-blue-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link to="/home">Home</Link></a>
                    <a className="font-medium hover:bg-blue-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link to="/about">About Us</Link></a>
                    <a className="font-medium hover:bg-blue-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link to="/contact">Contact Us</Link></a>
                    <a className="font-medium hover:bg-blue-200 px-2 py-1 hover:text-pink-700 rounded-md"><Link to="/login">Login</Link></a>
                </div>
            )}
            {value && (
                <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
                    <a className="font-medium hover:text-blue-500"><Link to="/studentdetails">Student Details</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link to="">Faculty Details</Link></a>
                    <a className="font-medium hover:text-blue-500"><Link onClick={()=>dispatch(logout())} to="/home">Logout</Link></a>
                </div>
            )}
        <FontAwesomeIcon onClick={()=>dispatch(clickMenu())} className="w-[25px] h-[25px] md:hidden sm:flex"  icon={faBars} />
    </nav>
    {!value && (
    <div className={`absolute right-1 bg-gray-500 w-[200px] h-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/home" >Home</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2"  ><Link to="/about" >About Us</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/contact" >Contact Us</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/login" >Login</Link></a>
    </div>)}
    {value && (
    <div className={`absolute right-1 bg-gray-500 w-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="" >Student Details</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2"  ><Link to="" >Faculty Details</Link></a>
    </div>)}
    </>
  )
}
