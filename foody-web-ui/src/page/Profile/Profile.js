import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { httpClient } from "../../share/httpClient";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { decodeToken } from "react-jwt";
import Spin from "../../component/Spin/Spin";
import * as yup from "yup";
import { useFormik } from "formik";
import mainContext from "../../context/mainContext";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your FirstName")
    .required("FirstName is required"),
  lastName: yup.string("Enter your LastName").required("lastName is required"),
  phoneNumber: yup
    .string("Enter your phoneNumber")
    .matches(/0[1-9][0-9]{8}$/, "Enter valid phone number")
    .required("phoneNumber is required"),
});

const Profile = () => {
  const [user, setUser] = useState({});
  const [editableFieldDisable, setEditableFieldDisable] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;
  useEffect(() => {
    setSubmitting(true);
    httpClient
      .get("api/v1/user/" + username)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setSubmitting(false);
  }, [username]);

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(values);
      httpClient
        .put("api/v1/user/" + username, values)
        .then((res) => {
          setUser(res.data);
          setOpenAlert(true);
          setMessage("Update information successfully");
          setSeverity("success");
        })
        .catch((err) => {
          console.log(err.response);
        });
      setEditableFieldDisable(true);
      setSubmitting(false);
    },
  });
  const editOnclick = (evt) => {
    setEditableFieldDisable(false);
  };
  useEffect(() => {
    formik.setFieldValue("username", user.username);
    formik.setFieldValue("firstName", user.firstName);
    formik.setFieldValue("lastName", user.lastName);
    formik.setFieldValue("phoneNumber", user.phoneNumber);
    formik.setFieldValue("location", user.location);
    formik.setFieldValue("type", user.type);
    formik.setFieldValue("idNumber", user.idNumber);
    formik.setFieldValue("state", user.state);
    // eslint-disable-next-line
  }, [user]);
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
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                margin="normal"
                fullWidth
                id="username"
                name="username"
                variant="standard"
                label="Username:"
                autoComplete="off"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                defaultValue={" "}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                autoCorrect={false}
                margin="normal"
                fullWidth
                id="firstName"
                name="firstName"
                variant="standard"
                label="First Name:"
                autoComplete="off"
                InputProps={{
                  readOnly: editableFieldDisable,
                }}
              />
              <TextField
                defaultValue={" "}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                margin="normal"
                fullWidth
                id="lastName"
                name="lastName"
                variant="standard"
                label="Last Name:"
                autoComplete="off"
                InputProps={{
                  readOnly: editableFieldDisable,
                }}
              />
              <TextField
                defaultValue={" "}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                margin="normal"
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                variant="standard"
                label="PhoneNumber:"
                autoComplete="off"
                InputProps={{
                  readOnly: editableFieldDisable,
                }}
              />
              <TextField
                defaultValue={" "}
                value={formik.values.location}
                onChange={formik.handleChange}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
                margin="normal"
                fullWidth
                id="location"
                name="location"
                variant="standard"
                label="Location:"
                autoComplete="off"
                InputProps={{
                  readOnly: true,
                }}
              />
              {editableFieldDisable ? (
                <Button onClick={editOnclick} fullWidth sx={{ mt: 3, mb: 2 }}>
                  Edit your information
                </Button>
              ) : (
                <Button onClick={onSave} fullWidth sx={{ mt: 3, mb: 2 }}>
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
