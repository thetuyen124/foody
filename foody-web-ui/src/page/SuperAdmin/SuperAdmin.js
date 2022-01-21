import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Button, PageHeader } from "antd";
import { useContext, useEffect, useState } from "react";
import { httpClient } from "../../share/httpClient";
import "antd/dist/antd.css";
import { useHistory } from "react-router";
import { Table } from "antd";
import Spin from "../../component/Spin/Spin";
import mainContext from "../../context/mainContext";

const Admin = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updated, setUpdated] = useState(true);
  const history = useHistory();
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const addOnclick = () => {
    history.push("/create-location");
  };

  useEffect(() => {
    httpClient
      .get("api/v1/location")
      .then((res) => {
        setLocations(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [updated]);
  const columns = [
    {
      title: "Code",
      dataIndex: "locationCode",
      key: "locationCode",
      ellipsis: true,
    },
    {
      title: "Tỉnh",
      dataIndex: "province",
      key: "province",
      ellipsis: true,
    },
    {
      title: "Huyện",
      dataIndex: "district",
      key: "district",
      ellipsis: true,
    },
    {
      title: "Xã",
      dataIndex: "commune",
      key: "commune",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      render: (text, record) => {
        switch (text) {
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
      width: "80px",
      title: "Action",
      key: "action",
      render: (text, record) => {
        return record.state === "00" ? (
          <a
            onClick={() => {
              disable(record.locationCode);
              setUpdated(!updated);
            }}
          >
            Disable
          </a>
        ) : (
          <a
            onClick={() => {
              enable(record.locationCode);
              setUpdated(!updated);
            }}
          >
            Enable
          </a>
        );
      },
    },
  ];
  const disable = (locationCode) => {
    httpClient
      .put("api/v1/location/" + locationCode + "/inactive", token)
      .then((res) => {
        console.log(res.data);
        setOpenAlert(true);
        setMessage("Disable successfully");
        setSeverity("success");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const enable = (locationCode) => {
    httpClient
      .put("api/v1/location/" + locationCode + "/reactive", token)
      .then((res) => {
        console.log(res.data);
        setOpenAlert(true);
        setMessage("Enable successfully");
        setSeverity("success");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      <Spin state={isLoading} />
      <Header />
      <div className="container">
        <PageHeader
          backIcon={null}
          className="site-page-header"
          onBack={() => null}
          title="Quản lý danh sách đã hỗ trợ:"
        />
        <div className="display-table">
          <div className="title">
            Danh sách
            <Button type="primary" danger className="add" onClick={addOnclick}>
              Tạo mới
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={locations}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click row
                onDoubleClick: (event) => {
                  history.push("/location/" + record.locationCode);
                }, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Admin;
