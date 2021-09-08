import { Layout, Menu, notification } from 'antd';
import { UserOutlined, LaptopOutlined, HomeOutlined } from '@ant-design/icons';
import './manager.css'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../manager/home/home';
import BreadCrumb from '../../component/breadCrumb';
import { connect } from 'react-redux';
import AddColumn from './addColumn';
import ColumnManager from './columnMgr';
import UpdateColumn from '../updateCol';
import AddNews from './addNews';
import NewsMgr from './newsMgr';
import NewsQuery from './newsQuery';
import NewsModify from './newsModify';
import axios from 'axios';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function Manager(props) {

    //登录成功弹框配置
    const suc = {
        top: 20,
        description:
            '退出成功',
        duration: 1,
        style: { marginRight: '750px' }
    };

    function exit() {
        axios({
            url: '/sys/logout',
            method: 'get',
            headers: { 'X-Token': sessionStorage.getItem('token') },
            baseURL: 'http://127.0.0.1:8086',
        }).then(() => {
            notification.success(suc);
        })
        localStorage.removeItem('token');
        props.history.push('/login');
    }
    return (
        <div className="div">
            <Layout>
                <div className="header">
                    <div className="logo_wraper">
                        <h3>LOGO</h3>
                    </div>
                    <div className="mgr_tit">
                        <h2>新闻管理系统</h2>
                    </div>
                    <div className="username">
                        {props.userInfo.user.authority && <p>{ props.userInfo.user.authority } , 您好</p>}
                    </div>
                    <div className="exit">
                        <button onClick={exit}>安全退出</button>
                    </div>
                </div>
                <Layout style={{ height: '90vh' }}>
                    <Sider width={300} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key='sub3' style={{ height: "60px", fontSize: "20px", borderBottom: '1px solid #ccc' }}><HomeOutlined style={{ fontSize: "20px", marginRight: '10px' }} /><Link to='/manager/home'>首页</Link></Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="栏目管理">
                                <Menu.Item key="1"><Link to='/manager/add'>添加栏目</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/manager/colmgr'>栏目管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="新闻管理">
                                <Menu.Item key="5"><Link to='/manager/addnews'>新闻添加</Link></Menu.Item>
                                <Menu.Item key="6"><Link to='/manager/newsmgr'>新闻管理</Link></Menu.Item>
                                <Menu.Item key="7"><Link to='/manager/newsquery'>新闻查询</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <BreadCrumb />
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path='/manager/home' component={Home}></Route>
                                <Route path='/manager/add' component={AddColumn}></Route>
                                <Route path='/manager/colmgr' component={ColumnManager}></Route>
                                <Route path='/manager/colupdate' component={UpdateColumn}></Route>
                                <Route path='/manager/addnews' component={AddNews}></Route>
                                <Route path='/manager/newsmgr' component={NewsMgr}></Route>
                                <Route path='/manager/newsquery' component={NewsQuery}></Route>
                                <Route path='/manager/newsmodify' component={NewsModify}></Route>
                                <Redirect from='/manager' to='/manager/home' />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );

}

const mapStateToProps = state => {
    return { userInfo: state.userInfo }
}

const mapDispatchToProps = dispatch => {
    return { 1: 1 };
}



export default connect(mapStateToProps, mapDispatchToProps)(Manager);