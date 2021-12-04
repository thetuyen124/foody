import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import * as yup from "yup";
import { decodeToken } from "react-jwt";
import { httpClient } from "../../share/httpClient";
import Password from "../Input/Password";
import Spin from "../Spin/Spin";
import mainContext from "../../context/mainContext";

const validationSchema = yup.object({
  oldPass: yup
    .string("Enter your current password")
    // .matches(/[a-zA-Z0-9!@#$%]{8,255}$/, "Enter valid password")
    .required("Password is required"),
  newPass: yup
    .string("Enter new password")
    .matches(/[a-zA-Z0-9!@#$%]{8,255}$/, "Enter valid password")
    .required("New password is required"),
  pass2: yup
    .string("Enter new password")
    .matches(/[a-zA-Z0-9!@#$%]{8,255}$/, "Enter valid password")
    .when("newPass", (password, field) =>
      password
        ? field
            .required()
            .oneOf([yup.ref("newPass")], "Confirm password not match", "asdas")
        : field
    )
    .required("Confirm password is required"),
});

const ChangePasswordDialog = (props) => {
  const { token, setToken, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;
  const { open, setOpen } = props;
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: { oldPass: "", newPass: "", pass2: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(values);
      httpClient
        .put("api/v1/user/" + username + "/change-password", {
          password: values.oldPass,
          newPassword: values.newPass,
        })
        .then(() => {
          setOpenAlert(true);
          setMessage("Change password successfully");
          setSeverity("success");
          handleClose();
          setToken("");
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error.response);
          setOpenAlert(true);
          setMessage(error.response.data);
          setSeverity("error");
        });
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    formik.handleSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Spin state={submitting} />
      <DialogTitle id="responsive-dialog-title">Change password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Password
            value={formik.values.oldPass}
            onChange={formik.handleChange}
            error={formik.touched.oldPass && Boolean(formik.errors.oldPass)}
            helperText={formik.touched.oldPass && formik.errors.oldPass}
            fullWidth={true}
            id="oldPass"
            name="oldPass"
            variant="standard"
            label="Old Password"
            autoComplete="off"
            required={true}
          />
          <Password
            value={formik.values.newPass}
            onChange={formik.handleChange}
            error={formik.touched.newPass && Boolean(formik.errors.newPass)}
            helperText={formik.touched.newPass && formik.errors.newPass}
            fullWidth={true}
            id="newPass"
            name="newPass"
            variant="standard"
            label="New Password"
            autoComplete="off"
            required={true}
          />
          <Password
            value={formik.values.pass2}
            onChange={formik.handleChange}
            error={formik.touched.pass2 && Boolean(formik.errors.pass2)}
            helperText={formik.touched.pass2 && formik.errors.pass2}
            fullWidth={true}
            id="pass2"
            name="pass2"
            variant="standard"
            label="Confirm New Password"
            autoComplete="off"
            required={true}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={onSave} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ChangePasswordDialog;
