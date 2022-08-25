import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../constants/axios";




function Applicants() {
  const [newList, setNewList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [status, setStatus] = useState("");
  const [view, setView] = useState({});
  const [formData, setFormData] = useState({});

  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const getNewList = async () => {
    await api.get("/getApplicants").then((response) => {
      console.log(response.data);
      setNewList(response.data.new);
      setPendingList(response.data.all);
    });
  };

const getCompanyDetails=async (id)=>{
  const details={
    id:id
  }
  const data= await api.post(`/getCompanyDetails`,details)

  setView(data.data)
  setFormData(data.data.form)
setLgShow(true)
  

}

  
  // const getPendingList=async()=>{
  //  await axios.get(`${SERVER_URL}/getPendings`).then((response)=>{
  //   setPendingList(response.data.response)
  // })
  // }

  const changeStatus = async (id, status) => {
    const data = { id, status };
    await api.put(`/changeStatus`, data).then((response) => {
      getNewList();
      setStatus("pending");
    });
  };

  const approve = async (id) => {
    const approveId = { id };
    api.put("/approveStatus", approveId).then((response) => {
      getNewList();
      setStatus("approved");
    });
  };

  const decline = async (id) => {
    const declineId = { id };
    api.put("/declineStatus", declineId).then((response) => {
      if (response.data.status === "ok") {
        getNewList();
        setStatus("declined");
      }
    });
  };

  useEffect(() => {
    getNewList();
    
  }, [status]);

  return (
    <div className="d-flex justify-content-end flex-column ms-auto col-lg-10">
      <div className="col-xs-10 col-lg-10">
        <h2 className="text-success">New applicants</h2>
        <table id="example" className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company details</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newList.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="view"
                      onClick={()=>{
                        getCompanyDetails(data._id)
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-warning"
                      value="pending"
                      onClick={() => {
                        setStatus("pending");
                        changeStatus(data._id, data.status);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-xs-10 col-lg-10">
        <h2 className="text-success">Pending Applicants List</h2>
        <table id="example" className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Company details</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pendingList.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-outline-outline"
                      value="Open"
                    />
                  </td>
                  <td>
                    {data.status === "approved" &&
                    data.status !== "declined" ? (
                      <input
                        type="button"
                        className="btn btn-outline-warning"
                        disabled
                        value="Approved"
                      />
                    ) : (
                      <input
                        type="button"
                        className="btn btn-warning "
                        value="Approve"
                        onClick={() => {
                          approve(data._id);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {data.status === "declined" &&
                    data.status !== "approved" ? (
                      <input
                        type="button"
                        className="btn btn-outline-dark"
                        disabled
                        value="Declined"
                      />
                    ) : (
                      <input
                        type="button"
                        className="btn btn-secondary"
                        value="Decline"
                        onClick={() => {
                          decline(data._id);
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {view.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <table>
            
            <thead>
            <tr>
              <th>Data</th>
              <th>Value</th>
              </tr>
            </thead>
              
              
           
            <tbody>
              <tr>
                <td>Name</td>
                <td>{view.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{view.email}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{formData.address}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{formData.city}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{formData.state}</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>{formData.number}</td>
              </tr>
              <tr>
                <td>Background</td>
                <td>{formData.teamAndBackground}</td>
              </tr>
              <tr>
                <td>Product</td>
                <td>{formData.companyAndProduct}</td>
              </tr>
              <tr>
                <td>Problem to solve</td>
                <td>{formData.problem}</td>
              </tr>
              <tr>
                <td>Solution</td>
                <td>{formData.solution}</td>
              </tr>
              <tr>
                <td>Proposition</td>
                <td>{formData.proposition}</td>
              </tr>
              <tr>
                <td>Competitors</td>
                <td>{formData.competitors}</td>
              </tr>
              <tr>
                <td>Revenue Model</td>
                <td>{formData.revenueModel}</td>
              </tr>
              <tr>
                <td>Market size</td>
                <td>{formData.marketSizeOfProduct}</td>
              </tr>
              <tr>
                <td>Plan</td>
                <td>{formData.marketPlan}</td>
              </tr>
              <tr>
                <td>Type of Incubation</td>
                <td>{formData.incubationType}</td>
              </tr>
              <tr>
                <td>Proposal</td>
                <td>{formData.proposal}</td>
              </tr>
            </tbody>
          </table>  
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Applicants;
