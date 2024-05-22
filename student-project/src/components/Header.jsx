import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSchool, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clickMenu } from "../Redux/Slice/menuSlice";
export const Header = () => {
    const data=useSelector((state)=>state.menu);
    const dispatch= useDispatch();
  return (
    <>
    <nav className="p-3 flex bg-pink-200 justify-between item-center">
        <a href="" id="brand" className="flex gap-4 item-center">
            <span><FontAwesomeIcon className="w-[25px] h-[25px] text-purple-500" icon={faSchool} /></span>
            <span className="text-xl font-semibold">Student Management</span>
        </a>
        <div id="nav-menu" className="hidden md:flex gap-12 text-lg">
            <a className="font-medium hover:text-blue-500" ><Link to="/home" >Home</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/about" >About Us</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/contact" >Contact Us</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/login" >Login</Link></a>
        </div>
        <FontAwesomeIcon onClick={()=>dispatch(clickMenu())} className="w-[25px] h-[25px] md:hidden sm:flex"  icon={faBars} />
    </nav>
    <div className={`absolute right-1 bg-gray-500 w-[200px] h-[200px] text-lg rounded-md ${data.menuToggle ? 'visible' : 'invisible'} `}>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/home" >Home</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2"  ><Link to="/about" >About Us</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/contact" >Contact Us</Link></a>
        <a className="font-medium hover:text-blue-500 hover:bg-pink-300 block text-center p-2 border-blue-400 border-2" ><Link to="/login" >Login</Link></a>
    </div>
    </>
  )
}
