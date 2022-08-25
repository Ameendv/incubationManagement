import React, { useState,useContext } from "react";
import {UserContext} from '../../context/context'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { SERVER_URL } from "../../constants/urls"; 
import "./styles/RegistrationForm.css";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function RegistrationForm() {
  const initialValue = {
    name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    number: "",
    companyName: "",
    teamAndBackground: "",
    companyAndProduct: "",
    problem: "",
    solution: "",
    proposition: "",
    competitors: "",
    revenueModel: "",
    marketSizeOfProduct: "",
    marketPlan: "",
    incubationType: "",
    proposal: "",
  };

  const [formValues, setformValues] = useState(initialValue);
  const [logo, setLogo] = useState();
  const {userDetails,setUserDetails}=useContext(UserContext)
  const navigate=useNavigate();
  console.log(userDetails,'at homepage')

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleImage = (e) => {
    e.preventDefault();
    setLogo(e.target.files[0]);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

//checking all questions are answered

    if (
      !logo ||
      formValues.address === " " ||
      formValues.city === " " ||
      formValues.companyAndProduct === " " ||
      formValues.companyName === " " ||
      formValues.competitors === " " ||
      formValues.email === " " ||
      formValues.incubationType === " " ||
      formValues.marketPlan === " " ||
      formValues.marketSizeOfProduct === " " ||
      formValues.name === " " ||
      formValues.number === " " ||
      formValues.problem === " " ||
      formValues.proposal === " " ||
      formValues.proposition === " " ||
      formValues.revenueModel === " " ||
      formValues.solution === " " ||
      formValues.solution === " " ||
      formValues.state === " " ||
      formValues.teamAndBackground === " "
    ) {
        alert('Please fill the form completely ')
    }else{
        const data = new FormData()
        data.append('logo',logo)
        data.append('data',JSON.stringify(formValues))
        data.append('email',userDetails.email)

        const config={
            headers:{
                'Content-Type':'mulipart/form-data'
            }
        }

        axios.post(`${SERVER_URL}/users/registration`,data,config).then((response)=>{
          if(response.data.status==='Duplicate form submission'){
            alert(response.data.status)
          }
          else if(response.data.status){
            alert('Your form submitted succesfully ,please wait for approval')
            navigate('/process')
          }
        })


        
    }


  };

  return (
    <div className="container mt-5 pb-3" style={{ width: "60%" }}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-wrap">
          <div className="d-flex justify-content-around mt-4 flex-wrap">
            <div className="form-group">
              
              <TextField id="outlined-basic" label="Name" variant="outlined" name="name" onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label className="">
                Address<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="address"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <div className="d-flex justify-content-around mt-4 flex-wrap">
            <div className="form-group">
              <label className="">
                City<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="">
                State<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter state"
                name="state"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <div className="d-flex justify-content-around mt-4 flex-wrap">
            <div className="form-group">
              <label className="">
                Email<sup className="text-danger">*</sup>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="">
                Phone no<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="number"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <div className="d-flex justify-content-around mt-4 flex-wrap">
            <div className="form-group">
              <label className="">
                Company Name<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="companyName"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="">
                Company Logo<sup className="text-danger">*</sup>
              </label>
              <input
                type="file"
                name='logo'
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                style={{ width: "82%" }}
                onChange={handleImage}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="">
            Describe Your Team and Background ?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="teamAndBackground"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            Describe your company and products ?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="companyAndProduct"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            Describe problem you are trying to solve ?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="problem"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            What is unique about your solution ?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="solution"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            What is your value proposition htmlFor the customer ?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="proposition"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            Who are your competitors and what is your competetive adantage?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="competitors"
            onChange={handleChange}
          ></textarea>
        </div>
        <label className="">
          Explain your revenue model?<sup className="text-danger">*</sup>
        </label>
        <div className="mt-4">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="revenueModel"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            What is the potential market size of the product?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="marketSizeOfProduct"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="">
            How do you market or plan to market your products and services?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="marketPlan"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex  flex-column justify-content-start mt-4 me-auto">
          <label className="">
            Type of incubation needed?<sup className="text-danger">*</sup>
          </label>
          <div className="form-group form-check">
            <input
              type="radio"
              className="form-check-input"
              id="exampleCheck1"
              name="incubationType"
              value="physical"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Physical incubation
            </label>
          </div>
          <div className="form-group form-check">
            <input
              type="radio"
              className="form-check-input"
              id="exampleCheck1"
              value="virtual"
              name="incubationType"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Virtual incubation
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="">
            Update a detailed business proposal?
            <sup className="text-danger">*</sup>
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols=""
            name="proposal"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{ backgroundColor: "#fd993e" }}
          className="btn  mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
