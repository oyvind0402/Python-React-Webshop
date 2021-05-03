import "./styles/main.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Homepage/Home";
import { Login } from "./components/Login/Login";
import { Basket } from "./components/Basket/Basket";
import { NewProductForm } from "./components/Admin/NewProductForm";

let user = null;

function App() {
  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/basket" component={Basket} />
        <Route path="/new" component={NewProductForm} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
