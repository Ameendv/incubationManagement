import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import api from "../../constants/axios";
import ProgressBar from "react-bootstrap/ProgressBar";

function RecordsList() {
  const [applicants, setApplicants] = useState([]);

  const getUsers = async () => {
    const users = await api.get("/getApplicants");
    setApplicants(users.data.all);
    console.log(applicants);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="col-lg-12 d-flex justify-content-center">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Details</th>
            <th>Registration Approved</th>
            <th>Processing</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td colSpan={3}>
                  {data.status === "new" ? (
                    <ProgressBar  variant="success" now={35} key={1} />
                  ) : data.status === "pending" ? (
                    <ProgressBar>
                      <ProgressBar  variant="primary" now={50} key={1} />
                      <ProgressBar variant="warning" now={15} key={2} />
                    </ProgressBar>
                  ) : data.status=='approved'?(
                    <ProgressBar>
                      <ProgressBar  variant="primary" now={50} key={1} />
                      <ProgressBar variant="warning" now={28} key={2} />
                      <ProgressBar  variant="success" now={22} key={3} />
                    </ProgressBar>
                  ):<ProgressBar  variant="danger" label='Rejected' now={100} key={3} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default RecordsList;
