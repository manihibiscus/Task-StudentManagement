import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const generateRegisterNumber = () => {
    return 'REG' + Math.floor(1000 + Math.random() * 9000);
  };
// const generateRegisterNumber = () => {
//     let lastNumber = localStorage.getItem('lastRegisterNumber');
//     let newNumber;
  
//     if (lastNumber) {
//       newNumber = parseInt(lastNumber) + 1;
//     } else {
//       newNumber = 198700; // Starting number
//     }
  
//     localStorage.setItem('lastRegisterNumber', newNumber);
//     return 'REG' + newNumber;
//   };
export const StudentRegistration = () => {

    const initialFormData = {
        studentName: '',
        fatherName: '',
        motherName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        bloodGroup: '',
        className: '',
        section: '',
        registerNumber: generateRegisterNumber(),
        address: '',
      };
   const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!/^[A-Za-z\s]+$/.test(formData.studentName)) formErrors.studentName = 'Please Enter Name';
    if (!/^[A-Za-z\s]+$/.test(formData.fatherName))formErrors.fatherName = 'Please Enter Name';
    if (!/^[A-Za-z\s]+$/.test(formData.motherName)) formErrors.motherName = 'Please Enter Name';
    if (!formData.dob) formErrors.dob = 'Date of Birth is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = 'Phone Number is required';
    }else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Please Check your Phone Number';
    }
    // else if(/^\d{10}$/.test(formData.phoneNumber)){
    //     if(!/^[6-9]$/.test(formData.phoneNumber))
    //     formErrors.phoneNumber = 'Phone Number must be 10 digits';
    // }
    if (!formData.bloodGroup) formErrors.bloodGroup = 'Blood Group is required';
    if (!formData.className) formErrors.className = 'Class is required';
    if (!formData.section) formErrors.section = 'Section is required';
    if (!formData.address) formErrors.address = 'Address is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      postData();
      // Submit form data to backend or handle it as needed
    //   alert("Submitted");
    }
  };

  const postData = () =>{
    axios.post('http://localhost:3000/poststudentregistration', formData)
        .then(response => {
            // alert(response.data);
            toast.success(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error occured");
        });
        addCredentials(formData);
        setFormData({
            ...initialFormData,
            registerNumber:generateRegisterNumber()
        });
    
  };
  const addCredentials = (formData) =>{
    const detail={
        stdId:formData.registerNumber,
        stdDoB:formData.dob
    }
    axios.post('http://localhost:3000/postItems', detail)
        .then(response => {
            // alert(response.data);
            toast.success(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error occured");
            toast.error("Failed to Register!")
        });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center">Student Registration</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.studentName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fatherName">Father Name</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="motherName">Mother Name</label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bloodGroup">Blood Group</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="className">Class</label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.className ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.className && <p className="text-red-500 text-sm">{errors.className}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="section">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.section ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.section && <p className="text-red-500 text-sm">{errors.section}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="registerNumber">Register Number</label>
          <input
            type="text"
            id="registerNumber"
            name="registerNumber"
            value={formData.registerNumber}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
      </form>
    </div>
  );
}
