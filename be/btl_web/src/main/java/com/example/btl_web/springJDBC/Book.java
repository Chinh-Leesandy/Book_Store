package com.example.btl_web.springJDBC;

import java.sql.Date;

public class Book {
	private int ID;
	private String title;
	private String author;
	private Date releasedate;
	private int pageNumber;
	private int quantitysoid;
	private String bookcover;
	private String bookdescription;
	private int idCategory;
	private String NameCategory;
	private int price;
	
	public Book() {
	}
	
	public Book(int iD, String title, String author, Date releasedate, int pageNumber, int quantitysoid,
			String bookcover, String bookdescription, int idCategory, String nameCategory, int price) {
		super();
		ID = iD;
		this.title = title;
		this.author = author;
		this.releasedate = releasedate;
		this.pageNumber = pageNumber;
		this.quantitysoid = quantitysoid;
		this.bookcover = bookcover;
		this.bookdescription = bookdescription;
		this.idCategory = idCategory;
		NameCategory = nameCategory;
		this.price = price;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getNameCategory() {
		return NameCategory;
	}
	public void setNameCategory(String nameCategory) {
		NameCategory = nameCategory;
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public Date getReleasedate() {
		return releasedate;
	}
	public void setReleasedate(Date releasedate) {
		this.releasedate = releasedate;
	}
	public int getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}
	public int getQuantitysoid() {
		return quantitysoid;
	}
	public void setQuantitysoid(int quantitysoid) {
		this.quantitysoid = quantitysoid;
	}
	public String getBookcover() {
		return bookcover;
	}
	public void setBookcover(String bookcover) {
		this.bookcover = bookcover;
	}
	public String getBookdescription() {
		return bookdescription;
	}
	public void setBookdescription(String bookdescription) {
		this.bookdescription = bookdescription;
	}
	public int getIdCategory() {
		return idCategory;
	}
	public void setIdCategory(int idCategory) {
		this.idCategory = idCategory;
	}
	
	
}
