import React, { useState, useEffect } from "react";
import api from "../../constants/axios";
import { SERVER_URL } from "../../constants/urls";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';


function BookingSlot() {
  const [slotA, setSlotA] = useState([]);
  const [slotB, setSlotB] = useState([]);
  const [slotC, setSlotC] = useState([]);
  const [slotD, setSlotD] = useState([]);
  const [slotE, setSlotE] = useState([]);
  const [slotF, setSlotF] = useState([]);

  const [selectedSlotName, setSelectedSlotName] = useState("");
  const [selectedslot, setSelectedSlot] = useState("");
  const [approvedCompanies,setApprovedCompanies]=useState([])
  const [selectedCompanyName,setSelectedCompanyName]=useState('')
  const [smShow, setSmShow] = useState('');
  const [refresh, setRefresh] = useState("")

  const handleClose=()=>{setSmShow(false)}
 

  const getSlots = async () => {
    axios.get(`${SERVER_URL}/getSlots`).then((response) => {
      setSlotA(response.data.slotA);
      setSlotB(response.data.slotB);
      setSlotC(response.data.slotC);
      setSlotD(response.data.slotD);
      setSlotE(response.data.slotE);
      setSlotF(response.data.slotF);
    });
  };

  const getApprovedCompany = async () => {
    await axios.get(`${SERVER_URL}/getApproved`).then((response) => {
      setApprovedCompanies(response.data.response,'data')
      setSmShow(true)
     
    });
  };

  const bookSlot=async()=>{

    if(selectedCompanyName===''){

      alert('Please select a company')
    }else{
      console.log(selectedCompanyName,'daa')
      const details={
        id:selectedslot,
        slot:selectedSlotName,
        company:selectedCompanyName
      }
      axios.post(`${SERVER_URL}/bookSlot`,details).then((response)=>{
        handleClose()
        console.log(response.data)
        getApprovedCompany()
        getSlots()  
        setRefresh(selectedCompanyName)
      })
    }
   
  }

 

  useEffect(() => {
    getSlots();
  }, [refresh]);

 



  return (
    <div className="col-lg-10 d-flex flex-column  justify-content-end pt-4 ms-auto">
      <div className="section-a d-flex justify-content-around flex-wrap">
        {slotA.map((data, index) => {
          return (
            <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
          );
        })}
      </div>
      <hr />
      <hr className="mt-5" />

      <div className="d-flex justify-content-around">
        <div
          className="border d-flex flex-wrap justify-content-around"
          style={{ height: "20rem", width: "15rem" }}
        >
          {slotB.map((data, index) => {
            return ( <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
            );
          })}
        </div>

        <div
          className="border d-flex flex-wrap justify-content-around"
          style={{ height: "20rem", width: "15rem" }}
        >
          {slotC.map((data, index) => {
            return ( <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
            );
          })}
        </div>
        <div
          className="border d-flex flex-wrap justify-content-around"
          style={{ height: "20rem", width: "15rem" }}
        >
          {slotD.map((data, index) => {
            return (
              <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
            );
          })}
        </div>
        <div
          className="border d-flex flex-wrap justify-content-around"
          style={{ height: "20rem", width: "15rem" }}
        >
          {slotE.map((data, index) => {
            return (
              <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
            );
          })}
        </div>
        <div
          className="border d-flex flex-wrap justify-content-around"
          style={{ height: "20rem", width: "15rem" }}
        >
          {slotF.map((data, index) => {
            return (
              <div
              key={index}
              style={{
                width: "5rem",
                height: "5rem",
                backgroundColor: data.isBooked === true ? "grey" : "#ffb000",
              }}
              onClick={!data.isBooked?()=>{setSelectedSlotName(data.name)
                setSelectedSlot(data._id)
                getApprovedCompany()}:''}
            ></div>
            );
          })}
        </div>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Companies 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
         <Form.Select onChange={(e)=>{setSelectedCompanyName(e.target.value)}} aria-label="Default select example">
         (<option value=''>Select a company...</option>)
         {approvedCompanies.map((data,index)=>{return(<option value={data._id}>{data.name}</option>)})}
         
     
    </Form.Select>
    <Button variant="info" onClick={bookSlot}>Book</Button>{' '}
          


      </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookingSlot;
