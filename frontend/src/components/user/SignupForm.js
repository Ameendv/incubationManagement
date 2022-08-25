import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {SERVER_URL} from '../../constants/urls'
import axios from 'axios'

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";



function SignupForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { name, email, password }
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault()
    axios.post(`${SERVER_URL}/users/userSignup`, data).then((response) => {
      if (response.data.status === 'ok') {
        navigate('/login')
      } else { 
        alert("Enter full details")
      }
    })
  }

  return (

    <div className="container d-flex justify-content-around">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form onSubmit={registerUser} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            value={email}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            value={password}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-column justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button> 
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Already a user?{" "}
                          <a className="link-danger" onClick={() => { navigate('/login') }}>
                            Login
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SignupForm
