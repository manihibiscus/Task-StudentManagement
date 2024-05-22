import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Slice/menuSlice";
import loginReducer from "./Slice/loginSlice";
import registerReducer from './Slice/registerSlice';
const store = configureStore({
    reducer:{
        menu:menuReducer,
        login:loginReducer,
        register:registerReducer
    }
})
export default store;