import "./index.css";
import { Table, Space, Button, message } from "antd";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class NewsMgr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [],
      totalNews: 0,
    };
  }
  columns = [
    {
      title: "新闻编号",
      dataIndex: "newsId",
      key: "newsId",
      align: "center",
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          <Button>
            <Link
              to="/manager/newsmodify"
              onClick={() => {
                sessionStorage.setItem("newsId", record.newsId);
              }}
            >
              修改
            </Link>
          </Button>
          <Button onClick={() => this.delNews(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  delNews = (record) => {
    axios({
      url: "/news/delete",
      method: "get",
      params: {
        newsId: record.newsId,
      },
      headers: { "X-Token": sessionStorage.getItem("token") },
      baseURL: "http://127.0.0.1:8086",
    })
      .then((res) => {
        if (res.data.code === 2) {
          message.success("删除成功");
          this.getNewsData(1);
        } else {
          alert("删除失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //获取新闻列表数据
  getNewsData(page) {
    axios({
      url: "/news/list",
      method: "get",
      params: { page },
      headers: { "X-Token": sessionStorage.getItem("token") },
      baseURL: "http://127.0.0.1:8086",
      // baseURL: 'http://127.0.0.1:8086',
    })
      .then((res) => {
        if (res.data.code === 2) {
          this.setState({
            newList: res.data.data.list,
            totalNews: res.data.data.total,
          });
        } else if (res.data.code === 4) {
          message.warning("登录过期，请重新登录");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //页数改变
  onPageChange = (page) => {
    this.getNewsData(page);
  };

  componentDidMount() {
    this.getNewsData(1);
  }

  render() {
    return (
      <div className="news_mgr">
        <h3>新闻管理</h3>
        <Table
          columns={this.columns}
          dataSource={this.state.newList}
          pagination={{
            pageSize: 10,
            onChange: this.onPageChange,
            total: this.state.totalNews,
          }}
        />
      </div>
    );
  }
}

export default NewsMgr;
