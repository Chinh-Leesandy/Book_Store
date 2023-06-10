package com.example.btl_web.springJDBC;

import java.sql.Date;

public class Confirm {
	private int payment_method;
	private int id_user;
	private String address;
	private String paymentname;
	private String username;
	private String name;
	private String phonenumber;
	private String email;
	private Date dob;
	public Confirm() {
	}
	public Confirm(int payment_method, int id_user, String address, String paymentname, String username, String name,
			String phonenumber, String email, Date dob) {
		super();
		this.payment_method = payment_method;
		this.id_user = id_user;
		this.address = address;
		this.paymentname = paymentname;
		this.username = username;
		this.name = name;
		this.phonenumber = phonenumber;
		this.email = email;
		this.dob = dob;
	}
	public int getPayment_method() {
		return payment_method;
	}
	public void setPayment_method(int payment_method) {
		this.payment_method = payment_method;
	}
	public int getId_user() {
		return id_user;
	}
	public void setId_user(int id_user) {
		this.id_user = id_user;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPaymentname() {
		return paymentname;
	}
	public void setPaymentname(String paymentname) {
		this.paymentname = paymentname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	
}
