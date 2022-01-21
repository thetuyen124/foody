import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UserDialog(props) {
  const { open, setOpen, data, title, editAble } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
              <li>
                <strong style={{ fontWeight: 700 }}>Username: </strong>
                {data.username}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Tên: </strong>
                {data.firstName}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Họ: </strong>
                {data.lastName}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Số điện thoại: </strong>
                {data.phoneNumber}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Số CMND/CCCD: </strong>
                {data.idNumber}
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        {editAble ? (
          <DialogActions>
            <Button onClick={handleClose}>Sửa</Button>
            <Button onClick={handleClose}>Xoá</Button>
          </DialogActions>
        ) : (
          ""
        )}
      </Dialog>
    </div>
  );
}
