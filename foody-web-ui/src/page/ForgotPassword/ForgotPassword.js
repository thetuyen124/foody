import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { httpClient } from "../../share/httpClient.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import mainContext from "../../context/mainContext";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const ForgotPassword = (params) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let { username } = useParams();
  const { setOpenAlert, setSeverity, setMessage } = useContext(mainContext);

  const handleFirstNameChange = (evt) => {
    setFirstName(evt.target.value);
  };
  const handleLastNameChange = (evt) => {
    setLastName(evt.target.value);
  };
  const handleIdNumberChange = (evt) => {
    setIdNumber(evt.target.value);
  };
  const handlePhoneNumberChange = (evt) => {
    setPhoneNumber(evt.target.value);
  };

  const onsubmit = () => {
    form
      .validateFields()
      .then(() => {
        const data = {
          firstName: firstName,
          lastName: lastName,
          idNumber: idNumber,
          phoneNumber: phoneNumber,
        };
        console.log(data);
        httpClient
          .put("api/v1/user/forgot-password/" + username, data)
          .then((response) => {
            setOpenAlert(true);
            setSeverity("success");
            setMessage("Reset password successfully");
            setTimeout(() => {
              history.push("/login");
            }, 1500);
          })
          .catch((error) => {
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
    <div className="container">
      <div className="display-table">
        <div className="title">Quên mật khẩu</div>
        <br />
        <div className="title">Điền đầy đủ thông tin phía dưới</div>
        <Form
          style={{ marginTop: "110px" }}
          {...layout}
          name="nest-messages"
          onFinish={onsubmit}
        >
          <Form.Item name="firstName" label="Tên" rules={[{ required: true }]}>
            <Input value={firstName} onChange={handleFirstNameChange} />
          </Form.Item>
          <Form.Item name="lastName" label="Họ" rules={[{ required: true }]}>
            <Input value={lastName} onChange={handleLastNameChange} />
          </Form.Item>
          <Form.Item
            name="idNumber"
            label="CMT/CCCD"
            rules={[{ required: true }]}
          >
            <Input value={idNumber} onChange={handleIdNumberChange} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input value={phoneNumber} onChange={handlePhoneNumberChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" danger>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ForgotPassword;
