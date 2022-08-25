import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {SERVER_URL} from '../../constants/urls'
import axios from 'axios'

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const data={
    email,
    password
  }



  const loginAdmin = async(e)=>{
    e.preventDefault()
     axios.post(`${SERVER_URL}/login`,data).then((response)=>{
      if(response.data.status==='ok'){
        
        
        
        localStorage.setItem('adminData',JSON.stringify(response.data.token))
        navigate('/dashboard')
      }else if(response.data.status==='password invalid'){ 
        alert('password incorrect')
      }else{
        alert('invalid user')
      }
    })
    
  }

  return (

    
    <div className="container h-custom pt-5 border pb-3">
      

    <div className="flex-row d-flex justify-content-center align-items-center h-100  border pb-4">
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
        <h1>Admin Login</h1>
        <form onSubmit={loginAdmin} className=' '>
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
           
          </div>
        </form>
      </div>
      
    </div>
  </div>
  )
}

export default LoginForm
