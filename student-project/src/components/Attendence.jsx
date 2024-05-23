import { useSelector } from "react-redux";

export const Attendence = () => {
    const data = useSelector(state => state.login.loginUser);

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Class</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Leave</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Present</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold">Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(detail => (
                        <tr key={detail._id} className="bg-gray-50 border-b hover:bg-gray-100">
                            <td className="py-3 px-4 text-sm">{detail.studentName}</td>
                            <td className="py-3 px-4 text-sm">10A</td>
                            <td className="py-3 px-4">
                                <input type="radio" name={`attendance-${detail._id}`} value="leave" className="form-radio text-blue-600" />
                            </td>
                            <td className="py-3 px-4">
                                <input type="radio" name={`attendance-${detail._id}`} value="present" className="form-radio text-blue-600" />
                            </td>
                            <td className="py-3 px-4">
                                <input type="radio" name={`attendance-${detail._id}`} value="absent" className="form-radio text-blue-600" />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <button>m</button>
            </table>
        </div>
    );
};
