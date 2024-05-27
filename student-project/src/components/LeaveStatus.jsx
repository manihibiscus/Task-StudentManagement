import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchData } from "../Redux/Slice/leaveFormSlice";

export const LeaveStatus = () => {
  const loggedUserString = sessionStorage.getItem('loggedUser');
  const loggedUser = JSON.parse(loggedUserString);
  const getLevDet = useSelector((state)=>state.leaveReq.getLeaveRequestDetails);
  const dispatch  = useDispatch();
  const [filterLevData, setFilterLevData] = useState([]);
  useEffect(()=>{
    dispatch(fetchData());
    const usdata = getLevDet.filter((d) => {
      return d.reqStuEmail === loggedUser.userId;
    });
    if(usdata){
      setFilterLevData(usdata);
    }
  },[])

  return (
    <>
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold text-center p-2 m-2">Leave Request Form</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center border-r text-gray-700">Name</th>
              <th className="py-2 px-4 border-b text-center border-r  text-gray-700">Email Id</th>
              <th className="py-2 px-4 border-b text-center border-r text-gray-700">Subject</th>
              <th className="py-2 px-4 border-b text-center border-r text-gray-700">Content</th>
              <th className="py-2 px-4 border-b text-center border-r text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
          {filterLevData.map(filterData=>(
                <tr key={filterData._id}>
                <td className="py-2 px-4 border-b text-gray-900 border-r">
                  <input 
                    type="text" 
                    value={filterData.reqStuName} 
                    readOnly 
                    className="w-full px-2 py-1 border rounded-md outline-none bg-gray-100 text-center"
                  />
                </td>
                <td className="py-2 px-4 border-b text-gray-900 border-r">
                  <input 
                    type="text" 
                    value={filterData.reqStuEmail} 
                    readOnly 
                    className="w-full px-2 py-1 border rounded-md outline-none bg-gray-100 text-center"
                  />
                </td>
                <td className="py-2 px-4 border-b text-gray-900 border-r">
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Please Enter Your Subject"
                    value={filterData.reqStuSubject}
                    className="w-full px-2 py-1 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                    readOnly
                  />
                </td>
                <td className="py-2 px-4 border-b text-gray-900 border-r">
                  <textarea 
                    name="content"
                    placeholder="Enter the content"
                    className="w-full px-2 py-1 border rounded-md outline-none focus:ring-2 focus:ring-pink-500" 
                    rows="2"
                    value={filterData.reqStuContent}
                    readOnly
                  />
                </td>
                <td className="py-2 px-4 border-b text-gray-900 border-r">
                  <input 
                    type="text" 
                    value={filterData.status} 
                    disabled 
                    className={`w-full px-2 py-1 border rounded-md outline-none bg-gray-100 text-center 
                    
                    ${filterData.status==="Accepted" ? 'uppercase bg-green-400 font-bold text-orange-950':'uppercase bg-red-500 font-bold text-white'}`}
                  />
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  ) 
}
