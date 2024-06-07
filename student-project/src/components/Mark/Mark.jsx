import axios from "axios";
import { useEffect, useState } from "react";
// import { Entry } from "./Entry";
import { useNavigate } from "react-router-dom";

export const Mark = () => {
    const [studData, setStudData]=useState([]);
    const [status, setStatus]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://task-student-management-sxna.vercel.app/getstudentregistration"
        );
        setStudData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };
    fetchData();
    if(status==true){
      navigate("/entry");

    }
  }, [status]);

  const sendEntry = (e, student) =>{
    e.preventDefault();
    setStatus(true);
    
  }
  
  return <>
    {/* {studData.map(student=>(
        <li key={student._id}>{student.studentName}</li>
    ))} */}

    {!status &&(
      <div className="p-8 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-6 text-left font-semibold">Student Name</th>
              <th className="py-3 px-6 text-left font-semibold">Class</th>
              <th className="py-3 px-6 text-left font-semibold">Entry</th>
            </tr>
          </thead>
          <tbody>
            {studData.map((student, index) => (
              <tr key={student._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-6 border-b border-gray-200">{student.studentName}</td>
                <td className="py-3 px-6 border-b border-gray-200">{student.className}</td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <button onClick={(e)=>sendEntry(e,student)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Entry</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )}
    {/* {status &&(
      <div>
        <Entry />
      </div>
    )} */}
  </>;
};
