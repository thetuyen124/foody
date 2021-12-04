import "./App.css";
import mainContext from "./context/mainContext";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./page/SignInSide/SignInSide";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Profile from "./page/Profile/Profile";
import CustomAlert from "./component/CustomAlert/CustomAlert";
import Order from "./page/Order/Order";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  return (
    <body>
      <Router>
        <mainContext.Provider
          value={{
            token,
            setToken,
            searchTerm,
            setSearchTerm,
            openAlert,
            setOpenAlert,
            severity,
            setSeverity,
            message,
            setMessage,
          }}
        >
          <Switch>
            <Route path="/login" component={SignInSide} />
            <PrivateRoute path="/profile" component={Profile} exact />;
            <PrivateRoute path="/order" component={Order} exact />;
          </Switch>
          <CustomAlert />
        </mainContext.Provider>
      </Router>
    </body>
  );
}
export default App;
