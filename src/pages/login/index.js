import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css'
import axios from 'axios';
import React from 'react';
import { setUserInfo } from '../../store/action'
import { connect } from 'react-redux';


function Login(props) {
    
    const onFinish = (values) => {
        axios({
            url: '/sys/login',
            method: 'post',
            data: `username=${values.username}&password=${values.password}`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            baseURL: 'http://192.168.0.254:8086',
            // baseURL: 'http://127.0.0.1:8086'
        }).then(res => {
            if (res.data.code === 2) {
                sessionStorage.setItem('token', res.data.data.token);
                message.success('登录成功');
                //设置redux中的用户信息
                props.setUser(res.data.data);
                props.history.push('/manager');
            } else if (res.data.code === 4) {
                message.error('账户或密码错误');
            }
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <div className="login">
            <div className="login_wrapper">
                <div className="tit">
                    <h2>新闻管理系统</h2>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '150px' }} className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { userInfo: state.userInfo }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (userInfo) => dispatch(setUserInfo(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);