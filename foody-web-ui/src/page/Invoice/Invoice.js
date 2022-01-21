import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PageHeader, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import UserDialog from "../../component/CustomDialog/UserDialog";
import { httpClient } from "../../share/httpClient";
import { decodeToken } from "react-jwt";
import mainContext from "../../context/mainContext";
import moment from "moment";
const Invoice = (params) => {
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;
  const [invoices, setInvoices] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [expand, setExpand] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Người xử lý",
      dataIndex: "handlerInvoice",
      key: "handlerInvoice",
      ellipsis: true,
      render: (text, record) => {
        return text ? text.firstName + " " + text.lastName : "";
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      ellipsis: true,
      render: (text, record) => {
        return moment(text).format("MMM DD YYYY");
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      ellipsis: true,
      render: (text, record) => {
        switch (text) {
          case "00":
            return "Waiting";
          case "02":
            return "Paid";
          default:
            break;
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        switch (text) {
          case "00":
            return "Waiting";
          case "01":
            return "Accepted";
          case "02":
            return "Done";
          case "03":
            return "Declined";
          default:
            break;
        }
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: "80px",
      render: (text, record) => {
        return record.state !== "03" && record.state !== "02" ? (
          <a
            onClick={() => {
              cancelInvoice(record.id);
            }}
          >
            Cancel
          </a>
        ) : (
          {}
        );
      },
    },
  ];

  const columns2 = [
    {
      title: "Product name",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text, record) => record.id.productName,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      ellipsis: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      ellipsis: true,
      render: (text, record) => {
        switch (text) {
          case "00":
            return "Waiting";
          case "01":
            return "Done";
          case "02":
            return "Decline";
        }
      },
    },
  ];

  useEffect(() => {
    httpClient.get("api/v1/order/" + username).then((res) => {
      console.log(res.data);
      setInvoices(res.data);
    });
  }, [username]);

  const getInvoiceDetails = (id) => {
    httpClient
      .get("api/v1/order?id=" + id, token)
      .then((res) => {
        console.log(res.data);
        setInvoiceDetail(res.data);
      })
      .catch((err) => console.log(err.data));
  };

  const cancelInvoice = (id) => {
    httpClient
      .put(
        "api/v1/staff/decline-order",
        {
          id: id,
          note: "user cancel",
        },
        token
      )
      .then((res) => {
        console.log(res.data);
        setUpdated(!updated);
        setOpenAlert(true);
        setMessage("Cancel successfully");
        setSeverity("success");
      })
      .catch((err) => {
        setOpenAlert(true);
        setSeverity("error");
        setMessage(err.response.data);
      });
  };
  console.log(invoices);
  return (
    <>
      <Header />
      <div className="container">
        <div className="display-table">
          <div className="title">Danh sách đơn hàng của bạn</div>
          <Table
            columns={columns}
            dataSource={invoices}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log(record.id);
                  setExpand(record.id);
                  getInvoiceDetails(record.id);
                }, // click row
                onDoubleClick: (event) => {
                  console.log(record);
                }, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            expandable={{
              expandedRowRender: (record) => {
                return (
                  <Table
                    columns={columns2}
                    dataSource={invoiceDetail}
                    pagination={false}
                  />
                );
              },
              rowExpandable: (record) =>
                record.id === expand && record.state !== "03",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Invoice;
