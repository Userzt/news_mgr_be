import React from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
const breadcrumbNameMap = {//跟路由路径保持一致

    "/manager/add": "栏目管理 / 添加栏目",
    "/manager/colmgr": "栏目管理 / 管理栏目",
    "/manager/addnews": "新闻管理 / 新闻添加",
    "/manager/newsmgr": "新闻管理 / 新闻管理",
    "/manager/newsquery": "新闻管理 / 新闻查询",
};

const BreadCrumb = withRouter((props) => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                {breadcrumbNameMap[url]}
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">您当前的位置：首页</Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div className="demo">
            <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
});
export default BreadCrumb;

