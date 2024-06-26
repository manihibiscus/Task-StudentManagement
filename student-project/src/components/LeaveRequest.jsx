import { useSelector, useDispatch } from "react-redux";
import { submitLeaveForm } from "../Redux/Slice/leaveFormSlice";
import { useState } from "react";
import axios from "axios";
// import { useEffect } from "react";

export const LeaveRequest = () => {
  const loggedUserString = sessionStorage.getItem('loggedUser');
  const loggedUser = JSON.parse(loggedUserString);
  const levReqDet = useSelector(state => state.leaveReq);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");   
//   useEffect(()=>{
//     dispatch(reqName());
//   })

const leaveSubmit = (e) =>{
    e.preventDefault();
    var body ={
        reqStuName:loggedUser.studentName,
        reqStuReg:loggedUser.registerNumber,
        reqStuSubject:subject,
        reqStuContent:content,
        reqStuClass:loggedUser.className,
        reqStuSec:loggedUser.section,
        status:"Pending"
    };
    dispatch(submitLeaveForm(body));

    // var mail={
    //     reqStuName:loggedUser.studentName,
    //     reqStuEmail:loggedUser.userId,
    //     reqStuSubject:subject,
    //     reqStuContent:content,
    //     mailTO:"pycusmalaus@gmail.com"
    // };

    // axios.post('http://localhost:3000/sendmail', mail)
    // .then(response => {
    //   alert(response.data);
    // })
    // .catch(error => {
    //   alert('Failed to send email');
    //   console.error('There was an error sending the email!', error);
    // });
};

    // alert(body.reqStuName);

  return (
    <> 
      <form action="" onSubmit={(e)=>leaveSubmit(e)} className="container mx-auto w-full max-w-lg border-2 border-pink-600 p-8 m-3 rounded-md md:w-3/4 lg:w-1/2 shadow-lg">
        <h1 className="text-2xl font-semibold text-center p-2 m-2 text-pink-500">Leave Request Form</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="stdName" className="text-lg font-medium text-pink-700">Name:</label>
            <input 
              type="text" 
              value={loggedUser.studentName}
              className="mt-1 border rounded-md px-4 py-2 outline-none" 
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-pink-700">Register Number:</label>
            <input 
              type="text" 
              value={loggedUser.registerNumber}
              className="mt-1 border rounded-md px-4 py-2 outline-none" 
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-lg font-medium text-pink-700">Subject:</label>
            <input 
              type="text" 
              value={subject}
              className="mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" 
              placeholder="Please Enter Your Subject" 
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="text-lg font-medium text-pink-700">Content:</label>
            <textarea 
              id="formattedContent" 
              value={levReqDet.content} 
              className="mt-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" 
              rows="6"
            //   onChange={(e) => dispatch(reqName({ ...levReqDet, content: e.target.value }))}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Type your Content"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 mt-4 text-lg font-semibold text-white bg-pink-400 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
