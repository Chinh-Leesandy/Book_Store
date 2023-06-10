import React from "react";
import { useEffect, useState } from "react";
import "./HomeAdmin.css";
import { useNavigate } from "react-router-dom";
import { success, error } from "../../../Service/toastify";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
export const HomeAdmin = () => {
  const [book, setBook] = useState([]);
  const [isLogin, setisLogin] = useState(false);
  const CheckLogin = () => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('role') === "admin"){
      setisLogin(true);
    }
  }
  useEffect(() => {
    fetch("http://localhost:8080/book")
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.log(err));
    CheckLogin();
  }, []);
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/Book/${id}`);
  };
  const handAdd = () => {
    if (window.confirm("Bạn có chắc chắn muốn tạo sách?")) {
      navigate("/Book/-1");
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuốn sách?")) {
      fetch(`http://localhost:8080/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            error("Xóa sách không thành công.");
          } else {
            success("Xóa sách thành công");
            navigate("/HomeAdmin");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      window.location.reload();
    } else {
      navigate("/HomeAdmin");
    }
  };
  return (
    <div>
      <HeaderAdmin/>
      <div className="containerr text-center homeadmin">
        {isLogin && (
        <div className="add-product">
          <button
            onClick={() => handAdd()}
            className="btn btn-outline-success btn_add"
            type="button"
          >
            Thêm sách
          </button>
        </div>
        )}
        <table className="product table table-striped">
          <thead className = "table-dark">
            <tr>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Ngày phát hành</th>
              <th>Số trang</th>
              <th>Số lượng đã bán</th>
              <th>{isLogin ? "Action" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {book.map((bookItem) => (
              <tr key={bookItem.id}>
                <td className = "text-truncate">{bookItem.title}</td>
                <td>{bookItem.author}</td>
                <td>{bookItem.nameCategory}</td>
                <td>{bookItem.releasedate}</td>
                <td>{bookItem.pageNumber}</td>
                <td>{bookItem.quantitysoid}</td>
                <td>
                  {isLogin && (
                    <div className="btn_home d-flex">
                      <div className="btn_view">
                        <button
                          onClick={() => handleView(bookItem.id)}
                          className="btn btn-outline-warning"
                        >
                          <i className="bi bi-eye"></i>View
                        </button>
                      </div>
                      <div className="btn_delete">
                        <button
                          onClick={() => handleDelete(bookItem.id)}
                          className="btn btn-outline-danger"
                        >
                          <i className="bi bi-trash3"></i>Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
