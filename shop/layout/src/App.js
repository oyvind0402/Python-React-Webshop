import "./styles/main.scss";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

let user = null;

function App() {
  return (
    <>
      <Navbar user={user} />
      <Footer />
    </>
  );
}

export default App;
