import React, { useState, useEffect } from "react";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
export const OrderAdmin = () => {
  const [allOrder, setallOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/allorder`)
      .then((response) => response.json())
      .then((data) => setallOrder(data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const handleView = (id) =>{
    navigate (`/OrderAdmin/${id}`);
  }
  return (
    <div>
      <HeaderAdmin />
      <div className="container">
        <table className = "table table-striped text-center">
          <thead>
            <tr className = "table-secondary">
              <th>Title</th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.name}</td>
                <td>{item.phonenumber}</td>
                <td>{item.address}</td>
                <td>
                <div className="btn_home d-flex">
                      <div className="btn_view">
                        <button
                          onClick={() => handleView(item.id)}
                          className="btn btn-outline-warning"
                        >
                          <i className="bi bi-eye"></i>View
                        </button>
                      </div>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
