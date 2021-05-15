import "./styles/main.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import Home from "./components/Homepage/Home";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Signup/Signup";
import { Basket } from "./components/Basket/Basket";
import { NewProductForm } from "./components/Admin/NewProductForm";
import { ProductPage } from "./components/ProductPage/ProductPage";

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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
