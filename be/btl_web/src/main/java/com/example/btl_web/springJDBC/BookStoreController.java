package com.example.btl_web.springJDBC;

import java.awt.RenderingHints.Key;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@RestController
@CrossOrigin
public class BookStoreController {
	private BookStoreDao bookStoreDao = new BookStoreDao();
	@PostMapping("/login")
	public ResponseEntity<?> login (@RequestBody LoginForm loginForm){
		String username = loginForm.getUsername();
		String password = loginForm.getPassword();
		boolean isAuthenticated = bookStoreDao.authentication(username, password);
		if (isAuthenticated) {
			SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
			long expirationTime = 3600000;
			String token = Jwts.builder().setSubject(username).setIssuedAt(new Date())
					.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                    .signWith(secretKey)
                    .compact();
			String role = bookStoreDao.roleUser(username, password);
			return ResponseEntity.ok("{\"token\": \"" + token + "\", \"role\": \"" + role + "\"}");
		}
		else {
			System.out.println("Thông báo lỗi đăng nhập không có tài khoản");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}
	@GetMapping("/book")
	public ResponseEntity<?> getBook () throws Exception{
		return bookStoreDao.selectallbook();
	}
	@GetMapping("/book/{id}")
	public ResponseEntity<?> getBookID (@PathVariable String id) {
		return bookStoreDao.selectbookid(id);
	}
	@GetMapping("/category")
	public ResponseEntity<?> getcategory (){
		return bookStoreDao.selectallcategory();
	}
	@PostMapping("/add")
	public ResponseEntity<?> postbook(@RequestBody Book book){
		return bookStoreDao.insertBook(book);
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<?> putbook (@RequestBody Book book, @PathVariable String id){
		return bookStoreDao.updateBook(book, id);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deletebook (@PathVariable String id){
		return bookStoreDao.deletebook(id);
	}
	@PostMapping("/register")
	public ResponseEntity<?> postUser(@RequestBody User user){
		return bookStoreDao.insertuser(user);
	}
	@PostMapping("/order/add")
	public ResponseEntity<?> postOrder(@RequestBody Order order){
		return bookStoreDao.insertOrder(order);
	}
	@GetMapping("/order")
	public ResponseEntity<?> getOrder (){
		return bookStoreDao.selectOrder();
	}
	@PutMapping("/confirm")
	public ResponseEntity<?> putConfirm (@RequestBody Confirm confirm){
		return bookStoreDao.updateConfirm(confirm);
	}
	@PostMapping ("/addcmt/{id}")
	public ResponseEntity<?> postComment (@RequestBody Comment comment, @PathVariable String id){
		return bookStoreDao.addComment(comment, id);
	}
	@GetMapping("/cmt/{ids}")
	public ResponseEntity<?> selectComment (@PathVariable String ids){
		return bookStoreDao.selectComment(ids);
	}
	@PostMapping ("/addass/{id}")
	public ResponseEntity<?> postAssess (@RequestBody Assess assess, @PathVariable String id){
		return bookStoreDao.addAssess(assess, id);
	}
	@GetMapping("/ass/{ids}")
	public ResponseEntity<?> selectAssess (@PathVariable String ids){
		return bookStoreDao.selectAssess(ids);
	}
	@GetMapping("user")
	public ResponseEntity<?> selectUser () throws Exception{
		return bookStoreDao.selectalluser();
	}
	@DeleteMapping("deleteorder/{id}")
	public ResponseEntity<?> deleteOrder ( @PathVariable String id){
		return bookStoreDao.deleteorder(id);
	}
	@GetMapping("/allorder")
	public ResponseEntity<?> getAllOrder (){
		return bookStoreDao.selectAllOrder();
	}
	@PutMapping("/status/{id}")
	public ResponseEntity<?> updateStatusOrder (@RequestBody OrderList orderList, @PathVariable String id){
		return bookStoreDao.updateStatus(orderList, id);
	}
	@GetMapping("/orders/{id}")
	public ResponseEntity<?> getOrderId (@PathVariable String id) {
		return bookStoreDao.selectOrderById(id);
	}
}
