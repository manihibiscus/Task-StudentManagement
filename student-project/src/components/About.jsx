export const About = () => {
  return (
    <div className="bg-gray-100 py-10">
    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Student Management System
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Our mission is to provide a seamless and efficient platform for managing student information, attendance, and performance.
        </p>
      </div>
      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                {/* Icon */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v4m-4 0h14M5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Comprehensive Management</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Manage all aspects of student information, from enrollment to graduation.
            </dd>
          </div>
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                {/* Icon */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1 9 2.567 9 4.5 10.343 8 12 8zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">User-Friendly Interface</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Our system is designed with a focus on usability and accessibility for all users.
            </dd>
          </div>
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                {/* Icon */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h6l3 8h6l3-8h6" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-Time Updates</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              Stay informed with real-time updates on student attendance and performance.
            </dd>
          </div>
          <div className="relative">
            <dt>
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                {/* Icon */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l-8-4m0 0l8 4 8-4m-8 4v8m0 0L4 8m8 8l8-8" />
                </svg>
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Data</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500">
              We prioritize the security and privacy of all student data within our system.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  )
}
