import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Entry = () => {
  var initialFormData = {
    tamil: "",
    english: "",
    maths: "",
    science: "",
    social: "",
  };
  const [markData, setMarkData] = useState(initialFormData);
  const [total, setTotal] = useState("");
  const [markStatus,setMarkStatus]= useState(false);
  const navigate = useNavigate();

  const getDetails=JSON.parse(sessionStorage.getItem("stdDet"))
  // useEffect(() => {
  //   console.log(getDetails)
  //   if (total) {
  //     postData();
  //   }
  // }, []);

  const totalMarks = () => {
    
    if(
      markData.tamil < 35 ||
      markData.english < 35 ||
      markData.maths < 35 ||
      markData.science < 35 ||
      markData.social <35
    ){
      setMarkStatus(true);
    }
    else{
      setMarkStatus(false);

    }
    if (
      markData.tamil &&
      markData.english &&
      markData.maths &&
      markData.science &&
      markData.social
    ) {
      const p1 = parseInt(markData.tamil);
      const p2 = parseInt(markData.english);
      const p3 = parseInt(markData.maths);
      const p4 = parseInt(markData.science);
      const p5 = parseInt(markData.social);
      const sum = p1 + p2 + p3 + p4 + p5;
      setTotal(sum);
    } 
    else {
      alert("Enter All the Fields");
    }
  };

  const postData = () => {
    const details = {
      tamil: markData.tamil,
      english: markData.english,
      maths: markData.maths,
      science: markData.science,
      social: markData.social,
      total: total,
      studentName: getDetails.studentName
    };

    if(markData.tamil &&
      markData.english &&
      markData.maths &&
      markData.science &&
      markData.social && total){

    axios.post("https://task-student-management-sxna.vercel.app/postmark", details)
      .then((response) => {
        alert(response.data);
        // initialFormData={};
        (navigate("/mark"));

      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred");
      });
    }
    else{
      alert("Enter the Marks correctly")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarkData({
      ...markData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container mx-auto flex justify-center">
        <div className="bg-green-600 w-full">
          <p className="text-center text-xl p-2">Annual Mark Entry</p>
          <div className="flex justify-between p-4 pl-8 pr-8 text-lg">
            <p>
              Name: <span>{getDetails.studentName}</span>
            </p>
            <p>
              Class: <span>{getDetails.className}{getDetails.section} </span>
            </p>
          </div>
          <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
            <table className="w-[250px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="text-left text-xl py-2 px-4 font-semibold">
                    Subject
                  </th>
                  <th className="text-left text-xl py-2 px-4 font-semibold">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="pl-4 py-2 text-lg font-semibold">Tamil</td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${markData.tamil <35 ? 'text-red-500 font-bold text-xl' : 'text-green-600 font-bold text-xl'}`}
                      name="tamil"
                      onChange={handleChange}
                      value={markData.tamil}
                    />
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="pl-4 py-2 text-lg font-semibold">English</td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${markData.english < 35 ? 'text-red-500 font-bold text-xl' : 'text-green-600 font-bold text-xl'}`}
                      name="english"
                      onChange={handleChange}
                      value={markData.english}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 py-2 text-lg font-semibold">Maths</td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${markData.maths<35 ? 'text-red-500 font-bold text-xl' : 'text-green-600 font-bold text-xl'}`}
                      name="maths"
                      onChange={handleChange}
                      value={markData.maths}
                    />
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="pl-4 py-2 text-lg font-semibold">Science</td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${markData.science<35 ? 'text-red-500 font-bold text-xl' : 'text-green-600 font-bold text-xl'}`}
                      name="science"
                      onChange={handleChange}
                      value={markData.science}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-4 py-2 text-lg font-semibold">
                    Social Science
                  </td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${markData.social<35 ? 'text-red-500 font-bold text-xl' : 'text-green-600 font-bold text-xl'}`}
                      name="social"
                      onChange={handleChange}
                      value={markData.social}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <td>
                      <button
                        onClick={totalMarks}
                        className="px-2 rounded-lg text-white font-bold py-2 bg-green-500"
                      >
                        GET TOTAL
                      </button>
                    </td>
                  </td>
                </tr>
                <tr>
                  <td className="pl-4 py-2 text-lg font-semibold">Total</td>
                  <td className="pl-4 py-2">
                    <input
                      type="text"
                      className={`w-20 h-8 p-1 border text-center border-gray-300 ${markStatus ? 'text-red-500 text-xl font-bold': 'text-green-600 text-xl font-bold '} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      name="total"
                      value={total}
                      readOnly
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <button onClick={postData} className="px-2 mb-2 py-1 border-solid border-blue-400 rounded-lg text-lg font-bold text-yellow-700 bg-blue-300 border-2 m-1">
                    Post
                  </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
          <button className="p-2 rounded-lg text-white font-extralight bg-slate-600 ml-10" onClick={()=>{
           navigate("/mark");

          }}>Back</button>
        </p>
          </div>
        </div>
      </div>
    </>
  );
};
