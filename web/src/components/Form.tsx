import React, { useEffect } from "react";

import { Form, Input, InputNumber, Button } from "antd";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const validateMessages = {
  required: "${label} is required!",
};

interface Props {
  onCancel: Function;
  onSubmit: (values) => void;
  prefilled?: boolean;
  values?: any;
}
const AddPostForm = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { title, description } = values;
    props.onSubmit({
      title,
      description,
      status: true,
    });
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    props.onCancel();
  };
  useEffect(() => {
    form.setFieldsValue(props.values);
    //clear input fields on unmount
    return form.resetFields();
  }, []);

  return (
    <div>
      <Form
        form={form}
        {...layout}
        initialValues={
          props.prefilled && props.values ? props.values : undefined
        }
        onFinish={onFinish}
        onReset={() => onCancel()}
        onSuspend={() => console.log("log")}
        validateMessages={validateMessages}
      >
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
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 5,
            span: 19,
            style: { textAlign: "center" },
          }}
        >
          <Button type='primary' ghost htmlType='reset'>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPostForm;
