import React, { useState } from "react";
import { Table, Form, Typography, Switch } from "antd";
import { useAppContext } from "../context/provider";
import UpdatePostForm from "./UpdatePostForm";

const EditableTable = ({ dataSource }) => {
  const { state, dispatch, getPosts, deletePost, updatePost } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState({});

  const cancel = () => {
    //close the modal and discard the values
  };

  const save = async (key) => {
    //open the modal and update posts
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "5%",
      editable: false,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "20%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      editable: true,
    },
    {
      title: "Status",
      key: "key",
      width: "5%",
      dataIndex: "status",
      render: (text, record) => (
        <Switch
          defaultChecked={false}
          checked={record.status}
          onChange={async (value: boolean) => {
            await updatePost(record.id, {
              ...record,
              status: value,
            });
          }}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link
              onClick={() => {
                console.log(record);

                setRecord(record);
                setModalVisible(true);
              }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              strong
              style={{ color: "red", marginLeft: 10 }}
              onClick={async () => await deletePost(record.id)}
            >
              Delete
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  return (
    // <Form form={form} component={false}>
    <>
      <Table
        bordered
        scroll={{ x: true }}
        dataSource={dataSource}
        columns={columns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
      <UpdatePostForm
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        values={record}
      />
    </>
    // </Form>
  );
};

export default EditableTable;
