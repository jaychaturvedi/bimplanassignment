import React, { useState } from "react";
import AddPostForm from "../components/Form";
import Table from "../components/Table";
import AddNewForm from "../components/AddNewModal";
import { useAppContext } from "../context/provider";
import { Button } from "antd";

export default function AdminPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { state, dispatch, getPosts, createPost } = useAppContext();
  const onSubmit = async (value) => {
    setModalVisible(false);
    await createPost(value);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Add new
        </Button>
        <AddNewForm
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
        ></AddNewForm>
      </div>
      <Table dataSource={state.posts} />
    </div>
  );
}
