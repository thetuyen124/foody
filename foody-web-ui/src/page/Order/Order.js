import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { PageHeader } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { FormControl, InputAdornment, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import { GridOverlay, DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CustomDialog from "../../component/CustomDialog/CustomDialog";
import { httpClient } from "../../share/httpClient";
import mainContext from "../../context/mainContext";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Nhập tên sản phẩm")
    .max(255, "Giới hạn 255 ký tự"),
  quantity: yup
    .string()
    .matches(/^[0-9]{1,4}$/, "Số lượng chỉ được phép nhập số và nhỏ hơn 1000")
    .required("Nhập số lượng"),
  note: yup.string().max(255, "Giới hạn 255 ký tự"),
});

const StyledGridOverlay = styled(GridOverlay)(({ theme }) => ({
  flexDirection: "column",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

const Order = () => {
  const [products, setProducts] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [productPopup, setProductPopup] = useState({});
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const lastId = () => {
    console.log(products);
    const reducer = (previousValue, currentValue) =>
      previousValue.id > currentValue.id ? previousValue : currentValue;
    if (products.length === 0) {
      return 1;
    }
    console.log(products.reduce(reducer));
    return products.reduce(reducer).id + 1;
  };

  const initProduct = { id: -1, name: "", quantity: "1", note: "", unit: "Kg" };
  const columns = [
    { field: "id", hide: true },
    { field: "name", headerName: "Tên sản phẩm", editable: false, width: 130 },
    {
      field: "quantity",
      headerName: "Số lượng",
      type: "number",
      editable: false,
    },
    { field: "unit", headerName: "Đơn vị", editable: false },
    { field: "note", headerName: "Ghi chú", editable: false, width: 200 },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            id={JSON.parse(localStorage.getItem("cart")).length}
            variant="outlined"
            onClick={(e) => {
              const api = params.api;
              const thisRow = {};
              api
                .getAllColumns()
                .filter((c) => c.field !== "__check__" && !!c)
                .forEach(
                  (c) =>
                    (thisRow[c.field] = params.getValue(params.id, c.field))
                );
              setProducts(products.filter((el) => el.id !== thisRow.id));
            }}
            color="warning"
            startIcon={<DeleteForeverIcon />}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const product = useFormik({
    initialValues: initProduct,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      values.id = lastId();
      console.log(values);
      setProducts([...products, values]);
      resetForm();
    },
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const onRowClick = (GridCellParams) => {
    setProductPopup(GridCellParams.row);
    setOpenDialog(true);
  };

  const handleCreateOrder = () => {
    let data = products;
    // data.forEach((element) => {
    //   delete element.id;
    //   delete element.unit;
    // });
    console.log(data);
    httpClient
      .post("api/v1/order", data, token)
      .then((res) => {
        console.log(res.data);
        setSeverity("success");
        setOpenAlert(true);
        setMessage("Create order successfully");
        setProducts([]);
      })
      .catch((err) => {
        console.log(err.data);
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <PageHeader
          backIcon={[<FileAddOutlined />]}
          className="site-page-header"
          onBack={() => null}
          title="Tạo đơn hàng:"
        />
        <div className="display-table">
          <div className="title">Thêm sản phẩm</div>
          <ul className="list-input">
            <li style={{ width: "40%" }}>
              <TextField
                value={product.values.name}
                onChange={product.handleChange}
                error={product.touched.name && Boolean(product.errors.name)}
                helperText={product.touched.name && product.errors.name}
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                variant="standard"
                label="Tên sản phẩm"
                autoComplete="off"
                color="warning"
              />
            </li>
            <li style={{ width: "130px" }}>
              <TextField
                value={product.values.quantity}
                onChange={product.handleChange}
                error={
                  product.touched.quantity && Boolean(product.errors.quantity)
                }
                helperText={product.touched.quantity && product.errors.quantity}
                fullWidth
                margin="normal"
                required
                id="quantity"
                name="quantity"
                variant="standard"
                label="Số lượng"
                autoComplete="off"
                color="warning"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FormControl variant="standard">
                        <Select
                          value={product.values.unit}
                          color="warning"
                          onChange={product.handleChange}
                          id="unit"
                          name="unit"
                        >
                          <MenuItem value="Kg">Kg</MenuItem>
                          <MenuItem value="L">Lít</MenuItem>
                          <MenuItem value="Unit">Chiếc</MenuItem>
                          <MenuItem value="Bag">Túi/Bịch</MenuItem>
                        </Select>
                      </FormControl>
                    </InputAdornment>
                  ),
                }}
              />
            </li>
            <li style={{ width: "40%" }}>
              <TextField
                value={product.values.note}
                onChange={product.handleChange}
                error={product.touched.note && Boolean(product.errors.note)}
                helperText={product.touched.note && product.errors.note}
                margin="normal"
                fullWidth
                id="note"
                name="note"
                variant="standard"
                label="Ghi chú"
                autoComplete="off"
                color="warning"
              />
            </li>
            <li>
              <Button
                className="add-btn"
                variant="outlined"
                color="warning"
                endIcon={<AddIcon />}
                fullWidth
                onClick={product.handleSubmit}
              >
                Add
              </Button>
            </li>
          </ul>
        </div>
        <div className="display-table" style={{ height: 300 }}>
          <div className="title">Danh sách sản phẩm</div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            hideFooter
            rows={products}
            columns={columns}
            onRowDoubleClick={onRowClick}
          />
        </div>
        <Button
          className="add-btn"
          variant="outlined"
          color="warning"
          endIcon={<AddIcon />}
          fullWidth
          onClick={handleCreateOrder}
          style={{ marginBottom: 20 }}
        >
          Tạo đơn hàng
        </Button>
      </div>
      <CustomDialog
        title="Chi tiết sản phẩm"
        open={openDialog}
        setOpen={setOpenDialog}
        product={productPopup}
      />
      <Footer />
    </>
  );
};
export default Order;
