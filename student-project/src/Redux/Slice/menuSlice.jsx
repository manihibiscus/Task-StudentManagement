import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name:"menuSLice",
    initialState:{menuToggle:false, adminToggle:false},
    reducers:{
        clickMenu:(state)=>{
            state.menuToggle=!state.menuToggle
        },
        adminMenu:(state,action)=>{
            action.payload.preventDefault();
            state.adminToggle=!state.adminToggle
        }
    }
});

export const {clickMenu, adminMenu} = menuSlice.actions;
export default menuSlice.reducer;