import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("https://task-student-management-sxna.vercel.app/items");
            const response2 = await axios.get("https://task-student-management-sxna.vercel.app/adminItem");
            const response3 = await axios.get("https://task-student-management-sxna.vercel.app/getstudentregistration");
            const response4 = await axios.get("https://task-student-management-sxna.vercel.app/getattendence");
            const data = response.data;
            const data2 = response2.data;
            const data3 = response3.data;
            const data4 = response4.data;
            // console.log(data[0].userId);
            dispatch(fetchLoginData(data));
            dispatch(fetchAdminData(data2));
            dispatch(fetchStudRegData(data3))
            dispatch(fetchAttendenceData(data4))
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
        adminUser:[],
        studReg:[],
        attendenceDetails:[],
        alertVisible:false
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email=action.payload
            let emailValidate =/^REG\d{4}$/.test(state.email);
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
            let passwordRegex = /^\d{4}-\d{2}-\d{2}$/.test(state.password);
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
                return b.stdId===state.email && b.stdDoB===state.password
              });
            const admin=state.adminUser.find((c)=>{
                return c.adminUSerId===state.email && c.adminPass===state.password
            });                                                                       
            if(state.errors.passStatus === true && state.errors.emailStatus ===true){
                
                // if(user){
                // alert("Login Successfully!!!");
                // state.alertVisible=true;
                // const res=axios.get("http://localhost:3000/getstudentregistration")
                //     const value=res.data;
                //     console.log(value)
                //     const findUser=value.find((d)=>{
                //         return d.registerNumber === user.stdId
                //     });
                //     if(findUser){
                //     sessionStorage.setItem('loggedUser', JSON.stringify(findUser));
                //     }
                if(user){
                    alert("Login Successfully!!!");
                    state.alertVisible=true;
                    const users = state.studReg.find((a)=>{
                        return a.registerNumber===user.stdId
                    });
                    if(users){
                        sessionStorage.setItem('loggedUser', JSON.stringify(users));
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
                    sessionStorage.setItem('adminLogged', JSON.stringify("true"));
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
        fetchStudRegData:(state, action)=>{
            state.studReg=action.payload;
            // console.log(state.adminUser[0].adminUSerId)
        },
        fetchAttendenceData:(state,action)=>{
            state.attendenceDetails=action.payload;
        },
        logout:(state)=>{
            state.adminNavigation=false;
            state.studentNavigation=false;
            state.navigation=false;
            sessionStorage.setItem('adminLogged', JSON.stringify("false"));
            sessionStorage.setItem('adminLogged', JSON.stringify("studentLogged"));
            sessionStorage.setItem('loggedUser', JSON.stringify(""));
            sessionStorage.clear();
        }
    }
});

export const {submitData, setPassword, setEmail, fetchStudRegData, fetchAttendenceData, fetchLoginData,fetchAdminData, logout} = loginSlice.actions
export default loginSlice.reducer;