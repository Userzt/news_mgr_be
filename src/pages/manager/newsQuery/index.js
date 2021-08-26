import NewsMgr from '../newsMgr'
import './index.css'
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

function NewsQuery() {
    const [list, setState] = useState([])

    const [form] = Form.useForm();
    const onFinish = (values) => {
        axios({
            url: '/news/query',
            method: 'get',
            params: {
                newsId: values.newsId,
                title: values.title,
                startDate: values.startDate,
                endDate: values.endDate,
            },
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://192.168.0.254:8086',
        }).then(res => {
            setState({
                list:res.data.data.list
            });
            console.log('list',list);
        })
    }

    return (
        <div className="news_query">

            <div className="news_list">

                <h3>新闻查询</h3>
                <div className="search_bar">
                    <Form
                        form={form}
                        layout='inline'
                        onFinish={onFinish}
                    >
                        <Form.Item name='newsId'>
                            <Input placeholder="编号" />
                        </Form.Item>
                        <Form.Item name='title'>
                            <Input placeholder="标题" />
                        </Form.Item>
                        <Form.Item name='startDate'>
                            <Input placeholder="开始日期" />
                        </Form.Item>
                        <Form.Item name='endDate'>
                            <Input placeholder="截至日期" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ borderRadius: '7px' }}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <NewsMgr name={list} />

            </div>
        </div>
    );
}

export default NewsQuery;