import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const registerSlice = createSlice({
    name:"registerSlice",
    initialState:{
    studentName:"", 
    fatherName:"", 
    emailId:"", 
    password:"", 
    errors: {
    studName:"", 
    fName:"", 
    email:"", 
    pass:"", 
    nameStatus:false,
    fatherNameStatus:false,
    emailStatus:false, 
    passStatus:false,
    regStatus:false
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
        registerDetails:(state, action)=>{
            action.payload.preventDefault();
            if(state.errors.nameStatus && state.errors.fatherNameStatus && state.errors.emailStatus && state.errors.passStatus){
                const detail = {
                    studentName:state.studentName,
                    fatherName:state.fatherName,
                    userId: state.emailId,
                    password: state.password,
                };
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
            }
            else{
                alert("Enter all the Fileds");
            }
        }
    }
});

export const {getName,getFatherName,getEmail, getPassword, registerDetails} = registerSlice.actions;
export default registerSlice.reducer;