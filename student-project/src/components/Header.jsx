import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
    <nav className="p-3 flex bg-pink-200 justify-between item-center">
        <a href="" id="brand" className="flex gap-12 item-center">
            <span className="text-lg font-medium">Student Management</span>
        </a>
        <div id="nav-menu" className="hidden md:flex gap-12">
            <a className="font-medium hover:text-blue-500" ><Link to="/" >Home</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/about" >About Us</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/contact" >Contact Us</Link></a>
            <a className="font-medium hover:text-blue-500" ><Link to="/login" >Login</Link></a>
        </div>

        {/* <button className="hidden md:block">
            ELe
        </button>
        <button className="p-2 md:hidden">
            HELLO-Menu
        </button> */}
    </nav>
    </>
  )
}
