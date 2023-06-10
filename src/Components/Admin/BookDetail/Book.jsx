import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Book.css";
import { success, error } from "../../../Service/toastify";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
export const Book = () => {
  const params = useParams();
  const id = params.id;
  const [bookItem, setBookItem] = useState({});
  const [category, setCategory] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [editModel, setEditModel] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/book`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBookItem(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:8080/category")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((err) => console.log(err));
  }, []);
  const handleUpload = () => {
    setBookItem({ ...bookItem, bookcover: uploadedImage });
    setShowUploadModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      // setSelectedFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();
  const onSaveClick = () => {
    console.log(bookItem);
    fetch(`http://localhost:8080/update/${id}`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(bookItem),
      headers: {
        "Content-Type": "application/json; charset =UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          success("Cập nhập sách thành công");
          setTimeout(() => {
            setEditModel(false);
            navigate(`/Book/${id}`);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditClick = () => {
    setEditModel(true);
  };
  const handleAddClick = () => {
    const isDuplicate = books.some((book) => {
      return book.title === bookItem.title && book.author === bookItem.author;
    });
    if (isDuplicate) {
      error("Sách thêm vào bị trùng");
    } else {
      fetch(`http://localhost:8080/add`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(bookItem),
        headers: {
          "Content-Type": "application/json; charset =UTF-8",
        },
      })
        .then((response) => {
          if (response.ok) {
            success("Thêm sách thành công");
            setTimeout(() => {
              setEditModel(false);
              navigate(`/HomeAdmin`);
            }, 1000);
          } else {
            error("Thêm sách không thành công");
          }
        })
        .catch((err) => {
          console.log(err);
          error("Thêm sách không thành công");
        });
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <div className="Bookdetail">
        <h3 className="text-center">Sách</h3>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="title-author d-flex">
                <div className="title">
                  <label htmlFor="Text">Tiêu đề: </label> <br />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={bookItem.title}
                    onChange={(e) =>
                      setBookItem({ ...bookItem, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="author">
                  <label htmlFor="Text">Tác giả: </label> <br />
                  <input
                    required
                    type="text"
                    name="author"
                    id="author"
                    value={bookItem.author}
                    onChange={(e) =>
                      setBookItem({ ...bookItem, author: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="description">
                <label htmlFor="Text">Mô tả về sách: </label> <br />
                <textarea
                  name="description"
                  id="description"
                  value={bookItem.bookdescription}
                  onChange={(e) =>
                    setBookItem({
                      ...bookItem,
                      bookdescription: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="date-pageNumber d-flex">
                <div className="date">
                  <label htmlFor="text">Ngày phát hành:</label> <br />
                  <input
                    type="date"
                    name="releasedate"
                    id="releasedate"
                    value={bookItem.releasedate}
                    onChange={(e) =>
                      setBookItem({ ...bookItem, releasedate: e.target.value })
                    }
                  />
                </div>
                <div className="pagenumber">
                  <label htmlFor="text">Số trang:</label> <br />
                  <input
                    type="text"
                    name="pageNumber"
                    id="pageNumber"
                    value={bookItem.pageNumber}
                    onChange={(e) =>
                      setBookItem({ ...bookItem, pageNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="category-quantity d-flex align-items-center">
                <div className="category">
                  <label htmlFor="text">Thể loại: </label> <br />
                  {id < 0 ? (
                    <div>
                      <select
                        value={bookItem.nameCategory}
                        onChange={(e) =>
                          setBookItem({
                            ...bookItem,
                            nameCategory: e.target.value,
                          })
                        }
                      >
                        <option value="">Thể loại</option>
                        {category.map((category) => (
                          <option
                            key={category.id}
                            value={category.nameCategory}
                          >
                            {category.nameCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={bookItem.nameCategory}
                      onChange={(e) =>
                        setBookItem({
                          ...bookItem,
                          nameCategory: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
                <div className="quantitysoid">
                  <label htmlFor="text">Số lượng sách đã bán: </label> <br />
                  <input
                    type="text"
                    name="quantitysoid"
                    id="quantitysoid"
                    value={bookItem.quantitysoid}
                    onChange={(e) =>
                      setBookItem({
                        ...bookItem,
                        quantitysoid: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-4 text-center">
              <div className="bookcover d-flex flex-column">
                <span>{id < 0 || editModel ? "" : `Trang bìa`} </span>
                {id < 0 || editModel ? (
                  showUploadModal ? (
                    <div className="upload-modal">
                      <input
                        className="img-url"
                        type="text"
                        placeholder="Nhập đường link hoặc kéo thả đường link ảnh"
                        value={uploadedImage}
                        onChange={(e) => setUploadedImage(e.target.value)}
                      />
                      <input
                        className="img-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                      />
                      <button className="btn-upload" onClick={handleUpload}>
                        Upload
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn-upload"
                        onClick={() => setShowUploadModal(true)}
                      >
                        Upload
                      </button>
                      {/* {selectedFile && <img className="cover" src={selectedFile} alt="" />} */}
                      {bookItem.bookcover && (
                        <img
                          className="cover"
                          src={bookItem.bookcover}
                          alt=""
                        />
                      )}
                    </>
                  )
                ) : (
                  <span>
                    <img className="cover" src={bookItem.bookcover} alt="" />
                  </span>
                )}
              </div>
              <div className="price">
                <label htmlFor="text">Giá: </label>{" "}
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={
                    bookItem.price ? bookItem.price.toLocaleString("vi-VN") : ""
                  }
                  onChange={(e) =>
                    setBookItem({
                      ...bookItem,
                      price: e.target.value,
                    })
                  }
                  style={{ width: "60px" }}
                  className={id > 0 ? "border-0" : "border-1"}
                />
                <span>đ</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="btn d-flex justify-content-end border-0">
              {id > 0 ? (
                editModel ? (
                  <button
                    onClick={onSaveClick}
                    type="button"
                    className="btn btn-success"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )
              ) : (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
