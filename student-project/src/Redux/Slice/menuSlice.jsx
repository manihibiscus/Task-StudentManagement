import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name:"menuSLice",
    initialState:{menuToggle:false},
    reducers:{
        clickMenu:(state)=>{
            state.menuToggle=!state.menuToggle
        }
    }
});

export const {clickMenu} = menuSlice.actions;
export default menuSlice.reducer;