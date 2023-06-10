import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { success, defaul } from "../../../Service/toastify";
export const HeaderAdmin = () => {
    const navigate = useNavigate();
    const HandleShop = () =>{
        navigate(`/HomeAdmin`)
      }
    const HandleLogin = () =>{
        navigate (`/Login`);
      }
      const HandleLogout = () =>{
        localStorage.clear();
        success ("Đăng xuất thành công");
        navigate(`/HomeAdmin`);
        window.location.reload();
      }
      const handleOrder = () => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('role') === "admin"){
          navigate(`/OrderAdmin`);
        }
        else {
          defaul("Vui lòng đăng nhập");
          navigate (`/Login`);
        }
      }
  return (
    <div>
      <header style={{paddingBottom: "1rem"}}>
        <div className="top_header">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="top_header_left col-7 d-flex justify-content-around">
              <span><i className="bi bi-clock"></i> Mon-Fri 8:00-18:00 / Sunday 8:00-14:00 |</span>
              <span><i className="bi bi-telephone-inbound"></i> 0915 123 546 |</span>
              <span><i className="bi bi-envelope"></i> Sandy_kv123@gmail.com</span>
            </div>
            <div className="top_header_right col-4 d-flex justify-content-end">
              <button className = "btn" onClick={HandleLogin}><i className="bi bi-box-arrow-in-left"></i> Login |</button>
              <button className = "btn" onClick={HandleLogout}><i className="bi bi-box-arrow-in-right"></i> Logout</button>
            </div>
          </div>
        </div>
        <div className="bottom_header d-flex justify-content-between align-items-center">
          <div className="logo col-2 d-flex justify-content-end" onClick={HandleShop}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7WKb2P4pbWTbXTe_vwY4XIc8GUoquMIYXnNvnoH-MV3EeMlxEI0AtRUMvrfm8QteBdgg&usqp=CAU" alt="" className="card-img-top" style={{height : "3.6rem"}}/>
          </div>
          <div className="tab_header col-6 d-flex justify-content-around" style={{width : "30%", marginRight : "2rem"}}>
            <Link to = "/HomeAdmin" className="link_header">HomeAdmin</Link>
            <span onClick={handleOrder}  className="link_header">Order</span>
          </div>
        </div>
      </header>
    </div>
  )
}
