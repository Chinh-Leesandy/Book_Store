import React, { useState, useEffect } from "react";
import "./RegisterForm.css"
import { success, error } from "../../Service/toastify";
import { useNavigate } from "react-router-dom";
export const RegisterForm = () => {
  const [user, setUser] = useState("");
  const [register, setRegister] = useState(false);
  const [alluser, setAlluser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/user`)
      .then((response) => response.json())
      .then((data) => setAlluser(data))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    setRegister(true);
    const isUsernameDuplicate = alluser.some((u) => u.username === user.username);
    if (isUsernameDuplicate) {
      error("Username đã tồn tại. Vui lòng chọn username khác.");
      setRegister(false);
      return;
    }
    else{
      try {
        const response = await fetch(`http://localhost:8080/register`, {
          method : "POST",
          mode : "cors",
          body :  JSON.stringify(user),
          headers : {
              'Content-Type' : 'application/json; charset =UTF-8'
          }
      })
        if (response.ok) {
          const data = await response.json();
          console.log("Đăng ký thành công", data);
          success("Đăng ký thành công")
          navigate(`/Login`);
        } else {
          // Xử lý khi đăng ký thất bại
          const err = await response.text();
          console.log(err);
          error("Đăng ký thất bại")
        }
      } catch (err) {
        console.log(err);
        error("Đã có lỗi xảy ra")
      }
    }
    setRegister(false);
  };

  return (
    <div className="login">
    <div className="container1 col-5" style={{color : "#ffffff"}}>
      <form onSubmit={handleSubmit}>
        <h2 style={{color : "#ffffff", fontSize : "1.5rem"}} className="text-center">Đăng ký</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={user.name}
            onChange={(e) => setUser({...user, name : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={user.username}
            onChange={(e) => setUser({...user, username : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user, email : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            value={user.phonenumber}
            onChange={(e) => setUser({...user, phonenumber : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={user.dob}
            onChange={(e) => setUser({...user, dob : e.target.value})}
          />
        </div>
        <div className="btn-register col-6">
        <button type="submit" className="btn btn-outline-light btn_login" disabled={register}>
              {register ? (
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
        </div>
      </form>
    </div>
    </div>
  );
};
