import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Redux/Slice/loginSlice";
import { deleteStudentData, updateStudentData } from "../Redux/Slice/studentDetailsSlice";

export const Student = () => {
    const studentDetails = useSelector((state) => state.login.loginUser);
    const upData = useSelector(state => state.studentUpdateDelete);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editedData, setEditedData] = useState({ id: "", studentName: "", fatherName: "", userId: "" });

    useEffect(() => {
        dispatch(fetchData());
    }, [upData.updateData, upData.deleteId, dispatch]);

    const handleEditClick = (student) => {
        setEditId(student._id);
        setEditedData({ id: student._id, studentName: student.studentName, fatherName: student.fatherName, userId: student.userId });
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
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-widest">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-widest">Father Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-widest">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-widest">Edit</th>
                        <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-widest">Delete</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {studentDetails && studentDetails.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-100">
                            <td className="px-6 py-4">
                                {editId === student._id ? (
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={editedData.studentName}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 p-2 rounded"
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
                                        className="border border-gray-300 p-2 rounded"
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
                                        className="border border-gray-300 p-2 rounded"
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
                                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="bg-gray-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(student)}
                                        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
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
    );
};

export default Student;
