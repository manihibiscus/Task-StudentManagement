const Alert = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Alert</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{message}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Alert;