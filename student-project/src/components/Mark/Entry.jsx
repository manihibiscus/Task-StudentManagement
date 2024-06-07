import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Entry = () => {
  const initialFormData = {
    tamil: "",
    english: "",
    maths: "",
    science: "",
    social: "",
  };
  const [markData, setMarkData] = useState(initialFormData);
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (total) {
      postData();
    }
  }, [total]);

  const totalMarks = () => {
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
    } else {
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
    };

    axios.post("http://localhost:3000/postmark", details)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred");
      });
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
              Name: <span>Manikandan S</span>
            </p>
            <p>
              Class: <span>10</span>
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="w-20 h-8 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      name="total"
                      value={total}
                      readOnly
                      disabled
                    />
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
