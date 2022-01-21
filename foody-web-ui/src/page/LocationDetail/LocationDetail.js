import { FileUploadOutlined } from "@mui/icons-material";
import { Button, Divider, Form, Input, Modal, Table, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "antd/dist/antd.css";
import { httpClient } from "../../share/httpClient";
import mainContext from "../../context/mainContext";
import OpenFile from "../../component/OpenFile/OpenFile";
import Spin from "../../component/Spin/Spin";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const LocationDetail = () => {
  let { locationCode } = useParams();
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  useEffect(() => {
    httpClient
      .get("api/v1/user?locationCode=" + locationCode, token)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
  }, [locationCode, updated]);
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
            return "New Account";
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
          {text.state !== "01" ? (
            <a
              onClick={() => {
                disable(text.username);
                setUpdated(!updated);
              }}
            >
              Disable
            </a>
          ) : (
            <a
              onClick={() => {
                enable(text.username);
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
        console.log(err);
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

  const onFinish = (values) => {
    values["location"] = locationCode;
    console.log(values);
    setIsLoading(true);
    form
      .validateFields()
      .then(() => {
        httpClient
          .post("api/v1/user", [values], token)
          .then((res) => {
            console.log(res.data);
            if (res.data[0].state) {
              setIsLoading(false);
              setOpenAlert(true);
              setSeverity("success");
              setMessage("Create successfully");
            } else {
              setIsLoading(false);
              setOpenAlert(true);
              setSeverity("error");
              setMessage(res.data[0].note);
            }
            setUpdated(!updated);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error.response);
            setOpenAlert(true);
            setSeverity("error");
            setMessage(error.response.data);
          });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const handleCreate = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header />
      <Spin state={isLoading} />
      <div className="container">
        <div className="display-table">
          <div className="title">
            Danh sách người dùng
            <Button
              type="primary"
              danger
              className="add"
              onClick={handleCreate}
            >
              Tạo mới
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={users}
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
        visible={open}
        title={"Tạo tài khoản"}
        onCancel={handleCreate}
        footer={null}
      >
        <Button
          type="primary"
          // icon={<FileUploadOutlined />}
        >
          <OpenFile
            locationCode={locationCode}
            setIsLoading={setIsLoading}
            setUpdated={setUpdated}
            updated={updated}
          />
        </Button>
        <Divider orientation="left">Tạo một tài khoản</Divider>
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item name="firstName" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Họ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="idNumber"
            label="CMT/CCCD"
            rules={[{ required: true, pattern: /^[0-9]{8,14}$/ }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                pattern: /^[0][1-9][0-9]{8}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="STAFF">STAFF</Option>
              <Option value="USER">USER</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" danger>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};
export default LocationDetail;
