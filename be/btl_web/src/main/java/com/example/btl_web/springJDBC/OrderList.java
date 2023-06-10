package com.example.btl_web.springJDBC;

import java.sql.Date;

public class OrderList {
	private int id;
	private int quantity;
	private String payment;
	private String title;
	private int price;
	private String name;
	private String phonenumber;
	private String email;
	private String username;
	private String bookcover;
	private Date dob;
	private String address;
	private int id_book;
	private String status;
	public OrderList() {
	}
	
	public OrderList(int id, int quantity, String payment, String title, int price, String name, String phonenumber,
			String email, String username, String bookcover, Date dob, String address, int id_book, String status) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.payment = payment;
		this.title = title;
		this.price = price;
		this.name = name;
		this.phonenumber = phonenumber;
		this.email = email;
		this.username = username;
		this.bookcover = bookcover;
		this.dob = dob;
		this.address = address;
		this.id_book = id_book;
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getId_book() {
		return id_book;
	}

	public void setId_book(int id_book) {
		this.id_book = id_book;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getBookcover() {
		return bookcover;
	}

	public void setBookcover(String bookcover) {
		this.bookcover = bookcover;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
