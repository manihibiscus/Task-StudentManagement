import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3000/items");
            const response2 = await axios.get("http://localhost:3000/adminItem");
            const data = response.data;
            const data2 = response2.data;
            // console.log(data[0].userId);
            dispatch(fetchLoginData(data));
            dispatch(fetchAdminData(data2));
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
        adminNavigation:false,
        studentNavigation:false,
        loginUser:[],
        adminUser:[]
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email=action.payload
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
        setPassword:(state,action)=>{
            state.password=action.payload
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
        submitData:(state, action)=>{
            action.payload.preventDefault();
    
            const user=state.loginUser.find((b)=>{
                return b.userId===state.email && b.password===state.password
              });
            const admin=state.adminUser.find((c)=>{
                return c.adminUSerId===state.email && c.adminPass===state.password
            });                                                                       
            if(state.errors.passStatus === true && state.errors.emailStatus ===true){
                
                if(user){
                alert("Login Successfully!!!");
                const user = state.loginUser.find((a)=>{
                    return a.userId===state.email
                });
                if(user){
                    sessionStorage.setItem('loggedUser', JSON.stringify(user));
                }

                state.email="";
                state.password="";
                state.navigation=true;
                state.studentNavigation=true;
                sessionStorage.setItem('studentLogged', JSON.stringify("true"));

                }
                else if(admin){
                    alert("Login Successfully-Admin!!!");
                    state.email="";
                    state.password="";
                    state.navigation=false;
                    state.adminNavigation=true;
                    sessionStorage.setItem('adminLogged', JSON.stringify(true));
                 }
                else{
                    alert("Invalid User");
                }
            }
            else{
                alert("Enter All the Fields")
            }
          
        },
        fetchLoginData:(state, action)=>{
            state.loginUser=action.payload;
            // console.log("Fetch PRoduct" + state.loginUser);
        },
        fetchAdminData:(state, action)=>{
            state.adminUser=action.payload;
            // console.log(state.adminUser[0].adminUSerId)
        },
        logout:(state)=>{
            state.adminNavigation=false
            sessionStorage.setItem('adminLogged', JSON.stringify(false));
            sessionStorage.clear();
        }
    }
});

export const {submitData, setPassword, setEmail, fetchLoginData,fetchAdminData, logout} = loginSlice.actions
export default loginSlice.reducer;