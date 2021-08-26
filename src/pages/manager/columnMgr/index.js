import './index.css'
import { Table, Space, Button, notification } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ColumnManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newList: []
        }
    }

    //配置notification
    delSuc = {
        top: 20,
        description:
            '删除成功',
        duration: 1,
        style: { marginRight: '750px' }
    }
    delFail = {
        top: 20,
        description:
            '该栏目下存在新闻，无法删除',
        duration: 1,
        style: { marginRight: '750px' }
    }
    reLogin = {
        top: 20,
        description:
            '登录过期，请重新登录',
        duration: 1,
        style: { marginRight: '750px' }
    }

    columns = [
        {
            title: '栏目编号',
            dataIndex: 'columnId',
            key: 'columnId',
            align: 'center'
        },
        {
            title: '名称',
            dataIndex: 'columnName',
            key: 'columnName',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button type='primary'><Link to='/manager/colupdate'>修改</Link></Button>
                    <Button type='primary' onClick={() => this.delCol(record)}>删除</Button>
                </Space>
            ),
        },
    ];

    getData(){
        axios({
            url: '/news/column/list',
            method: 'get',
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://192.168.0.254:8086',
            // baseURL: 'http://127.0.0.1:8086',
        }).then(res => {
            if (res.data.code === 2) {
                //将栏目信息存储到本地存储
                sessionStorage.setItem('colInfo', JSON.stringify(res.data.data.list));
                this.setState({
                    newList: res.data.data.list
                })

            } else if (res.data.code === 4) {
                notification.success(this.reLogin);
                this.props.history.push('/login');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getData()
    }

    delCol = (record) => {
        axios({
            url: '/news/column/delete',
            method: 'get',
            params: {
                columnId: record.columnId
            },
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://192.168.0.254:8086',
        }).then(res => {
            if (res.data.code === 2) {
                notification.success(this.delSuc);
                this.getData();
            }
        }).catch(err => {
            notification.success(this.delFail);
            console.log(err);
        });
    }

    render() {
        return (
            <div className="col_mgr">
                <h3>新闻的栏目管理</h3>
                <Table columns={this.columns} dataSource={this.state.newList} pagination={{ pageSize: 5 }} />
            </div>
        );
    }
}


export default ColumnManager;