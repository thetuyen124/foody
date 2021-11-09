import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { httpClient } from "../../share/httpClient";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { decodeToken } from "react-jwt";
import Spin from "../../component/Spin/Spin";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Profile = () => {
  const username = decodeToken(localStorage.getItem("token")).sub;
  const [user, setUser] = useState({});
  const [editableFieldDisable, setEditableFieldDisable] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    httpClient
      .get("api/v1/user/" + username)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [username]);
  console.log(user);

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const editOnclick = (evt) => {
    setEditableFieldDisable(false);
  };

  const onSave = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <Header />
      <Spin state={submitting} />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={2}
          md={3}
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/photos/food-backgrounds-table-filled-with-large-variety-of-food-picture-id1155240408?k=20&m=1155240408&s=612x612&w=0&h=Zvr3TwVQ-wlfBnvGrgJCtv-_P_LUcIK301rCygnirbk=)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          style={{ backgroundColor: "#b8d5b8" }}
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                defaultValue={" "}
                value={user.username}
                error={false}
                margin="normal"
                fullWidth
                id="username"
                name="username"
                variant="standard"
                label="Username:"
                disabled
              />
              <TextField
                defaultValue={" "}
                value={user.firstName}
                error={false}
                margin="normal"
                fullWidth
                id="firstName"
                name="firstName"
                variant="standard"
                label="First Name:"
                disabled={editableFieldDisable}
              />
              <TextField
                defaultValue={" "}
                value={user.lastName}
                error={false}
                margin="normal"
                fullWidth
                id="lastName"
                name="lastName"
                variant="standard"
                label="Last Name:"
                disabled={editableFieldDisable}
              />
              <TextField
                defaultValue={" "}
                value={user.phoneNumber}
                error={false}
                margin="normal"
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                variant="standard"
                label="PhoneNumber:"
                disabled={editableFieldDisable}
              />
              <TextField
                defaultValue={" "}
                value={user.location}
                error={false}
                margin="normal"
                fullWidth
                id="location"
                name="location"
                variant="standard"
                label="Location:"
                disabled
              />
              {editableFieldDisable ? (
                <Button onClick={editOnclick} fullWidth sx={{ mt: 3, mb: 2 }}>
                  Edit your information
                </Button>
              ) : (
                <Button
                  onClick={() => setEditableFieldDisable(true)}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={2}
          md={3}
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/photos/food-backgrounds-table-filled-with-large-variety-of-food-picture-id1155240408?k=20&m=1155240408&s=612x612&w=0&h=Zvr3TwVQ-wlfBnvGrgJCtv-_P_LUcIK301rCygnirbk=)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Footer />
    </>
  );
};
export default Profile;
