import { Link } from "react-router-dom"

export const Register = () => {
  return (
    <div>
        <div className="flex items-center justify-center mt-20 bg-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border-2 border-gray-400">
          <h1 className="text-center font-semibold text-4xl text-gray-800">Register</h1>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Name:</label>
              <input 
                type="text" 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your email" />
              {/* {loginData.errors.email && <span className="text-red-500 text-sm mt-1">{loginData.errors.email}</span>} */}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Father Name:</label>
              <input 
                type="text" 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your email" />
              {/* {loginData.errors.email && <span className="text-red-500 text-sm mt-1">{loginData.errors.email}</span>} */}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
              <input 
                type="text" 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your email" />
              {/* {loginData.errors.email && <span className="text-red-500 text-sm mt-1">{loginData.errors.email}</span>} */}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Password:</label>
              <input 
                type="text" 
                className={`mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`} 
                placeholder="Enter your email" />
              {/* {loginData.errors.email && <span className="text-red-500 text-sm mt-1">{loginData.errors.email}</span>} */}
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
