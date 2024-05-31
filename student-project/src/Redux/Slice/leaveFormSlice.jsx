import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postLeaveReqDetails: [],
  getLeaveRequestDetails: [],
  filterStatus: [],
  findLast: [],
};

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://task-student-management-sxna.vercel.app/getleaveform");
      const data = response.data;
      // console.log(data[0].userId);
      dispatch(getLeaveRequestDetails(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

const leaveFormSlice = createSlice({
  name: "leaveFormSlice",
  initialState,
  reducers: {
    submitLeaveForm: (state, action) => {
      state.postLeaveReqDetails = action.payload;

      axios
        .post("https://task-student-management-sxna.vercel.app/postleaveform", state.postLeaveReqDetails)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error occured");
        });
      //    alert(state.postLeaveReqDetails.reqStuName)
    },
    getLeaveRequestDetails: (state, action) => {
      state.getLeaveRequestDetails = action.payload;
    },
    getleaveStatus: (state, action) => {
      const filStatus = state.getLeaveRequestDetails.filter((data) => {
        return data.reqStuEmail === action.payload.userId;
      });

      if (filStatus) {
        state.filterStatus = filStatus;
        // const getLastObject = (array) => {
        //   return array[array.length - 1];
        // };
        // state.findLast = getLastObject(filStatus);
      } else {
        state.filterStatus = [];
        state.findLast = [];
      }
    },
    findLastObj: (state, action) => {
      const value = action.payload;
        const getLastObject = (array) => {
          return array[array.length - 1];
        };
        state.findLast = getLastObject(value);
        // state.findLast = value[value.length - 1].status;
    },
  },
});

export const {
  submitLeaveForm,
  getLeaveRequestDetails,
  getleaveStatus,
  findLastObj,
} = leaveFormSlice.actions;
export default leaveFormSlice.reducer;
