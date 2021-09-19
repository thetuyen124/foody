import "./App.css";
import Footer from "./page/Footer/Footer";
import Header from "./page/Header/Header";
import mainContext from "./context/mainContext";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./page/SignInSide/SignInSide";
import Content from "./page/Content/Content";

function App() {
  const [countCart, setCountCart] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <mainContext.Provider
        value={{
          countCart,
          setCountCart,
          token,
          setToken,
          showShoppingCart,
          setShowShoppingCart,
          searchTerm,
          setSearchTerm,
          setLogin,
        }}
      >
        {!login ? (
          <body>
            <Header />
            <Content />
            <Footer />
          </body>
        ) : (
          <SignInSide />
        )}
      </mainContext.Provider>
    </Router>
  );
}
export default App;
