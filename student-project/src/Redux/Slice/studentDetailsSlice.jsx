import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const studentDetailsSlice = createSlice({
    name:"studentDetailsSlice",
    initialState:{updateData:[], deleteId:"", studentAttendence:false, attendData:[]},
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
            // const date = new Date();
            // var today = date.toISOString().split("T")[0];
            // const available=actions.payload.find((b)=>{
            // return b.date===today;
            // });
            // if(available){
            //     console.log(available);
            // }
            console.log("slice");
            console.log(state.attendData);
        }
    }
});

export const {updateStudentData, deleteStudentData, attendence} = studentDetailsSlice.actions;
export default studentDetailsSlice.reducer;