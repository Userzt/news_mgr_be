import "./index.css";
import { Table, Space, Button, message } from "antd";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ColumnManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [],
      totalColumn: 0,
    };
  }

  columns = [
    {
      title: "栏目编号",
      dataIndex: "columnId",
      key: "columnId",
      align: "center",
    },
    {
      title: "名称",
      dataIndex: "columnName",
      key: "columnName",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">
            <Link to="/manager/colupdate">修改</Link>
          </Button>
          <Button type="primary" onClick={() => this.delCol(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  //获取所有分类数据
  getColumnData(page) {
    axios({
      url: "/news/column/list",
      method: "get",
      params: { page },
      headers: { "X-Token": sessionStorage.getItem("token") },
      baseURL: "http://127.0.0.1:8086",
      // baseURL: 'http://127.0.0.1:8086',
    })
      .then((res) => {
        if (res.data.code === 2) {
          //将栏目信息存储到本地存储
          localStorage.setItem("colInfo", JSON.stringify(res.data.data.list));
          this.setState({
            newList: res.data.data.list,
            totalColumn: res.data.data.total,
          });
        } else if (res.data.code === 4) {
          message.success("登录过期，请重新登录");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //页数改变
  onPageChange = (page) => {
    this.getColumnData(page);
  };

  componentDidMount() {
    this.getColumnData(1);
  }

  delCol = (record) => {
    axios({
      url: "/news/column/delete",
      method: "get",
      params: {
        columnId: record.columnId,
      },
      headers: { "X-Token": sessionStorage.getItem("token") },
      baseURL: "http://127.0.0.1:8086",
    })
      .then((res) => {
        if (res.data.code === 2) {
          message.success("删除成功");
          this.getColumnData(1);
        }
      })
      .catch((err) => {
        message.warning("该栏目下存在新闻，无法删除");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="col_mgr">
        <h3>新闻的栏目管理</h3>
        <Table
          columns={this.columns}
          dataSource={this.state.newList}
          pagination={{
            pageSize: 10,
            total: this.state.totalColumn,
            onChange: this.onPageChange,
          }}
        />
      </div>
    );
  }
}

export default ColumnManager;
