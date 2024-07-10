import axios from "axios";
import { useEffect, useState } from "react";
// import { Entry } from "./Entry";
import { useNavigate } from "react-router-dom";

export const Mark = () => {
    const [studData, setStudData]=useState([]);
    const [status, setStatus]=useState(false);
    const [stdMark, setStdMark]=useState([]);
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
      try {
        const response2 = await axios.get(
          "https://task-student-management-sxna.vercel.app/getMarkDetails"
        );
        setStdMark(response2.data);
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
    sessionStorage.setItem("stdDet", JSON.stringify(student));
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
              <th className="py-3 px-6 text-left font-semibold">Total Mark</th>
              <th className="py-3 px-6 text-left font-semibold">Result</th>
              <th className="py-3 px-6 text-left font-semibold">Mark Entry</th>
            </tr>
          </thead>
          {/* <tbody>
            {studData.map((student, index) => (
              <tr key={student._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-6 border-b border-gray-200">{student.studentName}</td>
                <td className="py-3 px-6 border-b border-gray-200">{student.className}</td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <button onClick={(e)=>sendEntry(e,student)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Entry</button>
                </td>
                {stdMark.map((stdTot, index) => (
                <td key={index} className="py-3 px-6 border-b border-gray-200">{stdTot.total}</td>
                ))}
              </tr>
            ))}
          </tbody> */}
          <tbody>
  {studData.map((student, index) => {
    const mark = stdMark.find((mark) => mark.studentName === student.studentName);
    return (
      <tr key={student._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
        <td className="py-3 px-6 border-b border-gray-200">{student.studentName}</td>
        <td className="py-3 px-6 border-b border-gray-200">{student.className}</td>
        <td className={`py-3 px-6 border-b ${mark && mark.result == "Fail" ? 'text-red-500' : mark && mark.result == 'Pass' ? 'text-green-600' : ''} border-gray-200 text-lg font-bold`}>{mark ? mark.total : 'N/A'}</td>
        <td className={`py-3 px-6 border-b ${mark && mark.result == "Fail" ? 'text-red-500' : mark && mark.result == 'Pass' ? 'text-green-600' : ''} border-gray-200 text-lg font-bold`}>{mark ? mark.result : 'N/A'}</td>

        <td className="py-3 px-6 border-b border-gray-200">
          <button onClick={(e) => sendEntry(e, student)} className={`bg-green-500 ${mark ? 'hidden' : 'block'} text-white px-4 py-2 rounded hover:bg-green-600`}>Entry</button>
        </td>
      </tr>
    );
  })}
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
