import './index.css'
import { Table, Space, Button, notification } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class NewsMgr extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newList: []
        }
    }
     columns = [
        {
            title: '新闻编号',
            dataIndex: 'columnId',
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
            title: '创建时间',
            dataIndex: 'date',
            key: 'date',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button><Link to='/manager/newsmodify' onClick={() => { sessionStorage.setItem('newsId', record.newsId) }}>修改</Link></Button>
                    <Button onClick={() => this.delNews(record)}>删除</Button>
                </Space>
            ),
        },
    ];
    
     delNews = (record) => {
        axios({
            url: '/news/delete',
            method: 'get',
            params: {
                newsId: record.newsId
            },
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://192.168.0.254:8086',
        }).then(res => {
            if (res.data.code === 2) {
                notification.success(this.delSuc);
                this.getDate();
            } else {
                alert('修改失败')
            }
        }).catch(err => {
            console.log(err);
        });
    }
    
    //配置notification
    delSuc = {
        top: 20,
        description:
            '删除成功',
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

    //获取新闻列表数据
    getDate(){
        axios({
            url: '/news/list',
            method: 'get',
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://192.168.0.254:8086',
            // baseURL: 'http://127.0.0.1:8086',
        }).then(res => {
            if (res.data.code === 2) {
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
        this.getDate();
    }

    render() {
        return (
            <div className="news_mgr">
                <h3>新闻管理</h3>
                <Table columns={this.columns} dataSource={this.state.newList} pagination={{ pageSize: 5 }} />
            </div>
        );
    }
}


export default NewsMgr;