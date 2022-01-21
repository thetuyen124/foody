import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PageHeader, Table, Modal, Button, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import InvoiceDetailDialog from "../../component/CustomDialog/InvoiceDetailDialog";
import { httpClient } from "../../share/httpClient";
import mainContext from "../../context/mainContext";
import { decodeToken } from "react-jwt";
import moment from "moment";
import EditRowTable from "../../component/EditRowTable/EditRowTable";
import Spin from "../../component/Spin/Spin";
import QRCode from "react-qr-code";
import TextArea from "antd/lib/input/TextArea";
const Staff = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [cancel, setCancel] = useState("-1");
  const [expand, setExpand] = useState("");
  const [note, setNote] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState(false);
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;

  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "buyer",
      key: "buyer",
      ellipsis: true,
      render: (text, record) => {
        return text.firstName;
      },
    },
    {
      title: "Họ",
      dataIndex: "buyer",
      key: "buyer",
      ellipsis: true,
      render: (text, record) => {
        return text.lastName;
      },
    },
    {
      title: "Ngày đặt",
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
          case "-1":
            return "Waiting";
          case "02":
            return "Paid";
          default:
            break;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
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
          default:
            break;
        }
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: "120px",
      render: (text, record) => (
        <>
          <a
            onClick={() => {
              handleAccept(record.id);
            }}
          >
            Accept
          </a>{" "}
          <a onClick={() => setCancel(record.id)}>Cancel</a>
        </>
      ),
    },
  ];
  const handleAccept = (id) => {
    httpClient
      .put("api/v1/staff/order/" + id)
      .then((res) => {
        setOpenAlert(true);
        setMessage("Accept successfully");
        setSeverity("success");
        setUpdated(!updated);
      })
      .catch((err) => {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      });
  };

  const HandleCancel = () => {
    httpClient
      .put(
        "api/v1/staff/decline-order",
        {
          id: cancel,
          note: note,
        },
        token
      )
      .then((res) => {
        console.log(res.data);
        setUpdated(!updated);
        setOpenAlert(true);
        setMessage("Cancel successfully");
        setSeverity("success");
        setCancel("-1");
      })
      .catch((err) => {
        setOpenAlert(true);
        setSeverity("error");
        setMessage(err.response.data);
      });
  };

  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "buyer",
      key: "buyer",
      ellipsis: true,
      render: (text, record) => {
        return text.firstName;
      },
    },
    {
      title: "Họ",
      dataIndex: "buyer",
      key: "buyer",
      ellipsis: true,
      render: (text, record) => {
        return text.lastName;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
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
          case "01":
            return "Paid";
          default:
            break;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
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
          default:
            break;
        }
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: "120px",
      render: (text, record) => (
        <>
          <a
            onClick={() => {
              setOpen(true);
              setInvoice(record);
            }}
          >
            Finish
          </a>
        </>
      ),
    },
  ];

  const save = (name, data) => {
    setIsLoading(true);
    httpClient
      .put(`api/v1/staff/order/` + expand + `/${name}`, data)
      .then((res) => {
        console.log(res.data);
        setOpenAlert(true);
        setMessage("Update successfully");
        setSeverity("success");
        setIsLoading(false);
        setUpdated(!updated);
      })
      .catch((err) => {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    httpClient.get("api/v1/orders?handler=" + username).then((res) => {
      setData1(res.data);
      httpClient.get("api/v1/order-active").then((res) => {
        console.log(res.data);
        setData2(res.data);
        setIsLoading(false);
      });
    });
  }, [username, updated]);

  const getInvoiceDetails = (id) => {
    httpClient
      .get("api/v1/order?id=" + id, token)
      .then((res) => {
        console.log(res.data);
        setInvoiceDetail(res.data);
      })
      .catch((err) => console.log(err.data));
  };

  const confirm = (id, payment) => {
    setIsLoading(true);
    httpClient
      .put(`api/v1/order/${id}/finish?payment=${payment}`)
      .then((res) => {
        setSeverity("success");
        setOpenAlert(true);
        setMessage("Finished");
        setIsLoading(false);
        setUpdated(!updated);
      })
      .catch((err) => {
        setSeverity("error");
        setOpenAlert(true);
        setMessage(err.response.data);
        setIsLoading(false);
      });
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Spin state={isLoading} />
      <div className="container">
        <PageHeader
          style={{ fontSize: 20 }}
          backIcon={null}
          className="site-page-header"
          onBack={() => null}
          title="Bạn là staff tại : Ha noi - Dong Da - Trung Liet"
        />
        <div className="display-table">
          <div className="title">Danh sách đơn hàng bạn đang xử lý</div>
          <Table
            columns={columns1}
            dataSource={data1}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
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
                  <EditRowTable
                    setData={setInvoiceDetail}
                    data={invoiceDetail}
                    saveF={save}
                  />
                );
              },
              rowExpandable: (record) => record.id === expand,
            }}
          />
          <div className="title">Danh sách đơn hàng cần xử lý</div>
          <Table
            columns={columns2}
            dataSource={data2}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
        </div>
      </div>
      <Modal
        title="Xác nhận thanh toán"
        visible={open}
        closable={true}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {!display ? (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => setDisplay(true)}>Thanh toán bằng mã QR</a>
            <br />
            <Popconfirm
              title="Xác nhận hoàn thành đơn hàng?"
              onConfirm={() => confirm(invoice.id, "02")}
              onCancel={() => setOpen(false)}
              okText="Yes"
              cancelText="No"
            >
              <a>Thanh toán bằng tiền mặt</a>
            </Popconfirm>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <QRCode
              value={
                invoice.buyer.username + "-" + invoice.price + "-" + invoice.id
              }
            />
            <br />
            <Button onClick={() => confirm(invoice.id, "02")}>Xác nhận</Button>
          </div>
        )}
      </Modal>
      <Modal
        title="Xác nhận huỷ"
        visible={cancel !== "-1"}
        closable={true}
        onCancel={() => setCancel("-1")}
        onOk={HandleCancel}
      >
        <PageHeader
          style={{ fontSize: 20 }}
          backIcon={null}
          className="site-page-header"
          onBack={() => null}
          title="Nhập lí do huỷ đơn"
        />
        <TextArea
          rows={4}
          value={note}
          onChange={(evt) => setNote(evt.target.value)}
        />
      </Modal>
      <Footer />
    </>
  );
};
export default Staff;
