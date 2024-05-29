import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getleaveStatus } from "../Redux/Slice/leaveFormSlice";

export const StudentHome = () => {
    const leaveStatus = useSelector((state)=>state.leaveReq.filterStatus);
    const dispatch = useDispatch();
    const loggedUserString = sessionStorage.getItem('loggedUser');
    const loggedUser = JSON.parse(loggedUserString);
    const dateOfBir=loggedUser.dob;
    const [age, setAge] = useState();
    // const lastObj = leaveStatus.length

    useEffect(() => {
    dispatch(fetchData());
    dispatch(getleaveStatus(loggedUser));
    const calculateAge = (dateOfBir) => {
        const dob = new Date(dateOfBir);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };
    setAge(calculateAge(dateOfBir));

  }, [dateOfBir]);

//   const getLastObject = (array) => {
//     return array[array.length - 1];
//   };
  
//   const lastRequest = getLastObject(leaveStatus);


  return (
    <>
        {/* {leaveStatus[leaveStatus.length - 1]} */}
        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row md:flex-col sm:flex-row gap-4 mt-4">
                <div className="h-[300px] md:w-full lg:w-[33%] bg-white shadow-xl">
                    <div className="rounded-full bg-gray-100 w-[170px] h-[170px] flex justify-center mx-auto mt-8" >
                        <img src="./male.png" className="w-[150px] h-[150px] p-1" alt="" />
                    </div>
                    <div className="text-center text-lg font-bold">
                        <p className="text-md text-gray-500">{loggedUser.studentName}</p>
                        <p className="text-pink-500 text-sm md:text-md">Ref ID: <span className="text-gray-400">{loggedUser._id}</span></p>
                    </div>
                </div>
                <div className="h-[300px] md:w-full lg:w-[67%] bg-white shadow-xl">
    <div className="mx-auto mt-2 space-y-2">

         <div className="p-3 pl-6 border-b-4 flex justify-start">
            <p className="font-semibold w-32 md:w-[200px] text-pink-600">Name</p>
            <p className="text-gray-800 font-semibold">{loggedUser.studentName}</p>
        </div>
        <div className="p-3 pl-6 border-b-4 flex justify-start">
            <p className="font-semibold w-32 md:w-[200px] text-pink-600">Father Name</p>
            <p className="text-gray-800 font-semibold">{loggedUser.fatherName}</p>
        </div>
        <div className="p-3 pl-6 border-b-4 flex justify-start">
            <p className="font-semibold w-32 md:w-[200px] text-pink-600">Register Number</p>
            <p className="text-gray-800 font-semibold">{loggedUser.registerNumber}</p>
        </div>
        <div className="p-3 pl-6 border-b-4 flex justify-start">
            <p className="font-semibold w-32 md:w-[200px] text-pink-600">Age</p>
            <p>{age}</p>
        </div>
        <div className="p-3 pl-6 flex justify-start">
            <p className="font-semibold w-32 md:w-[200px] text-pink-600">Date of Birth</p>
            <p className="text-gray-800 font-semibold">{loggedUser.dob}</p>
        </div>
    </div>
</div>

            </div>
            <div className="flex flex-col lg:flex-row md:flex-col sm:flex-row gap-4 mt-4 shadow-xl">
                {/* <div className="h-[230px] md:w-full lg:w-[33%] bg-white">
                <div className="p-3 pl-6 border-b-4 flex justify-start">
                    <p className="font-semibold w-32 md:w-[200px] text-pink-600">Attendence Percentage: </p>
                    <p className="text-gray-800 font-semibold">80%</p>
                </div>
                <div className="p-3 pl-6 border-b-4 flex justify-start">
                    <p className="font-semibold w-32 md:w-[200px] text-pink-600">Leave Status: </p>
                    <p className="text-gray-800 font-semibold">{leaveStatus.length}</p>
                </div>
                <div className="p-3 pl-6 border-b-4 flex justify-start">
                    <p className="font-semibold w-32 md:w-[200px] text-pink-600">Rank: </p>
                    <p className="text-gray-800 font-semibold">4</p>
                </div>
                </div> */}
                {/* <div className="h-[230px] md:w-full lg:w-[33%] bg-blue-400">4</div>
                <div className="h-[230px] md:w-full lg:w-[34%] bg-purple-400">5</div> */}
            </div>
        </div>
    </>
  )
}
