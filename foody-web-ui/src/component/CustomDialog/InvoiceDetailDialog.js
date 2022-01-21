import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditRowTable from "../EditRowTable/EditRowTable";

export default function UserDialog(props) {
  const { open, setOpen, data, title, columns } = props;

  const handleClose = () => {
    setOpen(false);
  };

  columns.forEach((element) => {
    element["editable"] = true;
  });
  console.log(columns);
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
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <EditRowTable columns={columns} data={data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lưu</Button>
          <Button onClick={handleClose}>Huỷ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
