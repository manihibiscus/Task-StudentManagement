import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    postLeaveReqDetails:[],
    getLeaveRequestDetails:[]
}

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3000/getleaveform");
            const data = response.data;
            // console.log(data[0].userId);
            dispatch(getLeaveRequestDetails(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
};

const leaveFormSlice=createSlice({
    name:"leaveFormSlice",
    initialState,
    reducers:{
        submitLeaveForm:(state,action)=>{
           state.postLeaveReqDetails=action.payload;

           axios.post('http://localhost:3000/postleaveform', state.postLeaveReqDetails)
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert("Error occured");
                    });
        //    alert(state.postLeaveReqDetails.reqStuName)
        },
        getLeaveRequestDetails:(state,action)=>{
            state.getLeaveRequestDetails=action.payload
        }
    }
});

export const {submitLeaveForm, getLeaveRequestDetails} = leaveFormSlice.actions;
export default leaveFormSlice.reducer;