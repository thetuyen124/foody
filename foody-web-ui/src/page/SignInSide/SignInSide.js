import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import mainContext from "../../context/mainContext";
import { useHistory } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import { Redirect } from "react-router-dom";

import { httpClient } from "../../share/httpClient.js";
import Spin from "../../component/Spin/Spin";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © ... "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const { token, setToken, setOpenAlert, setSeverity, setMessage } =
    React.useContext(mainContext);
  const history = useHistory();

  const [submitting, setSubmitting] = React.useState(false);

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
        history.push("/");
        break;
      default:
        history.push("/");
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var user = {
      username: data.get("username"),
      password: data.get("password"),
    };

    setSubmitting(true);
    httpClient
      .post("api/v1/authenticate", user)
      .then((res) => {
        setToken(res.data.jwttoken);
        setSubmitting(false);
        setOpenAlert(true);
        setMessage("Login successfully");
        setSeverity("success");
        localStorage.setItem("token", res.data.jwttoken);
        switchPage(decodeToken(res.data.jwttoken).role[0].authority);
      })
      .catch((error) => {
        setSubmitting(false);
        setMessage(error.response.data);
        setOpenAlert(true);
        setSeverity("error");
      });
  };

  if (!isExpired(token)) return <Redirect to="/" />;

  return (
    <ThemeProvider theme={theme}>
      <Spin state={submitting} />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
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
          md={5}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={false}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
