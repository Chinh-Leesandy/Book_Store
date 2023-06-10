import React from 'react'
import "./Order.css"
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { success, error } from '../../Service/toastify';
import { Header } from '../Header/Header';
export const Order = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/order`)
      .then((response) => response.json())
      .then((data) => setOrderList(data))
      .catch((err) => console.log(err));
  }, []);
  const totalAmount = orderList.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/BookView/${id}`);
  }
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      fetch(`http://localhost:8080/deleteorder/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            error("Xóa sách không thành công.");
          } else {
            success("Xóa sách thành công");
            navigate("/Order");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      window.location.reload();
    } else {
      navigate("/Order");
    }
  }
  return (
    <div>
        <Header/>
        <div className="container">
          <div className="Order">
            <div className="row">
              <nav className='col-11 navbar bg-body-tertiary'>
                <ul className='d-flex header_account justify-content-around'>
                  <li style= {{fontSize: "1.2rem"}}>Đơn đặt hàng</li>
                  <li aria-current="page"><Link to= "/ConfirmInfo" className="link_header">Xác nhận thông tin</Link></li>
                </ul>
              </nav>
            </div>
            <div className="row">
              {orderList.map((order) => (
                <div className="product_order">
                  <div className="product_item d-flex">
                    <div className="product_cover col-1">
                      <img src={order.bookcover} alt="" className = "card-img-top" />
                    </div>
                    <div className="info_product col-5 d-flex flex-column justify-content-center">
                      <div className="title_product">
                        <span>{order.title}</span>
                      </div>
                      <div className="price_product">
                        <span>{(order.price / 1).toLocaleString("vi-VN")} đ x {order.quantity}</span>
                      </div>
                      <div className="total_product">
                        <span>{(order.price * order.quantity / 1).toLocaleString("vi-VN")} đ</span>
                      </div>
                    </div>
                    <div className="status d-flex justify-content-center">
                      <span style = {{paddingTop: "0.5rem"}}>Trạng thái: {order.status}</span>
                    </div>
                    <div className="action_product col-3">
                    <div className="btn_home d-flex align-items-center" style={{width: "80%"}}>
                      <div className="btn_view">
                        <button
                          onClick={() => handleView(order.id_book)}
                          className="btn btn-outline-warning"
                        >
                          <i className="bi bi-eye"></i>View
                        </button>
                      </div>
                      <div className="btn_delete">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="btn btn-outline-danger"
                        >
                          <i className="bi bi-trash3"></i>Delete
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="total d-flex justify-content-between col-9">
                <span>Tổng thành tiền</span>
                <span>{totalAmount.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
