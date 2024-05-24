export const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <p className="text-center text-3xl font-serif text-gray-700 pt-4 mb-6">Welcome to Student Management</p>
      <div className="flex flex-col md:flex-row">
        <div className="bg-blue-300 w-full md:w-2/3 rounded-lg overflow-hidden shadow-lg">
          <img className="w-full h-auto object-cover" src="/std.jpg" alt="Students" />
        </div>
        <div className="bg-gray-100 w-full md:w-1/3 h-auto md:h-[550px] p-4 flex flex-col justify-between space-y-4 mt-4 md:mt-0 md:ml-4 rounded-lg shadow-lg">
          <div className="h-[250px] bg-gradient-to-r from-pink-100 to-yellow-100 p-6 rounded-md shadow-md">
            <p className="text-left text-pink-700 text-xl font-semibold">Announcements</p>
            <div className="text-left text-pink-950 mt-4 space-y-2 animate-pulse">
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Annual Exam Time Table</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* New Joining Process Start</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Training Period Schedule</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Parents Meeting</p>
            </div>
          </div>
          <div className="h-[250px] bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-md shadow-md">
            <p className="text-left text-pink-700 text-xl font-semibold">Upcoming Events</p>
            <div className="text-left text-pink-950 mt-4 space-y-2 animate-pulse">
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Mid-Term Time Table</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* New Joining Process Start</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Training Period Schedule</p>
              <p className="text-lg hover:text-blue-500 cursor-pointer">* Summer Holiday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
