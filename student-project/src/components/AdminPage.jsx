import { useSelector } from "react-redux";
// import { FaUserGraduate, FaClipboardCheck, FaBookOpen } from 'react-icons/fa';

export const AdminPage = () => {
  const menu = useSelector(state => state.menu);
  return (
    <div className={`transition-all duration-300 ${menu.adminToggle ? 'absolute left-[305px] hidden md:block' : 'left-0 ml-2 mr-2'}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className={`bg-gradient-to-r from-pink-200 to-pink-400 ${menu.adminToggle ? 'w-[390px] h-[300px]' : 'h-[300px]'} rounded-md shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-semibold text-gray-700">Overview</p>
            {/* <FaUserGraduate className="text-4xl text-pink-600"/> */}
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">Student Training:</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Result Status:</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Exams Status:</p>
          <p className="text-lg font-semibold text-gray-600">Total Students:</p>
        </div>
        <div className={`bg-gradient-to-r from-purple-200 to-purple-400 ${menu.adminToggle ? 'w-[390px] h-[300px]' : 'h-[300px]'} rounded-md shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-semibold text-gray-700">Updates</p>
            {/* <FaClipboardCheck className="text-4xl text-purple-600"/> */}
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">Lorem ipsum dolor sit amet.</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Consectetur adipiscing elit.</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Sed do eiusmod tempor incididunt.</p>
        </div>
        <div className={`bg-gradient-to-r from-blue-200 to-blue-400 ${menu.adminToggle ? 'w-[390px] h-[300px]' : 'h-[300px]'} rounded-md shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-semibold text-gray-700">Statistics</p>
            {/* <FaBookOpen className="text-4xl text-blue-600"/> */}
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">Attendance Rate:</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Pass Percentage:</p>
          <p className="text-lg font-semibold text-gray-600 mb-2">Average Grades:</p>
        </div>
      </div>
    </div>
  );
};
