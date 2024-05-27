import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Slice/menuSlice";
import loginReducer from "./Slice/loginSlice";
import registerReducer from './Slice/registerSlice';
import studentDetailsReducer from './Slice/studentDetailsSlice';
import leaveReqReducer from './Slice/leaveFormSlice'
const store = configureStore({
    reducer:{
        menu:menuReducer,
        login:loginReducer,
        register:registerReducer,
        studentUpdateDelete:studentDetailsReducer,
        leaveReq:leaveReqReducer
    }
})
export default store;