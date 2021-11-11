import "./App.css";
import mainContext from "./context/mainContext";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./page/SignInSide/SignInSide";
import NormalUserPage from "./page/NormalUserPage/NormalUserPage";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import Profile from "./page/Profile/Profile";
import CustomAlert from "./component/CustomAlert/CustomAlert";

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
            <PrivateRoute path="/" component={NormalUserPage} exact />;
            <PrivateRoute path="/profile" component={Profile} exact />;
          </Switch>
          <CustomAlert />
        </mainContext.Provider>
      </Router>
    </body>
  );
}
export default App;
