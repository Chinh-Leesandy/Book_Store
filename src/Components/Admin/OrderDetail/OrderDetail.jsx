import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeaderAdmin } from '../HeaderAdmin/HeaderAdmin';
import { success } from '../../../Service/toastify';
export const OrderDetail = () => {
  const params = useParams();
  const id = params.id;
  const [orderDetail, setOrderDetail] = useState({});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();  
  useEffect(() => {
    fetch(`http://localhost:8080/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrderDetail(data);
        setStatus(data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSave = () => {
    console.log(status)
    fetch(`http://localhost:8080/status/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({status}),
      headers: {
        "Content-Type": "application/json; charset =UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          success("Cập nhập trạng thái thành công");
          setTimeout(() => {
            navigate(`/OrderAdmin`);
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <HeaderAdmin />
      <div className="container d-flex">
        <div className="book-cover">
          <img src={orderDetail.bookcover} alt="Book Cover" style = {{height: "60vh"}}/>
        </div>
        <div className="order-details">
          <h3>{orderDetail.title}</h3>
          <p>Quantity: {orderDetail.quantity}</p>
          <p>Price: {(orderDetail.price / 1).toLocaleString("vi-VN")} đ</p>
          <p>Name: {orderDetail.name}</p>
          <p>Dob: {orderDetail.dob}</p>
          <p>Address: {orderDetail.address}</p>
          <p>Phone Number: {orderDetail.phonenumber}</p>
          <p>Email: {orderDetail.email}</p>
          <div className = "d-flex">
            <label>Status:</label>
            <div className="d-flex justify-content-around" style = {{width: "100%"}}>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Pendding"
                  checked={status === "Pendding"}
                  onChange={handleStatusChange}
                />
                Pendding
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Accept"
                  checked={status === "Accept"}
                  onChange={handleStatusChange}
                />
                Accept
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Reject"
                  checked={status === "Reject"}
                  onChange={handleStatusChange}
                />
                Reject
              </label>
            </div>
          </div>
        </div>
      </div>
        <div className="btn_order_detail">
            <button className = "btn btn-outline-success" onClick = {handleSave}>Save</button>
        </div>
    </div>
  );
};
