import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog(props) {
  const { open, setOpen, product, title, editAble } = props;

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
                <strong style={{ fontWeight: 700 }}>Tên sản phẩm: </strong>
                {product.name}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Số lượng: </strong>
                {product.quantity}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Đơn vị: </strong>
                {product.unit}
              </li>
              <li>
                <strong style={{ fontWeight: 700 }}>Ghi chú: </strong>
                {product.note}
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
