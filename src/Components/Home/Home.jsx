import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Header } from "../Header/Header";
import { success } from "../../Service/toastify";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../Store/cartActions";
export const Home = () => {
  const [book, setBook] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:8080/book")
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/BookView/${id}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSort = (event) => {
    setSortOption(event.target.value);
  };
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredBooks = book.filter((bookItem) =>
    bookItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    } else {
      return 0;
    }
  });
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const handleAddToCart = (bookItem) => {
    dispatch(addToCart(bookItem));
    success ("Thêm vào giỏ hàng thành công ")
  };
  console.log(cartItems)
  return (
    <div>
      <Header/>
      <div className="container text-center home">
        <div className="search-sort d-flex justify-content-between">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search by book title"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
            />
            <span className="search-icon"><i className="bi bi-search"></i></span>
          </div>
          <select value={sortOption} onChange={handleSort} className = "form-select form-select-sm" style={{width :"20%"}}>
            <option value="">Sort by</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>
        <div className="product">
          <div className="row row-cols-4 gutter">
            {currentBooks.map((bookItem) => (
              <div className="col card" key={bookItem.id}>
                <div>
                  <img
                    src={bookItem.bookcover}
                    alt=""
                    className="card-img-top"
                  />
                </div>
                <div className="card_body d-flex flex-column col">
                  <span className="title_book">{bookItem.title}</span>
                  <span className="title_author">Tác giả: {bookItem.author}</span>
                  <span className="title_price text-left">Giá: {(bookItem.price / 1).toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="btn_homeuser d-flex ">
                  <div>
                    <button className="btn-hover view_book" onClick={() => handleView(bookItem.id)}><i class="bi bi-check2-circle"></i>{" "}Book info</button>
                  </div>
                  <div>
                    <button className="btn-hover add_cart" onClick={() => handleAddToCart(bookItem)}><i class="bi bi-cart-dash"></i>{" "}Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination d-flex justify-content-center" style= {{paddingTop : "2rem"}} >
          {book.length > booksPerPage && (
            <ul className="pagination d-flex">
              {Array(Math.ceil(sortedBooks.length / booksPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
