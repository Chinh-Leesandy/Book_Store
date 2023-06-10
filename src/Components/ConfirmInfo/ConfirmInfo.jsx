import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ComfimInfo.css";
import { success } from "../../Service/toastify";
import { Header } from "../Header/Header";
export const ConfirmInfo = () => {
  const [order, setOrder] = useState([]);
  const [confim, setconfim] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/order`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((err) => console.log(err));
  }, []);
  const totalQuantity = order.length > 0 ? order.reduce((total, item) => total + item.quantity, 0) : 0;
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    console.log(order)
    console.log(confim)
    fetch(`http://localhost:8080/confirm`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(confim),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          success("Cập nhật thành công");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEditing(false);
  };
  const handleChange = (e, key) => {
    const updatedOrder = order.map((item) => ({
      ...item,
      [key]: e.target.value
    }));
    setOrder(updatedOrder);
    setconfim (updatedOrder[0]);
  };
  const { name, phonenumber, email, username, address, dob, payment } =
    order.length > 0 ? order[0] : {};
  return (
    <div>
      <Header/>
      <div className="container">
        <div className="Order">
        <div className="row">
          <nav className="col-9 navbar bg-body-tertiary">
            <ul className="d-flex header_account justify-content-around">
              <li aria-current="page">
                <Link to="/Order" className="link_header">Đơn đặt hàng</Link>
              </li>
              <li style= {{fontSize: "1.2rem"}}>Xác nhận thông tin</li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="row">
            <div className="confim_account d-flex">
              <div className="avata col-1">
                <img
                  src="https://taytou.com/wp-content/uploads/2022/06/hinh-ve-gau-truc-cute-an-la-truc-dang-yeu.jpg"
                  alt=""
                  className="avata_img"
                />
              </div>
              <div className="name_user col-2 d-flex flex-column justify-content-center">
                <span>{name}</span>
                <span>{username}</span>
              </div>
              <div className="confirm_order col-8 d-flex">
                <div className="amout_product  col-3 d-flex flex-column justify-content-center align-items-center">
                  <span>{totalQuantity}</span>
                  <span>Tổng số hàng đã đặt</span>
                </div>
                <div className="amout1_product  col-3 d-flex flex-column justify-content-center align-items-center">
                  <span>99</span>
                  <span>Sản phẩm yêu thích</span>
                </div>
                <div className="amout2_product  col-3 d-flex flex-column justify-content-center align-items-center">
                  <span>1000</span>
                  <span>Điểm tích lũy</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="header_comfim_account d-flex justify-content-between col-9">
              {isEditing ? (
                <h5 style={{ opacity: "0.5" }}>Chỉnh sửa thông tin</h5>
              ) : (
                <h5 style={{ opacity: "0.5" }}>Thông tin của {name}</h5>
              )}
              {isEditing ? (
                <button
                  className="btn btn-outline-success"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger "
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="confim_info_account col-9">
              <div className="confim_username cf">
                <label htmlFor="username" className="col-2">
                  Tên đăng nhập:{" "}
                </label>
                <input
                  className="col-6"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "username")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_name cf">
                <label htmlFor="name" className="col-2">
                  Tên người dùng:{" "}
                </label>
                <input
                  className="col-6"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "name")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_phone cf">
                <label htmlFor="phonenumber" className="col-2">
                  Số điện thoại:{" "}
                </label>
                <input
                  className="col-6"
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  value={phonenumber}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "phonenumber")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_email cf">
                <label htmlFor="email" className="col-2">
                  Địa chỉ Email :{" "}
                </label>
                <input
                  className="col-6"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "email")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_dob cf">
                <label htmlFor="dob" className="col-2">
                  Ngày sinh:{" "}
                </label>
                <input
                  className="col-6"
                  type="date"
                  name="dob"
                  id="dob"
                  value={dob}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "dob")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_address cf">
                <label htmlFor="address" className="col-2">
                  Địa chỉ :{" "}
                </label>
                <input
                  className="col-6"
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(e, "address")}
                  style={{padding : "0.2rem 0.5rem"}}
                />
              </div>
              <div className="confim_payment cf">
                {isEditing ? (
                    <div></div>
                ) : (
                  <>
                  <label htmlFor="payment" className="col-2">
                  Thanh toán :{" "}
                  </label>
                  <input
                    className="col-6"
                    type="text"
                    name="payment"
                    id="payment"
                    value={payment}
                    disabled={!isEditing}
                    style={{padding : "0.2rem 0.5rem"}}
                  />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
};
