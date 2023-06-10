package com.example.btl_web.springJDBC;

public class Category {
	private int ID;
	private String NameCategory;
	
	public Category() {
	}
	public Category(int iD, String nameCategory) {
		super();
		ID = iD;
		NameCategory = nameCategory;
	}
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getNameCategory() {
		return NameCategory;
	}
	public void setNameCategory(String nameCategory) {
		NameCategory = nameCategory;
	}
	
}
