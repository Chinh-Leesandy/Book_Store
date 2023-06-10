package com.example.btl_web.springJDBC;

public class Comment {
	private int id ;
	private String content;
	private int iduser;
	private int idbook;
	private String username;
	public Comment() {
	}
	public Comment(int id, String content, int iduser, int idbook, String username) {
		super();
		this.id = id;
		this.content = content;
		this.iduser = iduser;
		this.idbook = idbook;
		this.username = username;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getIduser() {
		return iduser;
	}
	public void setIduser(int iduser) {
		this.iduser = iduser;
	}
	public int getIdbook() {
		return idbook;
	}
	public void setIdbook(int idbook) {
		this.idbook = idbook;
	}
	
}
