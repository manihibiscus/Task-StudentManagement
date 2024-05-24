import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchData } from "../Redux/Slice/loginSlice";

export const Attendence = () => {
  const data = useSelector((state) => state.login.loginUser);
  const dispatch = useDispatch();
  const date = new Date();
  const [value, setValue] = useState([]);
  const [attendenceData, setAttendanceData] = useState([]);
  const [status, setStatus] = useState(true)
  const [submit, setSubmit] = useState(false);
  const [choosed, setChoose] = useState(false);
  
    useEffect(() => {
        dispatch(fetchData());
        const attendenceData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/getattendence');
            setAttendanceData(response.data);
          } catch (error) {
            console.error('Error fetching attendance data:', error);
          }
        };
      
        attendenceData();
      }, [submit]);
      
      useEffect(() => {
        var today = date.toISOString().split("T")[0];
        if (attendenceData.length > 0) {
          const daily = attendenceData.find((c) => {
            return c.date === today;
          }); 
          if(daily.date === today){
            setStatus(false);
          }
        }
      }, [submit, attendenceData]);


  const handleRadioChange = (id, name, attendData) => {
    const index = value.findIndex((item) => item.studentId === id);
    console.log(index);
    if (index !== -1) {
      const newValue = [...value];
      newValue[index].attendendStatus = attendData;
      setValue(newValue);
    } else {
      setValue([
        ...value,
        {
          studentId: id,
          studentName: name,
          attendendStatus: attendData,
          date: date.toISOString().split("T")[0],
        },
      ]);
    }
  };

  const handleSubmit = () => {
    setSubmit(true);
    console.log(value);
    axios
      .post("http://localhost:3000/postattendence", value)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occured");
      });
  };
  const choose = (value) =>{
    if(value === "Entry"){
        setChoose(false);
    }
    else{
    setChoose(true)
    }
  }
  return (
    <>
    <input type="radio" name="choose" value="Entry" className="form-radio text-blue-600" 
    onChange={(e)=>choose(e.target.value)} defaultChecked  /> Entry <br />
    <input type="radio" name="choose" value="View" className="form-radio text-blue-600"
    onChange={(e)=>choose(e.target.value)}  /> View Attendence
    {!choosed ? (
    <div className="container mx-auto p-4">
      <p className="text-lg font-bold text-blue-800">
        <span>Date :</span> {date.toISOString().split("T")[0]}
      </p>
      {status ? (<div>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Class</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Leave</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Present
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Absent
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((detail) => (
              <tr
                key={detail._id}
                className="bg-gray-50 border-b hover:bg-gray-100"
              >
                <td className="py-3 px-4 text-sm">{detail.studentName}</td>
                <td className="py-3 px-4 text-sm">10A</td>
                <td className="py-3 px-4">
                  <input
                    type="radio"
                    name={`attendance-${detail._id}`}
                    value="leave"
                    className="form-radio text-blue-600"
                    onChange={() =>
                      handleRadioChange(detail._id, detail.studentName, "leave")
                    }
                   />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="radio"
                    name={`attendance-${detail._id}`}
                    value="present"
                    className="form-radio text-blue-600"
                    onChange={() =>
                      handleRadioChange(
                        detail._id,
                        detail.studentName,
                        "present"
                      )
                    }
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="radio"
                    name={`attendance-${detail._id}`}
                    value="absent"
                    className="form-radio text-blue-600"
                    onChange={() =>
                      handleRadioChange(
                        detail._id,
                        detail.studentName,
                        "absent"
                      )
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 justify-center mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>) : (
        <p className="text-xl text-red-500 text-center">Today Entry Over !</p>
      )}
      
      {/* {attendenceData &&
        attendenceData.map((attend)=>(
        <li key={attend.studentId}> {attend.studentName}</li>
        ))
      } */}
    </div>) : (
        <div className="container mx-auto">
            <form action="">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Class</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Attend Status</th>
          </tr>
        </thead>
        <tbody>
          {attendenceData &&
            attendenceData.map((attendenceDetail) => (
              <tr
                key={attendenceDetail.studentId}
                className="bg-gray-50 border-b hover:bg-gray-100"
              >
                <td className="py-3 px-4 text-sm">{attendenceDetail.studentName}</td>
                <td className="py-3 px-4 text-sm">10A</td>
                <td className="py-3 px-4 uppercase"> {attendenceDetail.attendendStatus}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
            </form>
        </div>
    ) }
    </>
  );
};
