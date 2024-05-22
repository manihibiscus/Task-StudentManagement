import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Redux/Slice/loginSlice";
import { updateStudentData } from "../Redux/Slice/studentDetailsSlice";

export const Student = () => {
    const studentDetails = useSelector((state) => state.login.loginUser);
    const upData = useSelector(state=>state.studentUpdateDelete);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editedData, setEditedData] = useState({ id:"", studentName: "", fatherName: "", userId: "" });

    useEffect(() => {
        dispatch(fetchData());
    },[upData.updateData]);

    const handleEditClick = (student) => {
        setEditId(student._id);
        setEditedData({ id:student._id, studentName: student.studentName, fatherName: student.fatherName, userId: student.userId });
    };

    const handleSaveClick = () => {
        // Dispatch an action to update the data in the Redux store and/or backend
        // For example: dispatch(updateStudent(editedData));
        dispatch(updateStudentData(editedData));
        // console.log(editedData);
        dispatch(fetchData());
        setEditId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({...editedData, [name]: value });
    };
    const handleCancleClick = () =>{
        setEditId(null)
    }
    return (
        <div className="flex justify-center">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-widest">Father Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-widest">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-widest">Edit</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-widest">Delete</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {studentDetails && studentDetails.map((student) => (
                        <tr key={student._id}>
                            <td className="px-6 py-4">
                                {editId === student._id ? (
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={editedData.studentName}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 p-2"
                                    />
                                ) : (
                                    student.studentName
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === student._id ? (
                                    <input
                                        type="text"
                                        name="fatherName"
                                        value={editedData.fatherName}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 p-2"
                                    />
                                ) : (
                                    student.fatherName
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === student._id ? (
                                    <input
                                        type="text"
                                        name="userId"
                                        value={editedData.userId}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 p-2"
                                    />
                                ) : (
                                    student.userId
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editId === student._id ? (
                                    <>
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancleClick}
                                        className="bg-red-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Cancel
                                    </button>

                                    </>
                                    
                                    
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(student)}
                                        className="bg-yellow-200 text-pink-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Student;
