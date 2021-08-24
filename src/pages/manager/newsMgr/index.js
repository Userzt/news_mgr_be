import './index.css'
import { Table, Space, Button, notification } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const columns = [
    {
        title: '新闻编号',
        dataIndex: 'newsId',
        key: 'newsId',
        align: 'center'
    },
    {
        title: '新闻标题',
        dataIndex: 'title',
        key: 'title',
        align: 'center'
    },
    {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (
            <Space size="middle">
                <Button><Link to='/manager/colupdate'>修改</Link></Button>
                <Button onClick={() => delNews(record)}>删除</Button>
                <Button><Link to='/manager/newsdetail'>查看</Link></Button>
            </Space>
        ),
    },
];
const delNews = (record) => {
    axios({
        url: '/news/news/delete',
        method: 'get',
        data: record,
        headers: { 'X-Token': sessionStorage.getItem('token') },
        baseURL: 'http://192.168.0.254:8086',
    }).then(res => {
        if (res.data.code === 2) {
            list.push(...res.data.data.list);
        } else if (res.data.code === 4) {
            notification.success(reLogin);
        }
    }).catch(err => {
        console.log(err);
    });
}

let list = [];
const reLogin = {
    top: 20,
    description:
        '登录过期，请重新登录',
    duration: 1,
    style: { marginRight: '750px' }
}

class NewsMgr extends Component {
    state = {
        newList: []
    }
    /*     componentDidMount(props) {
            axios({
                url: '/news/column/list',
                method: 'get',
                headers: { 'X-Token': sessionStorage.getItem('token') },
                // baseURL: 'http://192.168.0.254:8086',
                baseURL: 'http://127.0.0.1:8086',
            }).then(res => {
                if (res.data.code === 2) {
                    list.push(...res.data.data.list);
                } else if (res.data.code === 4) {
                    notification.success(reLogin);
                    props.history.push('/login');
                }
            }).catch(err => {
                console.log(err);
            });
            //对list对象数组去重
            let map = new Map();
            let newList = list.filter(item =>
                (!map.has(JSON.stringify(item)) && map.set(JSON.stringify(item), 1))
            )
            this.setState({
                newList: this.state.newList.concat(...newList)
            });
        } */

    render() {
        return (
            <div className="news_mgr">
                <h3>新闻管理</h3>
                <Table columns={columns} dataSource={this.state.newList} pagination={{ pageSize: 5 }} />
            </div>
        );
    }
}


export default NewsMgr;