import "./index.css";
import React, { useEffect } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import E from "wangeditor";

let editor = null;

function AddNews(props) {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values.file);
    let formData = new FormData();
    formData.set("title", values.title);
    formData.set("content", getText());
    formData.set("columnId", values.sort);
    formData.set("file", values.file.file);
    formData.set("remark", values.remark);

    axios({
      url: "/news/add",
      method: "post",
      data: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-Token": sessionStorage.getItem("token"),
      },
      baseURL: "http://127.0.0.1:8086",
      //  baseURL: 'http://127.0.0.1:8086',
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 2) {
          message.success("添加成功");
          onReset();
        } else if (res.data.code === 4) {
          alert("登录已过期，请重新登录");
          props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //重置内容
  const onReset = () => {
    form.resetFields();
    editor.txt.clear();
  };

  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E("#editor");
    editor.config.height = 200;

    /**一定要创建 */
    editor.create();
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, []);

  // 获取编辑器的text
  function getText() {
    return editor.txt.html();
  }

  //分类下拉列表
  const { Option } = Select;

  // function handleChange(value) {
  //     console.log(value);
  // }
  //栏目信息
  const colInfo = JSON.parse(localStorage.getItem("colInfo"));

  //手动上传
  const onBeforeUpload = () => {
    // beforeUpload 返回 false 后，手动上传文件。
    return false;
  };

  return (
    <div className="add_news">
      <h3>新闻添加</h3>
      <Form
        {...layout}
        className="add_form"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="新闻标题"
          rules={[
            {
              required: true,
              message: "请填写新闻标题",
            },
          ]}
        >
          <Input style={{ borderRadius: "8px" }} />
        </Form.Item>
        <Form.Item
          name="sort"
          label="新闻分类"
          rules={[
            {
              required: true,
              message: "请选择新闻分类",
            },
          ]}
        >
          <Select defaultValue="请选择" style={{ width: 330 }}>
            {colInfo &&
              colInfo.map((item) => (
                <Option key={item.columnId}>{item.columnName}</Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="file" label="新闻图片" height="100">
          <Upload listType="picture" beforeUpload={onBeforeUpload}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="新闻内容"
          rules={[{ required: true, message: "请填写新闻内容" }]}
        >
          <div className="news_content">
            <div id="editor"></div>
          </div>
        </Form.Item>

        <Form.Item
          name="remark"
          label="新闻描述"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input style={{ borderRadius: "8px" }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="subBtn">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddNews;
