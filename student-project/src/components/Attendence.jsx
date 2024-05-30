import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil,faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { fetchData } from "../Redux/Slice/loginSlice";
import { attendenceUpdate, submitStatus } from "../Redux/Slice/studentDetailsSlice";


export const Attendence = () => {
  const data = useSelector((state) => state.login.studReg);
  const stu = useSelector((state) => state.studentUpdateDelete);
  const dispatch = useDispatch();
  const date = new Date();
  const [value, setValue] = useState([]);
  const [attendenceData, setAttendanceData] = useState([]);
  const [status, setStatus] = useState(true);
  //   const [submit, setSubmit] = useState(false);
  const [choosed, setChoose] = useState(false);
  const [dateWise, setDateWise] = useState([]);
  const [editOption, setEditOPtion] = useState(null);
  const [editedData, setEditedData] = useState({attendendStatus:"" });
  // const [updateVal, setUpdateVal] = useState("")
  const attenDetails = useSelector((state)=>state.login.attendenceDetails);
  useEffect(() => {
    dispatch(fetchData());
    // const attendenceData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000/getattendence");
    //     setAttendanceData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching attendance data:", error);
    //   }
    // };
    // attendenceData();
    setAttendanceData(attenDetails);
    checking();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stu.submit, attendenceData, attenDetails, stu.update
  ]);

  const checking = () => {
    const today = date.toISOString().split("T")[0];
    if (attendenceData.length > 0) {
      const daily = attendenceData.filter((c) => {
        return c.date === today;
      });
      if (daily.length == data.length) {
        setStatus(false);
      }
    }
  };
  console.log(attendenceData);
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
    if(value.length == data.length){
    axios.post("http://localhost:3000/postattendence", value)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occured");
      });
    }
    else{
      alert("Enter All Fields")
    }
    dispatch(submitStatus());
  };

  const choose = (value) => {
    if (value === "Entry") {
      setChoose(false);
    } else {
      setChoose(true);
    }
  };
  const viewDate = (getDate) => {
    const dateWissAtt = attendenceData.filter((d) => {
      return d.date === getDate;
    });
    setDateWise(dateWissAtt);
  };

  const update = (val)=>{
    // const getVal=val
    // setUpdateVal(getVal);
    setEditedData({attendendStatus:val});
    // setTimeout(()=>{
    //   alert(updateVal);
    // },2000);
  }

  const updateAttencence = (e, attendenceDet) => {
    e.preventDefault();
    setEditOPtion(attendenceDet._id);
    setEditedData({attendendStatus:attendenceDet.attendendStatus});
    // alert(attendenceDet._id);
  };
  const sendAttendence = (e, id)=>{
    e.preventDefault(); 
    var ref=[{id:id._id},{editedData}];
    dispatch(attendenceUpdate(ref));
    // axios.patch(`http://localhost:3000/updateattendence/${id}`,editedData)
    // .then(response=>{
    //     alert(response.data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // }); 
    setEditOPtion(null);
  }
  return (
    <>
      <div className="flex flex-row items-strat justify-center gap-4 p-4">
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="choose"
              value="Entry"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => choose(e.target.value)}
              defaultChecked // Set as default selected
            />
            <span className="ml-2 text-lg font-medium text-gray-700">
              Entry
            </span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="choose"
              value="View"
              className="form-radio h-5 w-5 text-blue-600"
              onChange={(e) => choose(e.target.value)}
            />
            <span className="ml-2 text-lg font-medium text-gray-700">
              View Attendance
            </span>
          </label>
        </div>
      </div>
      <ToastContainer />
      {!choosed ? (
        <div className="container mx-auto p-4">
          <p className="text-lg font-bold text-blue-800 text-center">
            <span>Date :</span> {date.toISOString().split("T")[0]}
          </p>
          {status ? (
            <div>
              <form action="">
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Class
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Leave
                    </th>
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
                        <td className="py-3 px-4 text-sm">
                          {detail.studentName}
                        </td>
                        <td className="py-3 px-4 text-sm">10A</td>
                        <td className="py-3 px-4">
                          <input
                            type="radio"
                            name={`attendance-${detail._id}`}
                            value="leave"
                            className="form-radio h-5 w-5 text-blue-600"
                            required
                            onChange={() =>
                              handleRadioChange(
                                detail._id,
                                detail.studentName,
                                "leave"
                              )
                            }
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="radio"
                            name={`attendance-${detail._id}`}
                            value="present"
                            className="form-radio h-5 w-5 text-blue-600"
                            required
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
                            className="form-radio h-5 w-5 text-blue-600"
                            required
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
              </form>
              <div className="container mx-auto mt-2 flex items-center justify-center">
                <button
                  className="bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl text-red-500 text-center">
              Today Entry Over !
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center p-4">
          <div className="mb-4 text-center">
            <label
              htmlFor="date"
              className="block text-lg font-semibold text-gray-700"
            >
              Choose the Date:
            </label>
            <input
              id="date"
              type="date"
              className="mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => viewDate(e.target.value)}
            />
          </div>

          <form action="">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Class
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Attend Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {dateWise &&
                  dateWise.map((attendenceDetail) => (
                    <tr
                      key={attendenceDetail.studentId}
                      className="bg-gray-50 border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-4 text-sm">
                        {attendenceDetail.studentName}
                      </td>
                      <td className="py-3 px-4 text-sm">{attendenceDetail.className}</td>
                      <td
                        className={`py-3 px-4 uppercase ${
                          attendenceDetail.attendendStatus == "present"
                            ? "text-green-500 font-bold"
                            : attendenceDetail.attendendStatus == "absent"
                            ? "text-red-600 font-bold"
                            : "text-yellow-600 font-bold"
                        }`}
                      >
                        <div
                          className="absolute w-[10px] h-[10px] pl-20 cursor-pointer"
                        >
                          {editOption === attendenceDetail._id ? (
                          <p className="absolute pt-2 pl-3"><FontAwesomeIcon onClick={(e)=>sendAttendence(e, attendenceDetail)} className="w-[22px] h-[20px] text-green-800" icon={faCheck} /></p>
                          )
                          :(
                              <p onClick={(e) => updateAttencence(e, attendenceDetail)}><FontAwesomeIcon className="text-pink-800" icon={faPencil} /></p> 
                            )}
                        </div>
                        {editOption === attendenceDetail._id ? (
                          // <input
                          //   type="text"
                          //   name="studentName"
                          //   value={editedData.attendendStatus}
                          //   className="border border-gray-300 p-2 w-[80px] rounded"
                          // />
                       
                          <select name="attendendStatus" value={editedData.attendendStatus} id="" onChange={(e)=>update(e.target.value)}>
                          <option value="present">PRESENT</option>
                          <option value="absent">ABSENT</option>
                          <option value="leave">LEAVE</option>
                          </select>
                      
                        ) : (
                          attendenceDetail.attendendStatus
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </form>
        </div>
      )}
    </>
  );
};
