import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { success, error } from "../../Service/toastify";
import StarRating from "../Start/StarRating";
import "./BookView.css";
import { Header } from "../Header/Header";
export const BookView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [BookItem, setBookItem] = useState({});
  const [quantitys, setQuantity] = useState(1);
  const [order, setOrder] = useState({});
  const [comment, setComment] = useState([]);
  const [content, setcontent] = useState("");
  const [newass, setNewass] = useState({});
  const [ass, setAss] = useState([]);
  const commentBookRef = useRef(null);
  const assessBookRef = useRef(null);
  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBookItem(data))
      .catch((err) => console.log(err));
      CheckLogin()
  }, {});
  useEffect(() => {
    fetch(`http://localhost:8080/cmt/${id}`)
      .then((response) => response.json())
      .then((data) => setComment(data))
      .catch((err) => console.log(err));
      fetch(`http://localhost:8080/ass/${id}`)
      .then((response) => response.json())
      .then((data) => setAss(data))
      .catch((err) => console.log(err));
  }, []);
  const increaseQuantity = () => {
    if (quantitys < 999) {
      setQuantity(quantitys + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantitys > 1) {
      setQuantity(quantitys - 1);
    }
  };
  const AddOrder = () => {
    const newOrder = {
      quantity: quantitys,
      id_book: id,
    };
    if (!isLogin){
      navigate (`/Login`);
    }
    else {
      fetch(`http://localhost:8080/order/add`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json; charset =UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log(order);
            success("Đặt hàng thành công");
            setTimeout(() => {
              navigate(`/Order`);
            }, 1000);
          } else {
            error("Đặt hàng không thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          error("Đặt hàng không thành công");
        });
    }
  };
  useEffect(() => {
    setOrder({ quantity: quantitys, id_book: id });
  }, [quantitys, id]);
  const handleSend = () => {
    fetch(`http://localhost:8080/addcmt/${id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json; charset =UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          success("Bạn vừa mới thêm một bình luận");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        error("Đã xảy ra lỗi");
      });
  };
  const handleSendAss = () => {
    console.log(newass);
    fetch(`http://localhost:8080/addass/${id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(newass),
      headers: {
        "Content-Type": "application/json; charset =UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          success("Bạn vừa mới đánh giá 1 sản phẩm");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        error("Đã xảy ra lỗi");
      });
  };
  const handleCmt = (e) => {
    if(!isLogin){
      navigate(`/Login`);
    }
    else{
      e.preventDefault(); 
      commentBookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAss = (e) => {
    if(!isLogin){
      navigate(`/Login`);
    }
    else{
      e.preventDefault(); 
      assessBookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isLogin, setisLogin] = useState(false);
  const CheckLogin = () => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('role') == "user"){
      setisLogin(true);
    }
  }
  return (
    <div>
      <Header/>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img className="card-img-top" src={BookItem.bookcover} alt="" />
          </div>
          <div className="col-6">
            <h3 className="fs-4">{BookItem.title}</h3>
            <div className="info d-flex justify-content-between">
              <div className="author-category">
                <p>Tác giả: {BookItem.author}</p>
                <p>Thể loại: {BookItem.nameCategory}</p>
              </div>
              <div className="pageN-date">
                <p>Ngày Xuất bản: {BookItem.releasedate}</p>
                <p>Số trang sách: {BookItem.pageNumber}</p>
              </div>
            </div>
            <p
              style={{
                fontSize: "1.3rem",
                color: "sandybrown",
                paddingTop: "1rem",
              }}
            >
              {(BookItem.price / 1).toLocaleString("vi-VN")}đ
            </p>
            <div className="quantity_book d-flex align-items-center">
              <label for="qty" style={{ fontWeight: "500" }}>
                Số lượng:{" "}
              </label>
              <div class="product-view-quantity-box-block">
                <button className="btn-subtract-qty" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  type="text"
                  name="qty"
                  id="qty"
                  max="999"
                  min="1"
                  align="center"
                  value={quantitys}
                  readOnly
                  className="input-text qty"
                />
                <button className="btn-add-qty" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
            <div className="btn_bookview">
              {/* <button className="btn_cart_bookview">
                <i class="bi bi-cart-dash"></i> Thêm vào giỏ hàng
              </button> */}
              <button className="btn_order_bookview" onClick={AddOrder}>
                <i class="bi bi-basket2"></i> Đặt hàng
              </button>
            </div>
            <div className="link_cmt_ass d-flex justify-content-around col-8" style={{padding : "1.2rem 0.5rem"}}>
              <a style={{color : "rgb(255 8 8)"}} href="#" onClick={handleCmt}> Bình luận sản phẩm</a>
              <a style={{color : "rgb(255 8 8)"}} href="#" onClick={handleAss}> Đánh giá sản phẩm</a>
            </div>
          </div>
        </div>
        <br />
        <hr style={{ width: "90%", height: "3px", margin: "auto" }} />
        <div className="row">
          <div className="infomation_book col-10">
            <h5 style={{ opacity: "0.75" }}>Mô tả sản phẩm</h5>
            <p className="descriptions">
              Mô tả chi tiết: {BookItem.bookdescription}
            </p>
          </div>
        </div>
        <hr style={{ width: "90%", height: "2px", margin: "auto" }} />
        <div className="row">
          <div className="comment_book col-10 " ref={commentBookRef}>
            <h5 style={{ opacity: "0.75" }}>Bình luận </h5>
            {isLogin && (
              <div className="add_comment col-10">
              <span style={{ padding: "0.2rem" }}>Thêm bình luận</span>
              <div className="add_cmt_content input">
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                ></textarea>
              </div>
              <div
                className="btn_send d-flex justify-content-end"
                style={{ padding: "0.2rem" }}
              >
                <button
                  onClick={handleSend}
                  className="btn btn-outline-success"
                >
                  Send
                </button>
              </div>
            </div>
            )}
            <div className="comment">
              {comment.map((commentItem) => (
                <div className="comment_user d-flex" key={commentItem.id}>
                  <div className="cmt_avata col-1">
                    <i
                      class="bi bi-person-circle"
                      style={{ fontSize: "2.5rem", color: "#c6c6c6" }}
                    ></i>
                  </div>
                  <div className="cmt_user d-flex flex-column justify-content-center">
                    <span style={{ fontWeight: "400", padding: "0.2rem" }}>
                      {commentItem.username}
                    </span>
                    <div className="cmt_content">
                      <p>{commentItem.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr style={{ width: "100%", height: "2px", margin: "auto" }} />
        <div className="row">
          <div className="assess_book col-10" ref={assessBookRef}>
            <h5 style={{ opacity: "0.75" }}>Đánh giá sản phẩm </h5>
            {isLogin && (
            <div className="add_assess col-10">
              <div className="point_ass d-flex justify-content-center" style={{ padding: "0.5rem" }}>
                <label htmlFor="point" className="col-3">Điểm đánh giá</label>
                <input
                  className="form-control"
                  type="number"
                  name="point"
                  id="point"
                  min="1"
                  max="5"
                  onChange={(e) =>
                    setNewass({ ...newass, point: e.target.value })
                  }
                />
              </div>
              <div className="title_ass d-flex justify-content-center" style={{ padding: "0.5rem" }}>
                <label htmlFor="titleassess" className="col-3">Tiêu đề đánh giá</label>
                <input
                  className="form-control"
                  type="text"
                  name="titleassess"
                  id="titleassess"
                  onChange={(e) =>
                    setNewass({ ...newass, titleassess: e.target.value })
                  }
                />
              </div>
              <div className="content_ass d-flex justify-content-center" style={{ padding: "0.5rem" }}>
                <label htmlFor="contentassess" className="col-3">Nội dung đánh giá</label>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  id="contentassess"
                  onChange={(e) =>
                    setNewass({ ...newass, contentassess: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="date_ass" style={{ padding: "0.5rem" }}>
                <label htmlFor="date" className="col-3">Thời gian đánh giá</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) =>
                    setNewass({ ...newass, date: e.target.value })
                  }
                />
              </div>
              <div
                className="btn_send d-flex justify-content-end"
                style={{ padding: "0.2rem" }}
              >
                <button
                  onClick={handleSendAss}
                  className="btn btn-outline-success"
                >
                  Send
                </button>
              </div>
            </div>
            )}
            <div className="assess">
              {ass.map((assItem) => (
                <div className="ass_user d-flex" key={assItem.id}>
                  <div className="cmt_avata col-1">
                    <i
                      class="bi bi-person-circle"
                      style={{ fontSize: "2.5rem", color: "#c6c6c6" }}
                    ></i>
                  </div>
                  <div className="cmt_user d-flex flex-column justify-content-center">
                    <span style={{ fontWeight: "400", padding: "0.2rem" }}>
                      {assItem.username}
                    </span>
                    <div className="cmt_content">
                      <span>{assItem.point}/5</span>
                      <StarRating point = {assItem.point}/>
                      <span>{assItem.titleassess}</span>
                      <p style={{margin : "0"}}>{assItem.contentassess}</p>
                      <span>{assItem.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
