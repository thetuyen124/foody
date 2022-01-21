import { Form, Input, Button, PageHeader } from "antd";
import { useContext, useState } from "react";
import Spin from "../../component/Spin/Spin";
import mainContext from "../../context/mainContext";
import { httpClient } from "../../share/httpClient";
import { useHistory } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const CreateLocation = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { token, setOpenAlert, setSeverity, setMessage } =
    useContext(mainContext);
  const onFinish = (values) => {
    console.log(values);
    setIsLoading(true);
    form
      .validateFields()
      .then(() => {
        httpClient
          .post("api/v1/location", values, token)
          .then((response) => {
            setIsLoading(false);
            setOpenAlert(true);
            setSeverity("success");
            setMessage("Create successfully");
            setTimeout(() => {
              history.push("/sadmin");
            }, 1500);
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
  return (
    <>
      <Spin state={isLoading} />
      <Header />
      <div className="container">
        <PageHeader
          backIcon={null}
          className="site-page-header"
          onBack={() => null}
          title="Tạo mới khu hỗ trợ:"
        />
        <div className="display-table">
          <Form {...layout} name="nest-messages" onFinish={onFinish}>
            <Form.Item
              name="province"
              label="Tỉnh/Thành phố"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="district"
              label="Quận/Huyện"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="commune"
              label="Xã/Phường"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit" danger>
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CreateLocation;
