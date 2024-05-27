import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    leaveReqDetails:[]
}
const leaveFormSlice=createSlice({
    name:"leaveFormSlice",
    initialState,
    reducers:{
        submitLeaveForm:(state,action)=>{
           state.leaveReqDetails=action.payload;

           axios.post('http://localhost:3000/postleaveform', state.leaveReqDetails)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Error occured");
                    });
        //    alert(state.leaveReqDetails.reqStuName)
        }
    }
});

export const {submitLeaveForm} = leaveFormSlice.actions;
export default leaveFormSlice.reducer;