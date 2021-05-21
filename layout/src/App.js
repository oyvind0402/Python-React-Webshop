import "./styles/main.scss";

<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
=======
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
>>>>>>> feature/toPayment
import { Footer } from "./components/Footer/Footer";
import Home from "./components/Homepage/Home";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Signup/Signup";
import { Basket } from "./components/Basket/Basket";
import { NewProductForm } from "./components/Admin/NewProductForm";
import { ProductPage } from "./components/ProductPage/ProductPage";
import AdminPage from "./components/Admin/AdminPage";
import DeleteProduct from "./components/Admin/DeleteProduct";
import UserPage from "./components/Login/UserPage";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UpdateProductPage from "./components/Admin/UpdateProductPage";
import { Error404 } from "./components/Error404/Error404";
import { Payment } from "./components/Payment/Payment";
import { Confirmation } from "./components/Confirmation/Confirmation";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/basket" exact component={Basket} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/confirmation" exact component={Confirmation} />
        <Route path="/new" exact component={NewProductForm} />
        <Route path="/product" component={ProductPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/delete" exact component={DeleteProduct} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/update" exact component={UpdateProduct} />
        <Route path="/updateproduct" component={UpdateProductPage} />
        <Route path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
