package com.example.btl_web.springJDBC;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public class BookStoreDao {
	private String url = "jdbc:mysql://localhost:3306/btl_web";
	private String User = "root";
	private String pass = "12345";
	private static final String SELECT_LOGIN = "SELECT * FROM user WHERE username = ? AND password = ?";
	private static final String SELECT_ALL_BOOK = "select book.ID, book.title, book.author, book.releasedate, book.pageNumber, book.quantitysoid, book.bookdescription, book.bookcover,book.idCategory, category.NameCategory, book.price\r\n"
			+ "from btl_web.book \r\n"
			+ "INNER JOIN btl_web.category ON book.idCategory = category.ID;";
	private static final String SELECT_BOOK_BY_ID = "select book.ID, book.title, book.author, book.releasedate, book.pageNumber, book.quantitysoid, book.bookdescription, book.bookcover,book.idCategory, category.NameCategory, book.price\r\n"
			+ "from btl_web.book  INNER JOIN btl_web.category ON book.idCategory = category.ID WHERE book.ID = ?;";
	private static final String SELECT_ALL_CATEGORY = "select * from category";
	private static final String INSERT_BOOK = "INSERT INTO book (title, author, bookdescription, releasedate, pagenumber, quantitysoid, idCategory, bookcover, price) \r\n"
			+ "VALUES (?, ?, ?, ?, ?, ?, (SELECT ID FROM category WHERE Namecategory = ?), ?, ?);";
	private static final String UPDATE_BOOK = "UPDATE book SET title = ?, author = ?, bookdescription = ?, releasedate = ?, pagenumber = ?, idCategory = (SELECT ID FROM category WHERE NameCategory = ?), bookcover = ?, price = ? WHERE ID = ?;";
	private static final String INSERT_USER = "INSERT INTO user (name, username, password, email, role, phonenumber, dob) VALUES (?, ?, ?, ?, ?, ?, ?)";
	private static int IDuser;
	private static final String INSERT_ORDER = "INSERT INTO btl_web.orders (quantity, payment_method, status_order , id_book, id_user ) VALUES (?, ?, ?, ?, ?)";
	private static final String SELECT_ORDER = "select orders.id, orders.quantity, payment.name,user.name, user.username, user.email, user.phonenumber, book.title, book.price, book.bookcover, user.dob, orders.address, orders.id_book,status.name\r\n"
			+ "from btl_web.orders\r\n"
			+ "inner join btl_web.payment on orders.payment_method = payment.id\r\n"
			+ "inner join btl_web.book on orders.id_book = book.ID\r\n"
			+ "inner join btl_web.user on orders.id_user = user.ID\r\n"
			+ "inner join btl_web.status on orders.status_order = status.id\r\n"
			+ "where user.ID = ?;";
	private static final String DELETE_BOOK = "DELETE FROM book WHERE ID = ?";
	public static final String CONFIRM = "UPDATE orders o INNER JOIN user u ON o.id_user = u.ID\r\n"
			+ "SET o.address = ?,u.username = ?,u.name = ?,u.phonenumber = ?,u.email = ?,u.dob = ?\r\n"
			+ "WHERE o.id_user = ?;";
	public static final String ADD_COMMENT = "INSERT INTO comment (content, iduser, idbook)VALUES (?,?,?)";
	public static final String SELECT_COMMENT = "SELECT comment.id, comment.content, user.username from comment \r\n"
			+ "inner join user on comment.iduser = user.ID where idbook = ?;";
	public static final String ADD_ASSESS = "INSERT INTO assess (point,titleassess,contentassess,date, idUser, idBook)VALUES (?,?,?,?,?,?)";
	public static final String SELECT_ASSESS = "SELECT assess.id, assess.point, assess.titleassess, assess.contentassess, assess.date,user.username from assess \r\n "
			+ "inner join user on assess.idUser = user.ID where idBook = ?;";
	public static final String SELECT_ALL_USER = "SELECT * FROM user";
	public static final String DELETE_ORDER = "DELETE FROM orders WHERE id = ?";
	public static final String SELECT_ALL_ORDER = "select orders.id, orders.quantity, payment.name,user.name, user.username, user.email, user.phonenumber, book.title, book.price, book.bookcover, user.dob, orders.address, orders.id_book,status.name\r\n"
			+ "from btl_web.orders\r\n"
			+ "inner join btl_web.payment on orders.payment_method = payment.id\r\n"
			+ "inner join btl_web.book on orders.id_book = book.ID\r\n"
			+ "inner join btl_web.user on orders.id_user = user.ID\r\n"
			+ "inner join btl_web.status on orders.status_order = status.id";
	public static final String UPDATE_STATUS = "UPDATE orders SET status_order = (SELECT id FROM status WHERE name = ?) WHERE id = ?;";
	public static final String SELECT_ORDER_BY_ID = "select orders.id, orders.quantity, payment.name,user.name, user.username, user.email, user.phonenumber, book.title, book.price, book.bookcover, user.dob, orders.address, orders.id_book,status.name\r\n"
			+ "from btl_web.orders\r\n"
			+ "inner join btl_web.payment on orders.payment_method = payment.id\r\n"
			+ "inner join btl_web.book on orders.id_book = book.ID\r\n"
			+ "inner join btl_web.user on orders.id_user = user.ID\r\n"
			+ "inner join btl_web.status on orders.status_order = status.id where orders.id = ?;";
	public BookStoreDao() {	
	};
	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(url, User, pass);
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return connection;
	}
	public boolean authentication (String username, String password) {
		try (Connection connection = getConnection()){
			PreparedStatement ps  = connection.prepareStatement(SELECT_LOGIN);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet result = ps.executeQuery();
			if(result.next()) {
				IDuser = result.getInt("id");
				System.out.println(IDuser);
				return true;
			}
			connection.close();
			ps.close();
			result.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	public String roleUser (String username, String password) {
		String res = "";
		try (Connection connection = getConnection()){
			PreparedStatement ps  = connection.prepareStatement(SELECT_LOGIN);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet result = ps.executeQuery();
			if(result.next()) {
				res = result.getString("role");
			}
			connection.close();
			ps.close();
			result.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	public ResponseEntity<?> selectallbook (){
		List<Book> book = new ArrayList<>();
		try (Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_BOOK);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("ID");
				String title = resultSet.getString("title");
				String author = resultSet.getString("author");
				Date releasedate = resultSet.getDate("releasedate");
				int pageNumber = resultSet.getInt("pageNumber");
				int quantitysoid = resultSet.getInt("quantitysoid");
				String bookcover = resultSet.getString("bookcover");
				String bookdescription = resultSet.getString("bookdescription");
				int idCategory = resultSet.getInt("idCategory");
				String NameCategory = resultSet.getString("NameCategory");
				int price = resultSet.getInt("price");
				book.add(new Book(id,title,author,releasedate,pageNumber,quantitysoid,bookcover,bookdescription,idCategory,NameCategory, price));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(book);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.internalServerError().build();
	}
	public ResponseEntity<?> selectbookid (String id){
		Book book = new Book();
		try (Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(SELECT_BOOK_BY_ID);
			ps.setString(1, id);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				book.setID(resultSet.getInt("ID"));
				book.setTitle(resultSet.getString("title"));
				book.setAuthor(resultSet.getString("author"));
				book.setReleasedate(resultSet.getDate("releasedate"));
				book.setPageNumber(resultSet.getInt("pageNumber"));
				book.setQuantitysoid(resultSet.getInt("quantitysoid"));
				book.setBookdescription(resultSet.getString("bookdescription"));
				book.setBookcover(resultSet.getString("bookcover"));
				book.setIdCategory(resultSet.getInt("idCategory"));
				book.setNameCategory(resultSet.getString("NameCategory"));
				book.setPrice(resultSet.getInt("price"));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(book);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectallcategory (){
		List<Category> category = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_CATEGORY);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int ID = resultSet.getInt("ID");
				String NameCategory = resultSet.getString("NameCategory");
				category.add(new Category(ID, NameCategory));
			}
			ps.close();
			connection.close();
			resultSet.close();
			return ResponseEntity.ok().body(category);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> insertBook (Book book){
		try (Connection connection = getConnection()) {
			PreparedStatement ps  = connection.prepareStatement(INSERT_BOOK);
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getBookdescription());
			ps.setDate(4, book.getReleasedate());
			ps.setInt(5, book.getPageNumber());
			ps.setInt(6, book.getQuantitysoid());
			ps.setString(7, book.getNameCategory());
			ps.setString(8, book.getBookcover());
			ps.setInt(9, book.getPrice());
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok(book);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> updateBook (Book book, String id){
		try (Connection connection = getConnection()) {
			PreparedStatement ps  = connection.prepareStatement(UPDATE_BOOK);
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getBookdescription());
			ps.setDate(4, book.getReleasedate());
			ps.setInt(5, book.getPageNumber());
			ps.setString(6, book.getNameCategory());
			ps.setString(7, book.getBookcover());
			ps.setInt(8, book.getPrice());
			ps.setInt(9, Integer.valueOf(id));
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok(book);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> insertuser (User user){
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(INSERT_USER);
			ps.setString(1, user.getName());
	        ps.setString(2, user.getUsername());
	        ps.setString(3, user.getPassword());
	        ps.setString(4, user.getEmail());
	        ps.setString(5, "user");
	        ps.setString(6, user.getPhonenumber());
	        ps.setDate(7, user.getDob());
			ps.executeUpdate();
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> insertOrder (Order order){
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(INSERT_ORDER);
			ps.setInt(1, order.getQuantity());
			ps.setInt(2, 1);
			ps.setInt(3, 2);
			ps.setInt(4, order.getId_book());
			ps.setInt(5, IDuser);
			ps.executeUpdate();
			return ResponseEntity.ok(order);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectOrder (){
		List<OrderList> orders = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_ORDER);
			ps.setInt(1, IDuser);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("id");
				int quantity = resultSet.getInt("quantity");
				String payment = resultSet.getString("name");
				String title = resultSet.getString("title");
				int price = resultSet.getInt("price");
				String name = resultSet.getString("user.name");
				String phonenum = resultSet.getString("phonenumber");
				String email = resultSet.getString("email");
				String username = resultSet.getString("username");
				String bookcover = resultSet.getString("bookcover");
				Date dob = resultSet.getDate("dob");
				String address = resultSet.getString("address");
				int id_book = resultSet.getInt("id_book");
				String status = resultSet.getString("status.name");
				orders.add(new OrderList(id, quantity, payment, title, price, name, phonenum, email, username, bookcover, dob, address, id_book, status));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(orders);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> deletebook (String id) {
		try (Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(DELETE_BOOK);
			ps.setInt(1, Integer.valueOf(id));
			ps.executeUpdate();
			connection.close();
			ps.close();
			return ResponseEntity.ok("Delete Book");
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> updateConfirm (Confirm confirm){
		try (Connection connection = getConnection()){
			PreparedStatement ps  = connection.prepareStatement(CONFIRM);
			ps.setString(1, confirm.getAddress());
			ps.setString(2, confirm.getUsername());
			ps.setString(3, confirm.getName());
			ps.setString(4, confirm.getPhonenumber());
			ps.setString(5, confirm.getEmail());
			ps.setDate(6, confirm.getDob());
			ps.setInt(7, IDuser);
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok(confirm);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> addComment(Comment comment, String id){
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(ADD_COMMENT);
			ps.setString(1, comment.getContent());
			ps.setInt(2, IDuser);
			ps.setInt(3, Integer.valueOf(id));
			ps.executeUpdate();
			return ResponseEntity.ok(comment);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectComment (String ids){
		List<Comment> comments = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_COMMENT);
			ps.setInt(1, Integer.valueOf(ids));
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("id");
				String content = resultSet.getString("content");
				int iduser = IDuser;
				int idbook = Integer.valueOf(ids);
				String username = resultSet.getString("username");
				comments.add(new Comment(id,content, iduser, idbook, username));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(comments);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> addAssess(Assess assess, String id){
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(ADD_ASSESS);
			ps.setInt(1, assess.getPoint());
			ps.setString(2, assess.getTitleassess());
			ps.setString(3, assess.getContentassess());
			ps.setDate(4, assess.getDate());
			ps.setInt(5, IDuser);
			ps.setInt(6, Integer.valueOf(id));
			ps.executeUpdate();
			return ResponseEntity.ok(assess);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectAssess (String ids){
		List<Assess> assess = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_ASSESS);
			ps.setInt(1, Integer.valueOf(ids));
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("id");
				int point  = resultSet.getInt("point");
				String titleassess = resultSet.getString("titleassess");
				String contentassess = resultSet.getString("contentassess");
				Date date = resultSet.getDate("date");
				int iduser = IDuser;
				int idbook = Integer.valueOf(ids);
				String username = resultSet.getString("username");
				assess.add(new Assess(id,point,titleassess,contentassess,date, iduser, idbook, username));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(assess);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectalluser(){
		List<User> users = new ArrayList<>();
		try (Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_USER);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				String name = resultSet.getString("name");
				String username = resultSet.getString("username");
				String password = resultSet.getString("password");
				String email = resultSet.getString("email");
				String role = resultSet.getString("role");
				String phonenumner = resultSet.getString("phonenumber");
				Date dob = resultSet.getDate("dob");
				users.add(new User(name,username, password, email, role, phonenumner, dob ));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(users);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> deleteorder (String id) {
		try (Connection connection = getConnection()) {
			PreparedStatement ps = connection.prepareStatement(DELETE_ORDER);
			ps.setInt(1, Integer.valueOf(id));
			ps.executeUpdate();
			connection.close();
			ps.close();
			return ResponseEntity.ok("Delete Order");
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectAllOrder (){
		List<OrderList> orders = new ArrayList<>();
		try (Connection connection = getConnection()){
			PreparedStatement ps = connection.prepareStatement(SELECT_ALL_ORDER);
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				int id = resultSet.getInt("id");
				int quantity = resultSet.getInt("quantity");
				String payment = resultSet.getString("name");
				String title = resultSet.getString("title");
				int price = resultSet.getInt("price");
				String name = resultSet.getString("user.name");
				String phonenum = resultSet.getString("phonenumber");
				String email = resultSet.getString("email");
				String username = resultSet.getString("username");
				String bookcover = resultSet.getString("bookcover");
				Date dob = resultSet.getDate("dob");
				String address = resultSet.getString("address");
				int id_book = resultSet.getInt("id_book");
				String status = resultSet.getString("status.name");
				orders.add(new OrderList(id, quantity, payment, title, price, name, phonenum, email, username, bookcover, dob, address, id_book, status));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(orders);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> updateStatus (OrderList orderList, String id){
		try (Connection connection = getConnection()) {
			PreparedStatement ps  = connection.prepareStatement(UPDATE_STATUS);
			ps.setString(1, orderList.getStatus());
			ps.setInt(2, Integer.valueOf(id));
			ps.executeUpdate();
			ps.close();
			connection.close();
			return ResponseEntity.ok(orderList);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	public ResponseEntity<?> selectOrderById (String id){
		OrderList orderList = new OrderList();
		try (Connection connection = getConnection()) {
			PreparedStatement ps  = connection.prepareStatement(SELECT_ORDER_BY_ID);
			ps.setInt(1, Integer.valueOf(id));
			ResultSet resultSet = ps.executeQuery();
			while (resultSet.next()) {
				orderList.setId(resultSet.getInt("id"));
				orderList.setQuantity(resultSet.getInt("quantity"));
				orderList.setTitle(resultSet.getString("title"));
				orderList.setPrice(resultSet.getInt("price"));
				orderList.setName(resultSet.getString("user.name"));
				orderList.setPhonenumber(resultSet.getString("phonenumber"));
				orderList.setEmail(resultSet.getString("email"));
				orderList.setUsername(resultSet.getString("username"));
				orderList.setBookcover(resultSet.getString("bookcover"));
				orderList.setDob(resultSet.getDate("dob"));
				orderList.setAddress(resultSet.getString("address"));
				orderList.setId_book(resultSet.getInt("id_book"));
				orderList.setStatus(resultSet.getString("status.name"));
			}
			connection.close();
			ps.close();
			resultSet.close();
			return ResponseEntity.ok().body(orderList);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
