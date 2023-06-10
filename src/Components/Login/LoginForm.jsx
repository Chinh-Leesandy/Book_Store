import React from "react";
import { useState } from "react";
import "./LoginForm.css";
import { success, error } from "../../Service/toastify";
import { useNavigate, Link} from "react-router-dom";
export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token, role } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        console.log("Đăng nhập thành công", role);
        success("Đăng nhập thành công")
        if (role === "admin"){
          navigate("/HomeAdmin");
        }
        else {
          navigate("/");
        }
      } else {
        const errors = await response.text();
        console.log(errors);
        error("Đăng nhập không thành công.");
      }
    } catch (errors) {
      console.log(errors);
      error("Đã có lỗi xảy ra.");
    }
    setLoading(false);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="container1 col-5">
        <form onSubmit={handleSubmit} className="form_login d-flex flex-column justify-content-center align-items-center">
          <h2 classname = "textLogin" style={{color: "#ffffff"}}>Đăng nhập</h2>
          <div className="form-group d-flex justify-content-between">
            <input
              style={{color: "#ffffff"}}
              placeholder="Username"
              required
              type="text"
              className="login_username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i class="bi bi-person-square" style={{color: "#ffffff", fontSize: "2.5rem"}}></i>
          </div>
          <div className="form-group d-flex justify-content-between">
            <input
             style={{color: "#ffffff"}}
              placeholder="Password"
              required
              type="password"
              className="login_username"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i class="bi bi-house-lock" style={{color: "#ffffff", fontSize: "2.5rem"}}></i>
          </div>
          <div className="loading col-6">
            <button type="submit" className="btn btn-outline-light btn_login" disabled={loading}>
              {loading ? (
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div style={{paddingTop : "1.5rem"}}>
            <p style={{color: "#ffffff", fontSize: "1rem"}}>
              Nếu bạn là thành viên mới?
              <Link to="/Register" style={{color: "#8BC34A", fontSize: "1rem"}}>Register</Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
