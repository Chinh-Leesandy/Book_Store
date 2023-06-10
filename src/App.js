import { Book } from "./Components/Admin/BookDetail/Book";
import { HomeAdmin } from "./Components/Admin/HomeAdmin/HomeAdmin";
import { Home } from "./Components/Home/Home";
import { LoginForm } from "./Components/Login/LoginForm";
import {Route, Routes} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { RegisterForm } from "./Components/Register/RegisterForm";
import { BookView } from "./Components/BookView/BookView";
import { Order } from "./Components/Order/Order";
import { ConfirmInfo } from "./Components/ConfirmInfo/ConfirmInfo";
import { HomeUser } from "./Components/HomeUser/HomeUser";
import { Cart } from "./Components/Cart/Cart";
import { OrderAdmin } from "./Components/Admin/OrderAdmin/OrderAdmin";
import { OrderDetail } from "./Components/Admin/OrderDetail/OrderDetail";

function App() {
  return (
    <div className="App">
     <Routes>
        <Route  path = '/' element = {<HomeUser/>}/>
        <Route  path = '/Shop' element = {<Home/>}/>
        <Route  path = '/Login' element = {<LoginForm/>}/>
        <Route  path = '/Register' element = {<RegisterForm/>}/>
        <Route  path = '/HomeAdmin' element = {<HomeAdmin/>}/>
        <Route  path = '/Book/:id' element = {<Book/>}/>
        <Route  path = '/BookView/:id' element = {<BookView/>}/>
        <Route  path =  'Order' element = {<Order/>}/>
        <Route  path = 'ConfirmInfo' element = {<ConfirmInfo/>}/>
        <Route  path = 'Cart' element = {<Cart/>}/>
        <Route  path = 'OrderAdmin' element = {<OrderAdmin/>}/>
        <Route  path = '/OrderAdmin/:id' element = {<OrderDetail/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
