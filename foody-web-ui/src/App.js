import "./App.css";
import mainContext from "./context/mainContext";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./page/SignInSide/SignInSide";
import NormalUserPage from "./page/NormalUserPage/NormalUserPage";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

function App() {
  const [countCart, setCountCart] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <body>
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
          }}
        >
          <Switch>
            <Route path="/login" component={SignInSide} />
            <PrivateRoute path="/" component={NormalUserPage} exact />;
          </Switch>
        </mainContext.Provider>
      </Router>
    </body>
  );
}
export default App;
