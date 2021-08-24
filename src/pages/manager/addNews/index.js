import './index.css'
import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Upload, } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import E from 'wangeditor';


let editor = null

function AddNews() {

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
    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        console.log(getText());
        /*  axios({
             url: '/news/column/add',
             method: 'post',
             data: `columnName=${values.columnName}`,
             headers: { 'content-type': 'application/x-www-form-urlencoded', 'X-Token': sessionStorage.getItem('token') },
             // baseURL: 'http://192.168.0.254:8086',
             baseURL: 'http://127.0.0.1:8086',
         }).then(res => {
             if (res.data.code === 2) {
                 notification.success(suc); 
             }else if(res.data.code === 4){
                 notification.success(reLogin);
                 props.history.push('/login');
             }
         }).catch(err => {
             notification.error(fail);
             console.log(err);
         });
          */
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
            editor.destroy()
        }
    }, [])

    // 获取编辑器的text
    function getText() {
        return editor.txt.text();
    }
    return (
        <div className='add_news'>
            <h3>新闻添加</h3>
            <Form {...layout} className='add_form' form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="新闻标题"
                    rules={[
                        {
                            required: true,
                            message: '请填写新闻标题'
                        },
                    ]}
                >
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="新闻作者"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item
                    name="sort"
                    label="新闻分类"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    height='100'
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label='新闻内容'>
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
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className='subBtn'>
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