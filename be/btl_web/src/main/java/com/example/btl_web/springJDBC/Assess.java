package com.example.btl_web.springJDBC;

import java.sql.Date;

public class Assess {
	private int id;
	private int point;
	private String titleassess;
	private String contentassess;
	private Date date;
	private int idBook;
	private int idUser;
	private String username;
	public Assess() {
	}
	public Assess(int id, int point, String titleassess, String contentassess, Date date, int idBook, int idUser,
			String username) {
		super();
		this.id = id;
		this.point = point;
		this.titleassess = titleassess;
		this.contentassess = contentassess;
		this.date = date;
		this.idBook = idBook;
		this.idUser = idUser;
		this.username = username;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}
	public String getTitleassess() {
		return titleassess;
	}
	public void setTitleassess(String titleassess) {
		this.titleassess = titleassess;
	}
	public String getContentassess() {
		return contentassess;
	}
	public void setContentassess(String contentassess) {
		this.contentassess = contentassess;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getIdBook() {
		return idBook;
	}
	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}