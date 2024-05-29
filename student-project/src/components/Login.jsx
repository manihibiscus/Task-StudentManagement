import { useDispatch, useSelector } from "react-redux";
import { fetchData,setEmail,setPassword,submitData } from "../Redux/Slice/loginSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Alert from "../Alert";
export const Login = () => {
    const loginData = useSelector((state)=>state.login);
    // const alert = useSelector((state)=>state.login.alertVisible);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const showAlert = () => {
    //   setAlertVisible(true);
    // };
  
    // const closeAlert = () => {
    //   setAlertVisible(false);
    // };

    useEffect(()=>{
        dispatch(fetchData());
        if(loginData.studentNavigation){
          navigate('/studenthome')
        }
        else if(loginData.adminNavigation){
          navigate('/studentDetails');
        }
        else if(alert){
      // {alert && <Alert message="This is an alert message." onClose={closeAlert} />} 
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[loginData.navigation, loginData.adminNavigation]);
  return (
    <div>
    <div className="flex items-center justify-center mt-20 bg-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border-2 border-gray-400">
          <h1 className="text-center font-semibold text-4xl text-gray-800">Login</h1>
          <form onSubmit={(e)=>dispatch(submitData(e))} className="space-y-">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
              <input 
                type="text" 
                id="email" 
                value={loginData.email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${loginData.errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                placeholder="Eg: REG****" />
              {loginData.errors.email && <span className="text-red-500 text-sm mt-1">{loginData.errors.email}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg font-medium text-gray-700">Password:</label>
              <input 
                type="text" 
                id="password" 
                value={loginData.password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${loginData.errors.password ? 'border-red-500' : 'border-gray-300'}`} 
                placeholder="Eg: YYYY-MM-DD"
              />
              {loginData.errors.password && <span className="text-red-500 text-sm mt-1">{loginData.errors.password}</span>}
            </div>
            <button 
              type="submit" 
              className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Login
            </button>
            {/* <p className="text-center pt-2">If you are a New User ? <span><Link to='/register' className="text-blue-500 hover:text-blue-900 hover:font-semibold underline">Please Register!</Link></span></p> */}
          </form>
        </div>
      </div>
      </div>
  )
}
