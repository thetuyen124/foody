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
import SuperAdmin from "./page/SuperAdmin/SuperAdmin";
import Admin from "./page/Admin/Admin";
import Home from "./page/Home/Home";
import Welcome from "./page/Welcome/Welcome";
import CreateLocation from "./page/CreateLocation/CreateLocation";
import LocationDetail from "./page/LocationDetail/LocationDetail";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Staff from "./page/Staff/Staff";
import Invoice from "./page/Invoice/Invoice";
import OtherProfile from "./page/Profile/OtherProfile";

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
            <Route
              path="/forgot-password/:username"
              component={ForgotPassword}
              exact
            />
            <PrivateRoute path="/profile" component={Profile} exact />;
            <PrivateRoute
              path="/profile/:username"
              component={OtherProfile}
              exact
            />
            <PrivateRoute path="/order" component={Order} exact />;
            <PrivateRoute path="/sadmin" component={SuperAdmin} exact />;
            <PrivateRoute path="/admin" component={Admin} exact />;
            <PrivateRoute path="/" component={Home} exact />;
            <PrivateRoute path="/welcome" component={Welcome} exact />;
            <PrivateRoute path="/staff" component={Staff} exact />;
            <PrivateRoute path="/invoice" component={Invoice} exact />;
            <PrivateRoute
              path="/location/:locationCode"
              component={LocationDetail}
              exact
            />
            ;
            <PrivateRoute
              path="/create-location"
              component={CreateLocation}
              exact
            />
            ;
          </Switch>
          <CustomAlert />
        </mainContext.Provider>
      </Router>
    </body>
  );
}
export default App;
