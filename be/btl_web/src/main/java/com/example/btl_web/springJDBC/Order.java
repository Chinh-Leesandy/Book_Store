package com.example.btl_web.springJDBC;

public class Order {
	private int id;
	private int quantity;
	private int payment_method;
	private int status_order;
	private int id_book;
	private int id_user;
	
	public Order() {
	}

	public Order(int id, int quantity, int payment_method, int status_order, int id_book, int id_user) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.payment_method = payment_method;
		this.status_order = status_order;
		this.id_book = id_book;
		this.id_user = id_user;
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

	public int getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(int payment_method) {
		this.payment_method = payment_method;
	}

	public int getStatus_order() {
		return status_order;
	}

	public void setStatus_order(int status_order) {
		this.status_order = status_order;
	}

	public int getId_book() {
		return id_book;
	}

	public void setId_book(int id_book) {
		this.id_book = id_book;
	}

	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}
}
