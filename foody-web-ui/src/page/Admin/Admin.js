import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PageHeader, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import UserDialog from "../../component/CustomDialog/UserDialog";
import { httpClient } from "../../share/httpClient";
import mainContext from "../../context/mainContext";
import Spin from "../../component/Spin/Spin";
import moment from "moment";
import { useHistory } from "react-router";
import { decodeToken } from "react-jwt";
const Admin = () => {
  const [userPopup, setUserPopup] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const username = decodeToken(token).sub;
  const history = useHistory();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "firstName",
      key: "firstName",
      ellipsis: true,
    },
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
    },
    {
      title: "CMT/CCCD",
      dataIndex: "idNumber",
      key: "idNumber",
      ellipsis: true,
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "Loại tài khoản",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        switch (text) {
          case "-1":
            return "New account";
          case "00":
            return "Available";
          case "01":
            return "Disabled";
          default:
            break;
        }
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      ellipsis: true,
      render: (text, record) => (
        <>
          <a onClick={() => history.push("/profile/" + record.username)}>
            Edit
          </a>{" "}
          {record.state !== "01" ? (
            <a
              onClick={() => {
                disable(record.username);
                setUpdated(!updated);
              }}
            >
              Disable
            </a>
          ) : (
            <a
              onClick={() => {
                enable(record.username);
                setUpdated(!updated);
              }}
            >
              Enable
            </a>
          )}
        </>
      ),
    },
  ];
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
  ];
  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get("api/v1/location/" + username, token)
      .then((res) => {
        setLocation(res.data);
        httpClient
          .get("api/v1/user?locationCode=" + res.data.locationCode, token)
          .then((res) => {
            setData(res.data);
            httpClient
              .get("api/v1/all-order")
              .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                setInvoice(res.data);
              })
              .catch((err) => setIsLoading(false));
          })
          .catch((err) => setIsLoading(false));
      })
      .catch((err) => setIsLoading(false));
  }, [updated, username]);

  const disable = (username) => {
    httpClient
      .put("api/v1/user/" + username + "/disable", token)
      .then((res) => {
        console.log(res.data);
        setOpenAlert(true);
        setMessage("Disable successfully");
        setSeverity("success");
      })
      .catch((err) => {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      });
  };

  const enable = (username) => {
    httpClient
      .put("api/v1/user/" + username + "/enable", token)
      .then((res) => {
        console.log(res.data);
        setOpenAlert(true);
        setMessage("Enable successfully");
        setSeverity("success");
      })
      .catch((err) => {
        console.log(err);
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      });
  };

  const onRowClick = (record) => {
    setUserPopup(record);
    setOpenDialog(true);
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
          title={
            "Bạn là admin tại : " +
            location.commune +
            " - " +
            location.district +
            " - " +
            location.province
          }
        />
        <div className="display-table">
          <div className="title">Danh sách tài khoản người dùng</div>
          <Table
            columns={columns}
            dataSource={data}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click row
                onDoubleClick: (event) => {
                  onRowClick(record);
                }, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
        </div>
        <div className="display-table">
          <div className="title">Danh sách đơn hàng</div>
          <Table
            columns={columns2}
            dataSource={invoice}
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
      <UserDialog
        title="Chi tiết người dùng"
        open={openDialog}
        setOpen={setOpenDialog}
        data={userPopup}
      />
      <Footer />
    </>
  );
};
export default Admin;
