import { Navigate, Outlet } from "react-router-dom";

const authUser = () =>{
  // sessionStorage.getItem("")
  const user = {
    login:true
  }
  return user && user.login;
}

const ProctectRoute = () =>{
  const isAuth = authUser();
  return isAuth ? <Outlet /> : <Navigate to = "/" />
}

export default ProctectRoute;