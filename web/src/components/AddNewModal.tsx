import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form, Input, InputNumber, Button } from "antd";
import { useAppContext } from "../context/provider";

const { TextArea } = Input;
interface Props {
  setModalVisible: Function;
  // onSubmit: Function;
  isVisible: boolean;
}

const ModalApp: React.FunctionComponent<Props> = (props) => {
  const { state, dispatch, getPosts, createPost } = useAppContext();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { isVisible, setModalVisible } = props;
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const validateMessages = {
    required: "${label} is required!",
  };
  const [form] = Form.useForm();

  const handleOk = async () => {
    console.log(form.getFieldsValue());
    const { title, description } = form.getFieldsValue();
    setConfirmLoading(true);
    await createPost({
      title,
      description,
      status: true,
    });
    setTimeout(() => {
      form.resetFields();
      setModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    form.resetFields();
    console.log("Clicked cancel button");
    setModalVisible(false);
  };

  return (
    <div>
      <Modal
        title='Add New Post'
        okText={"Submit"}
        centered={true}
        visible={isVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Form form={form} {...layout} validateMessages={validateMessages}>
            <Form.Item
              name={"title"}
              label='Title'
              rules={[{ required: true, message: "Please enter title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"description"}
              label='description'
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default ModalApp;
