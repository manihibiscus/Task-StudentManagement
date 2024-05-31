// src/App.js
import { useState } from 'react';
import axios from 'axios';

function App(){
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendSMS = async () => {
        try {
            const res = await axios.post('https://task-student-management-sxna.vercel.app/send-sms', { to, message });
            setResponse(res.data.success ? 'Message sent successfully!' : 'Failed to send message.');
        } catch (error) {
            setResponse('Error: ' + error.message);
            console.error('Error:', error.response ? error.response.data : error.message); // Log the error details
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Send SMS</h1>
            <input
                type="text"
                placeholder="Phone Number"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-2 border border-gray-300 rounded mb-4 w-80"
            />
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 border border-gray-300 rounded mb-4 w-80 h-32"
            />
            <button
                onClick={sendSMS}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Send
            </button>
            {response && <p className="mt-4 text-red-500">{response}</p>}
        </div>
    );
}

export default App;
