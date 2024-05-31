import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Redux/Slice/loginSlice";
import { deleteStudentData, updateStudentData } from "../Redux/Slice/studentDetailsSlice";

export const Student = () => {
    const studentDetails = useSelector((state) => state.login.studReg);
    const upData = useSelector(state => state.studentUpdateDelete);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editedData, setEditedData] = useState({ id: "", studentName: "", fatherName: "", dob: "", phoneNumber:"" });

    useEffect(() => {
        dispatch(fetchData());
    }, [upData.updateData, upData.deleteId, dispatch]);

    const handleEditClick = (student) => {
        setEditId(student._id);
        setEditedData({ id: student._id, studentName: student.studentName, fatherName: student.fatherName, dob:student.dob, phoneNumber:student.phoneNumber});
    };

    const handleSaveClick = () => {
        dispatch(updateStudentData(editedData));
        dispatch(fetchData());
        setEditId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleCancelClick = () => {
        setEditId(null);
    };

    const handleDeleteClick = (student) => {
        dispatch(deleteStudentData(student._id));
        dispatch(fetchData());
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Name</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Name</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Father Name</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Date of Birth</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Phone Number</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Edit</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-widest">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {studentDetails && studentDetails.map((student) => (
                            <tr key={student._id} className="hover:bg-gray-100">
                                <td>
                                   <p className="pl-2 text-green-600 font-semibold">{student.registerNumber}</p> 
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    {editId === student._id ? (
                                        <input
                                            type="text"
                                            name="studentName"
                                            value={editedData.studentName}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                                        />
                                    ) : (
                                        student.studentName
                                    )}
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    {editId === student._id ? (
                                        <input
                                            type="text"
                                            name="fatherName"
                                            value={editedData.fatherName}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                                        />
                                    ) : (
                                        student.fatherName
                                    )}
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    {editId === student._id ? (
                                        <input
                                            type="text"
                                            name="dob"
                                            value={editedData.dob}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                                        />
                                    ) : (
                                        student.dob
                                    )}
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    {editId === student._id ? (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={editedData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                                        />
                                    ) : (
                                        student.phoneNumber
                                    )}
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    {editId === student._id ? (
                                        <div className="flex flex-col sm:flex-row">
                                            <button
                                                onClick={handleSaveClick}
                                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-0 sm:mr-2 mb-2 sm:mb-0"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(student)}
                                            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full sm:w-auto"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-2 sm:px-6 sm:py-4">
                                    <button
                                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-auto"
                                        onClick={() => handleDeleteClick(student)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
