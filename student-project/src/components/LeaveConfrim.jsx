import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../Redux/Slice/leaveFormSlice";
import axios from "axios";
export const LeaveConfrim = () => {
  const requests = useSelector(
    (state) => state.leaveReq.getLeaveRequestDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
   
  }, [requests]);

  const accept =(detail)=>{
    const body={
        status:"Accepted"
    };

    axios.patch(`http://localhost:3000/updateleavedetails/${detail._id}`,body)
    .then(response=>{
        alert(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // alert(detail._id);
  }
  const reject =(detail)=>{
    const body={
        status:"Rejected"
    };

    axios.patch(`http://localhost:3000/updateleavedetails/${detail._id}`,body)
    .then(response=>{
        alert(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // alert(detail._id);
  }
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center p-2 m-2">
          Leave Conformation{" "}
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center border-r text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-center border-r  text-gray-700">
                  Register Number
                </th>
                <th className="py-2 px-4 border-b text-center border-r text-gray-700">
                  Class
                </th>
                <th className="py-2 px-4 border-b text-center border-r text-gray-700">
                  Subject
                </th>
                <th className="py-2 px-4 border-b text-center border-r text-gray-700">
                  Content
                </th>
                <th className="py-2 px-4 border-b text-center border-r text-gray-700">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((details) => (
                <tr key={details._id}>
                  <td className="py-2 px-4 border-b text-gray-900 border-r">
                    <input
                      type="text"
                      value={details.reqStuName}
                      readOnly
                      className="w-full px-2 py-1 border font-bold text-green-700 rounded-md outline-none bg-gray-100 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-gray-900 border-r">
                    <input
                      type="text"
                      value={details.reqStuReg}
                      readOnly
                      className="w-full px-2 py-1 border rounded-md outline-none font-bold text-green-700 bg-gray-100 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-gray-900 border-r">
                    <input
                      type="text"
                      value={`${details.reqStuClass} - '${details.reqStuSec}' `}
                      readOnly
                      className="w-full px-2 py-1 border rounded-md outline-none font-bold text-green-700 bg-gray-100 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-gray-900 border-r">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Please Enter Your Subject"
                      value={details.reqStuSubject}
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
                      value={details.reqStuContent}
                      readOnly
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-gray-900 border-r text-center">
                    {details.status === "Pending" ? (
                        <>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded mr-2"
                            onClick={()=>accept(details)}
                        >
                        Accept
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                      onClick={()=>reject(details)}

                      >
                        Reject
                      </button>
                      </>
                    ): (
                      <input 
                      type="text" 
                      value={details.status} 
                      disabled 
                      className={`w-full px-2 py-1 border rounded-md outline-none bg-gray-100 text-center 
                      
                      ${details.status==="Accepted" ? 'uppercase bg-green-400 font-bold text-orange-950':'uppercase bg-red-500 font-bold text-white'}`}
                    />                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
