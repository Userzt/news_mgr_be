import './index.css'
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';




function UpdateColumn(props) {
    console.log(props);
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
    //添加成功弹框配置
    const suc = {
        top: 20,
        description:
            '修改成功',
        duration: 1,
        style: { marginRight: '750px' }
    };
    //提交失败弹框配置
    const fail = {
        top: 20,
        description:
            '修改失败',
        duration: 1,
        style: { marginRight: '750px' }
    }

    const onFinish = (values) => {
        axios({
            url: '/news/column/update',
            method: 'post',
            data: `columnId=${values.columnId}&columnName=${values.columnName}`,
            headers: { 'content-type': 'application/x-www-form-urlencoded', 'X-Token': sessionStorage.getItem('token') },
            // baseURL: 'http://192.168.0.254:8086',
            baseURL: 'http://127.0.0.1:8086',
        }).then(res => {
            console.log(res);
            if (res.data.code === 2) {
                notification.success(suc);
                props.history.push('/manager/colmgr');
            }else{
                notification.error(fail);
            }
        }).catch(err => {
            console.log(err);
        });
        
    };

    return (
        <div className="add">
            <h3>添加栏目</h3>
            <Form {...layout} className='add_form' name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="columnId"
                    label="栏目编号"
                    rules={[
                        {
                            required: true,
                            message: '请填写栏目编号'
                        },
                    ]}
                >
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item
                    name="columnName"
                    label="栏目名称"
                    rules={[
                        {
                            required: true,
                            message: '请填写栏目名称'
                        },
                    ]}
                >
                    <Input style={{ borderRadius: '8px' }} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className='subBtn'>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}



export default UpdateColumn;