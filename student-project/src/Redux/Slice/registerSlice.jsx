import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const registerSlice = createSlice({
    name:"registerSlice",
    initialState:{
    studentName:"", 
    fatherName:"", 
    emailId:"", 
    password:"", 
    confrimPassword:"",
    dateOfBirth:"",
    gender:"",
    errors: {
    studName:"", 
    fName:"", 
    email:"", 
    pass:"", 
    conPassword:"",
    dob :"",
    gen:"",
    nameStatus:false,
    fatherNameStatus:false,
    emailStatus:false, 
    passStatus:false,
    conPassStatus:false,
    dobStatus:false,
    regStatus:false,
    genderStatus:false
    },
    },
    reducers:{
        getName:(state,action)=>{
            state.studentName=action.payload;
            if(!state.studentName){
                state.errors.studName="Name is Required"
                state.errors.nameStatus=false;
            }
            else
            {
            state.errors.studName=""; 
            }
            if(state.studentName){
                state.errors.studName="";
                state.errors.nameStatus=true;
            }
        },
        getFatherName:(state,action)=>{
            state.fatherName=action.payload;
            if(!state.fatherName){
                state.errors.fName="Father Name is Required"
                state.errors.fatherNameStatus=false;
            }
            else
            {
            state.errors.fName=""; 
            }
            if(state.fatherName){
                state.errors.fName="";
                state.errors.fatherNameStatus=true;
            }
        },
        getEmail:(state,action)=>{
            state.emailId = action.payload;
            let emailValidate = /\S+@\S+\.\S+/.test(state.emailId);
            if(!state.emailId){
            state.errors.email="Email is required.";
            state.errors.emailStatus=false;
            }
            else{
            state.errors.email="";
            }
            if(state.emailId){
            if(!emailValidate){
            state.errors.email="Email Invalid";
            state.errors.emailStatus=false;
            }
            else{
                state.errors.email="";
                state.errors.emailStatus=true;            
            }
         }
        },
        getPassword:(state,action)=>{
            state.password=action.payload;
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/.test(state.password);
        if(!state.password){
            state.errors.pass="Password is required.";
            state.errors.passStatus=false;
        }
        else{
            state.errors.pass="";
        }
        if(state.password){
            if(!passwordRegex){
            state.errors.pass="Password Invalid";
            state.errors.passStatus=false;
            }
            else{
                state.errors.pass="";
                state.errors.passStatus=true;
            }
        }
        },
        getConfrimPassword:(state, action)=>{
            state.confrimPassword=action.payload;
            // if(state.confrimPassword !== state.password){
            //     state.errors.conPassword="Your Password Not Match";
            // }
            // else{
            //     state.errors.conPassword="";
            //     state.conPassStatus=true;
            // }
            if(!state.confrimPassword){
                state.errors.conPassword="Please Re-Enter the Password";
                state.errors.conPassStatus=false;
            }
            else{
                state.errors.conPassword="";
            }
            if(state.confrimPassword){
                if(state.confrimPassword != state.password){
                state.errors.conPassword="Your Password Not Match";
                state.errors.conPassStatus=false;
                }
                else{
                    state.errors.conPassword="";
                    state.errors.conPassStatus=true;
                }
            }
        },
        getDoB:(state,action)=>{
            state.dateOfBirth=action.payload
            if(!state.dateOfBirth){
                state.errors.dob="Please Enter your Date of Birth"
                state.errors.dobStatus=false;
            }
            else
            {
            state.errors.dob=""; 
            }
            if(state.dateOfBirth){
                state.errors.dob="";
                state.errors.dobStatus=true;
            }        
        },
        getGender:(state,action)=>{
            state.gender=action.payload
            if(!state.gender){
                state.errors.gen="Please Choose gender"
                state.errors.genderStatus=false;
            }
            else
            {
            state.errors.gen=""; 
            }
            if(state.gender){
                state.errors.gen="";
                state.errors.genderStatus=true;
            }  
        },
        registerDetails:(state, action)=>{
            action.payload.preventDefault();
            if(state.errors.nameStatus && state.errors.fatherNameStatus && state.errors.emailStatus && state.errors.passStatus
                && state.errors.conPassStatus && state.errors.dobStatus && state.errors.genderStatus
            ){
                const detail = {
                    studentName:state.studentName,
                    fatherName:state.fatherName,
                    dateOfBirth:state.dateOfBirth,
                    userId: state.emailId,
                    password: state.confrimPassword,
                    gender:state.gender
                };
                state.regStatus=true;

                console.log(detail);
                
                axios.post('http://localhost:3000/postItems', detail)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Error occured");
                    });
                        state.studentName=""
                        state.fatherName=""
                        state.emailId=""
                        state.password=""
                        state.confrimPassword=""
                        state.dateOfBirth=""
            }
            else{
                alert("Enter all the Fileds");
            }
        }
    }
});

export const {getName,getFatherName,getEmail, getPassword, getConfrimPassword, registerDetails, getDoB, getGender} = registerSlice.actions;
export default registerSlice.reducer;