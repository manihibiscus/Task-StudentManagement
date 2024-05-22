import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3000/items");
            const data = response.data;
            console.log(data[0].userId);
            dispatch(fetchLoginData(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
};
const loginSlice = createSlice({
    name:"loginSlice",
    initialState:{
        email: "",
        password: "",
        errors: {email:"", password:"", emailStatus:false, passStatus:false},
        navigation:false,
        loginUser:[]
    },
    reducers:{
        setEmail:(state,actions)=>{
            state.email=actions.payload
            let emailValidate = /\S+@\S+\.\S+/.test(state.email);
    
            if(!state.email){
                state.errors.email="Email is required.";
                state.errors.emailStatus=false;
            }
            else{
                state.errors.email="";
            }
            if(state.email){
                if(!emailValidate){
                state.errors.email="Email Invalid";
                state.errors.emailStatus=false;
                }
                else{
                    state.errors.email="";
                    state.errors.emailStatus=true;            
                }
            }
        },
        setPassword:(state,actions)=>{
            state.password=actions.payload
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/.test(state.password);
            if(!state.password){
                state.errors.password="Password is required.";
                state.errors.passStatus=false;
            }
            else{
                state.errors.password="";
            }
            if(state.password){
                if(!passwordRegex){
                state.errors.password="Password Invalid";
                state.errors.passStatus=false;
    
                }
                else{
                    state.errors.password="";
                    state.errors.passStatus=true;
    
                }
            }
            
        },
        submitData:(state, actions)=>{
            actions.payload.preventDefault();
    
            const user=state.loginUser.find((b)=>{
                return b.userId===state.email && b.password===state.password
              });                                                                       
            if(state.errors.passStatus === true && state.errors.emailStatus ===true){
                
                if(user){
                alert("Login Successfully!!!");
                state.email="";
                state.password="";
                state.navigation=true;
                }
                else{
                    alert("Invalid User")
                }
            }
            else{
                alert("Enter All the Fields")
            }
          
        },
        fetchLoginData:(state, actions)=>{
            state.loginUser=actions.payload;
            console.log("Fetch PRoduct" + state.loginUser);
        }
    }
});

export const {submitData, setPassword, setEmail, fetchLoginData} = loginSlice.actions
export default loginSlice.reducer;