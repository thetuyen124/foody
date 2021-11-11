import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Password from "../Input/Password";
import Spin from "../Spin/Spin";

const validationSchema = yup.object({
  oldPass: yup
    .string("Enter your current password")
    .required("password is required"),
  newPass: yup
    .string("Enter new password")
    .required("new password is required"),
  confirmNewPass: yup
    .string("Enter new password")
    .required("new password is required"),
});

const ChangePasswordDialog = (props) => {
  const { open, setOpen } = props;
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: { oldPass: "", newPass: "", confirmNewpass: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(values);
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
            value={formik.values.confirmNewpass}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmNewpass &&
              Boolean(formik.errors.confirmNewpass)
            }
            helperText={
              formik.touched.confirmNewpass && formik.errors.confirmNewpass
            }
            fullWidth={true}
            id="confirmNewpass"
            name="confirmNewpass"
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
