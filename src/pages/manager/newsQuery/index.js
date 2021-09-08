import "./index.css";
import { Form, Input, Button, Table, Space, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewsQuery() {
  const [form] = Form.useForm();
  const [queryList, setState] = useState([]);
  const [totalNews, setTotalNews] = useState(0);

  const columns = [
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
          <Button onClick={() => delNews(record)}>删除</Button>
        </Space>
      ),
    },
  ];
  //删除新闻
  const delNews = (record) => {
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

  //查询新闻
  const queryNews = (newsId, title, startDate, endDate, page = 1) => {
    axios({
      url: "/news/query",
      method: "get",
      params: {
        newsId,
        title,
        startDate,
        endDate,
        page,
      },
      headers: { "X-Token": sessionStorage.getItem("token") },
      baseURL: "http://127.0.0.1:8086",
    }).then((res) => {
      setState(res.data.data.list);
      setTotalNews(res.data.data.total);
    });
  };
  const onFinish = (values) => {
    queryNews(values.newsId, values.title, values.startDate, values.endDate, 1);
  };
  //页数改变
  const onPageChange = (page) => {
    queryNews("", "", "", "", page);
  };

  return (
    <div className="news_query">
      <div className="news_list">
        <h3>新闻查询</h3>
        <div className="search_bar">
          <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item name="newsId">
              <Input placeholder="编号" />
            </Form.Item>
            <Form.Item name="title">
              <Input placeholder="标题" />
            </Form.Item>
            <Form.Item name="startDate">
              <Input placeholder="开始日期" />
            </Form.Item>
            <Form.Item name="endDate">
              <Input placeholder="截至日期" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "7px" }}
              >
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={queryList}
          pagination={{
            pageSize: 10,
            onChange: onPageChange,
            total: totalNews,
          }}
        />
      </div>
    </div>
  );
}

export default NewsQuery;
