import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const studentDetailsSlice = createSlice({
    name:"studentDetailsSlice",
    initialState:{updateData:[], deleteId:"", studentAttendence:false, attendData:[], submit:[], updated:""},
    reducers:{
        updateStudentData:(state, action)=>{
            state.updateData=action.payload
            console.log("Updating Data"+state.updateData.userId);
            axios.patch(`http://localhost:3000/updateData/${state.updateData.id}`,state.updateData)
            .then(response=>{
                alert(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        deleteStudentData:(state,action)=>{
            state.deleteId = action.payload
            console.log(state.deleteId);
            axios.delete(`http://localhost:3000/deleteData/${state.deleteId}`)
            .then(response=>{
                alert(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        attendence:(state, actions)=>{
            state.attendData=actions.payload;
            console.log("slice");
            console.log(state.attendData);
        },
        submitStatus:(state)=>{
            state.submit="Submitted";
        },
        attendenceUpdate:(state,action)=>{
            console.log(action.payload[1].editedData);
            axios.patch(`http://localhost:3000/updateattendence/${action.payload[0].id}`,action.payload[1].editedData)
            .then(response=>{
                alert(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            }); 
            state.updated="Updated";
        }
    }
});

export const {updateStudentData, deleteStudentData, attendence, submitStatus, attendenceUpdate} = studentDetailsSlice.actions;
export default studentDetailsSlice.reducer;