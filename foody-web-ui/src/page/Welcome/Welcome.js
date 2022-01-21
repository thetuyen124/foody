import { decodeToken } from "react-jwt";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import mainContext from "../../context/mainContext";
import { httpClient } from "../../share/httpClient.js";
import Spin from "../../component/Spin/Spin";
import { Button, Input } from "antd";

const { TextArea } = Input;

const Welcome = (params) => {
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [note, setNote] = useState("");
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;
  const role = decodeToken(token).role;
  console.log(role);
  useEffect(() => {
    setIsSubmitting(true);
    httpClient
      .get("api/v1/location/" + username)
      .then((res) => {
        console.log(res);
        setLocation(res.data);
        setNote(res.data.note);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
    setEdit(false);
  }, [username, update]);

  const handleChange = (evt) => {
    setNote(evt.target.value);
  };

  const save = () => {
    setLocation((location["note"] = note));
    setIsSubmitting(true);
    httpClient
      .put("api/v1/location/" + location.locationCode, location)
      .then((res) => {
        setUpdate(!update);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Spin state={isSubmitting} />
      <Header />
      <div className="container">
        <div
          className="title"
          style={{ textAlign: "center", fontSize: "27px" }}
        >
          {location.commune ? (
            <h1>
              Chào mừng {username} đến với {location.commune}{" "}
              {location.district} {location.province}
            </h1>
          ) : (
            <h1>Chào mừng {username}</h1>
          )}
        </div>
        <div style={{ textAlign: "center", fontSize: "24px" }}>
          {!edit ? (
            location.note
          ) : (
            <TextArea rows={4} value={note} onChange={handleChange} />
          )}
          <br />
          {role[1].authority === "ROLE_ADMIN" ? (
            !edit ? (
              <Button type="primary" danger onClick={() => setEdit(true)}>
                Edit
              </Button>
            ) : (
              <Button type="primary" onClick={save}>
                Save
              </Button>
            )
          ) : (
            <br />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Welcome;
