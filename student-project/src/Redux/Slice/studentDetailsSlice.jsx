import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const studentDetailsSlice = createSlice({
    name:"studentDetailsSlice",
    initialState:{updateData:[]},
    reducers:{
        updateStudentData:(state, action)=>{
            state.updateData=action.payload
            console.log("Updating Data"+state.updateData.userId);
            axios.patch(`http://localhost:3000/updateData/${state.updateData.id}`,state.updateData)
            .then(response=>{
                alert(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
});

export const {updateStudentData} = studentDetailsSlice.actions;
export default studentDetailsSlice.reducer;