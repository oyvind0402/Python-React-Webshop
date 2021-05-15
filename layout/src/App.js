import "./styles/main.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/basket" component={Basket} />
        <Route path="/new" exact component={NewProductForm} />
        <Route path="/product" component={ProductPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/delete" exact component={DeleteProduct} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/update" exact component={UpdateProduct} />
        <Route path="/updateproduct" component={UpdateProductPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
