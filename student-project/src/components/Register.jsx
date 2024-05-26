import { Link, Navigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getConfrimPassword, getDoB, getEmail, getFatherName, getGender, getName, getPassword, registerDetails } from "../Redux/Slice/registerSlice";
import { useEffect } from "react";
export const Register = () => {
    const registerData = useSelector((state)=>state.register);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const register = (e) =>{
      dispatch(registerDetails(e));
      if(registerData.regStatus){
        return <Navigate to='/login' />
    }
    }
    useEffect(()=>{
      if(registerData.regStatus){
        return <Navigate to='/login' />
    }
    },[registerData.regStatus]);

  return (
    <div>
        <div className="flex items-center justify-center mt-6 bg-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border-2 border-gray-400">
          <h1 className="text-center font-semibold text-2xl text-gray-800">Register</h1>
          <form className="space-y-4" onSubmit={(e)=>register(e)}>
            <div className="flex flex-col">
              <label htmlFor="stdName" className="text-lg font-medium text-gray-700">Name:</label>
              <input 
                type="text" 
                value={registerData.studentName}
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your Name" 
                onChange={(e)=>dispatch(getName(e.target.value))}
                />
              {registerData.errors.studName && <span className="text-red-500 text-sm mt-1">{registerData.errors.studName}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="fatherName" className="text-lg font-medium text-gray-700">Father Name:</label>
              <input 
                type="text" 
                value={registerData.fatherName}
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your Father Name" 
                onChange={(e)=>dispatch(getFatherName(e.target.value))}
                />
              {registerData.errors.fName && <span className="text-red-500 text-sm mt-1">{registerData.errors.fName}</span>}
            </div>
            {/* DoB */}
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-lg font-medium text-gray-700">Date of Birth:</label>
              <input 
                type="date" 
                value={registerData.dateOfBirth}
                className="mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter your date of birth" 
                onChange={(e) => dispatch(getDoB(e.target.value))}
              />
              {registerData.errors.dob && <span className="text-red-500 text-sm mt-1">{registerData.errors.dob}</span>}
            </div>
            {/* Gender */}
            <div className="flex flex-col mt-4">
  <label className="text-lg font-medium text-gray-700">Gender:</label>
  <div className="mt-1 flex items-center">
    <input 
      type="radio" 
      id="male" 
      name="gender" 
      value="male" 
      checked={registerData.gender === 'male'}
      className="mr-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => dispatch(getGender(e.target.value))}
    />
    <label htmlFor="male" className="text-gray-700">Male</label>
  </div>
  <div className="mt-1 flex items-center">
    <input 
      type="radio" 
      id="female" 
      name="gender" 
      value="female" 
      checked={registerData.gender === 'female'}
      className="mr-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => dispatch(getGender(e.target.value))}
    />
    <label htmlFor="female" className="text-gray-700">Female</label>
  </div>
  {registerData.errors.gen && <span className="text-red-500 text-sm mt-1">{registerData.errors.gen}</span>}
</div>
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
              <input 
                type="text" 
                value={registerData.emailId}
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your email" 
                onChange={(e)=>dispatch(getEmail(e.target.value))}
                />
              {registerData.errors.email && <span className="text-red-500 text-sm mt-1">{registerData.errors.email}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg font-medium text-gray-700">Password:</label>
              <input 
                type="text"
                value={registerData.password} 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your Password" 
                onChange={(e)=>dispatch(getPassword(e.target.value))}/>
              {registerData.errors.pass && <span className="text-red-500 text-sm mt-1">{registerData.errors.pass}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="confrimPassword" className="text-lg font-medium text-gray-700">Confrim Password:</label>
              <input 
                type="text"
                value={registerData.confrimPassword} 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Re-Enter your Password" 
                onChange={(e)=>dispatch(getConfrimPassword(e.target.value))}/>
              {registerData.errors.conPassword && <span className="text-red-500 text-sm mt-1">{registerData.errors.conPassword}</span>}
            </div>
            <button 
              type="submit" 
              className="w-full py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Register
            </button>
            <p className="text-center pt-2">Go Back to <span><Link to='/login' className="text-blue-500 hover:text-blue-900 hover:font-semibold underline">Login!</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  )
}
