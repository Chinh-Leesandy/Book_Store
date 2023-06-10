import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../Header/Header";
export const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <div>
      <Header />
      {/* <h3 className="text-center">Shopping Cart</h3> */}
      {cartItems.length === 0 ? (
        <div className="empty d-flex justify-content-center">
          <img
            src="https://shopcohai.com/public/images/empty-cart.png"
            alt=""
            style={{ width: "80vw", height: "60vh" }}
          />
        </div>
      ) : (
        <div style={{ marginLeft: "3rem" }}>
          <div className="row row-cols-2">
            {cartItems.map((item) => (
              <div key={item.id} className="col" style={{ padding: "1rem" }}>
                <div className="d-flex">
                  <div className="avt col-4">
                    <img src={item.bookcover} alt="" className="card-img-top" />
                  </div>
                  <div className="content_cart col-8 d-flex flex-column justify-content-center">
                    <p>Title: {item.title}</p>
                    <p>Author: {item.author}</p>
                    <p>Price: {(item.price / 1).toLocaleString("vi-VN")} đ</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Tổng tiền:{" "}
                      {((item.price * item.quantity) / 1).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
