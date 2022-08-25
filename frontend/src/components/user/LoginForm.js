import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom' 
import axios from 'axios'
import {UserContext} from '../../context/context'
import { SERVER_URL } from '../../constants/urls'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userDetails,setUserDetails}=useContext(UserContext)
  const navigate = useNavigate();

  const data={
    email,
    password
  }

  async function loginUser(e) {
    e.preventDefault();
    await axios.post(`${SERVER_URL}/users/login`,data).then((response)=>{
      console.log(response.data,'front end')
      if(response.data.token){
        localStorage.setItem('token',response.data.token)
        alert('Login successfull')
        setUserDetails(response.data.user)
        console.log(userDetails,'details')
        navigate('/userHome')

      }
      else if(response.data.status==='Incorrect password'){
        alert(response.data.status)
      }
      else{
        alert('Email id not registered ')
      }
    })
 
    
  }

  return (
    <div className="container-fluid h-custom pt-5">
      

      <div className="flex-row d-flex justify-content-center align-items-center h-100 ">
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
          <form onSubmit={loginUser}>
            <div className="form-outline mb-4">
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="Email"
                className="form-control form-control-lg"
              />
              <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                placeholder="Password"
                className="form-control form-control-lg"
              />
              <label className="form-label">Password</label>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit"className="btn btn-primary btn-lg">
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <a className="link-danger" onClick={()=>{navigate('/signup')}}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default LoginForm
