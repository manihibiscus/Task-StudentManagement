
import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { fetchData } from "../Redux/Slice/loginSlice";
export const Student = () => {
    const studentDetails = useSelector((state)=>state.login.loginUser);
    const dispatch = useDispatch();
    // console.log(studentDetails);
    useEffect(()=>{
        dispatch(fetchData());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
  return (
    <>
        
        {studentDetails && (
            studentDetails.map((student)=>(
                    // <li key={student._id}>{student.userId}</li>
                <table key={student._id}>
                    <thead>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{student.studentName}</td>
                            <td>{student.fatherName}</td>
                            <td>{student.userId}</td>
                        </tr>
                    </tbody>
                </table>
            ))
        )}
    </>
  )
}
