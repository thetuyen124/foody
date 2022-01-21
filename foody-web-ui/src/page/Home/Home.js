import { useState } from "react";
import { decodeToken } from "react-jwt";
import { useHistory } from "react-router";

const Home = () => {
  const [token] = useState(localStorage.getItem("token"));
  const history = useHistory();

  const switchPage = (role) => {
    switch (role) {
      case "ROLE_SADMIN":
        history.push("/sadmin");
        break;
      case "ROLE_ADMIN":
        history.push("/admin");
        break;
      case "ROLE_STAFF":
        history.push("/staff");
        break;
      case "ROLE_USER":
        history.push("/order");
        break;
      default:
        history.push("/order");
        break;
    }
  };
  switchPage(decodeToken(token).role[1].authority);
  return <></>;
};
export default Home;
