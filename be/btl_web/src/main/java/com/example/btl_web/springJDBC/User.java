package com.example.btl_web.springJDBC;

import java.sql.Date;

public class User {
	private String name;
	private String username;
	private String password;
	private String email;
	private String role;
	private String phonenumber;
	private Date dob;
	public User() {
	}
	public User(String name, String username, String password, String email, String role, String phonenumber,
			Date dob) {
		super();
		this.name = name;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.phonenumber = phonenumber;
		this.dob = dob;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPasswold(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	
}
