import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Slice/menuSlice";
import loginReducer from "./Slice/loginSlice"
const store = configureStore({
    reducer:{
        menu:menuReducer,
        login:loginReducer
    }
})
export default store;