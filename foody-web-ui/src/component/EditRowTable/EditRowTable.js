import React, { useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditRowTable = (props) => {
  const [form] = Form.useForm();
  const { data, setData, saveF } = props;
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.id.productName === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      note: "",
      quantity: "",
      price: "",
      total: "",
      state: "",
      ...record,
    });
    setEditingKey(record.id.productName);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id.productName);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        newData[index].total = newData[index].price * newData[index].quantity;
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      saveF(row.id.productName, row);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text, record) => record.id.productName,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      editable: true,
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
      editable: true,
      ellipsis: true,
      render: (text, record) => {
        switch (text) {
          case "00":
            return "Waiting";
          case "01":
            return "In process";
          case "02":
            return "Done";
          case "03":
            return "Decline";
        }
      },
    },
    {
      title: "operation",
      width: "115px",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id.productName)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "id",
      width: "0px",
      key: "id",
      editable: true,
      ellipsis: true,
      render: (text, record) => record.id.productName,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};
export default EditRowTable;
