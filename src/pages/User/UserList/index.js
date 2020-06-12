import {connect} from 'dva'
import React, {Component} from 'react';
import {
    Table,
    Tag,
    Icon,
} from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter'

import User from "../index";
import {parseSearch, validPageSize, validPageNum} from "../../../utils/parseSearch";
import renderAction from "./action";
import TableTitle from "./components/TableTitle";
import {
    pageSizeOptions
} from '../../../utils/constants'
import UserDetails from "./components/Details";
import {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath,
} from "../../../utils/parseLocation";
import loadLocalStory from "../../../utils/loadLocalStory";


@connect(
    ({user, layout, login, loading}) => ({
        users: user.users,
        total: user.total,
        loading: loading.models.user,
        pageNum: user.userListPageNum,
        pageSize: user.userListPageSize,
    })
)
@withRouter
class UserList extends Component {

    actionFunc = (pageNum, pageSize) => {
        let currentUser = loadLocalStory('user');
        if (!("userId" in currentUser)) {
            return
        }
        this.props.dispatch(
            {
                type: "user/loadUsers",
                payload: {
                    userId: currentUser.userId,
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        )
    };

    componentWillMount() {
        let {page, size} = parseSearch(this.props.location.search);
        let [pageNum, pageSize] = [validPageNum(page), validPageSize(size, pageSizeOptions)];
        this.props.dispatch({
            type: "user/setPagination",
            payload: {
                userListPageNum: pageNum,
                userListPageSize: pageSize,
            }
        });

        // do not use this.props.pageNum and this.props.pageSize
        // because they are still old values.
        this.actionFunc(pageNum, pageSize);

        let pathName = this.props.location.pathname;
        this.props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                selectedKeys: getMenuKeyMapFromPathName(pathName, "/home").selectedKeys,
            }
        })
    }

    getUrl = (pageNum, pageSize) => {
        return `/user/list?page=${pageNum}&size=${pageSize}`
    };

    pageChange = (pageNum, pageSize) => {
        this.props.dispatch({
            type: "user/setPagination",
            payload: {
                userListPageNum: pageNum,
                userListPageSize: pageSize,
            }
        });
        this.actionFunc(pageNum, pageSize);
    };

    onShowSizeChange = (pageNum, pageSize) => {
        this.props.dispatch({
            type: "user/setPagination",
            payload: {
                userListPageNum: pageNum,
                userListPageSize: pageSize,
            }
        });
        this.actionFunc(pageNum, pageSize);
    };

    // make sure url and current data are synchronous
    itemRender = (page, type, originalElement) => {
        // if (page === 0)
        //     return originalElement;
        if (type === 'jump-prev')
            return (
                <Link to={this.getUrl(page, this.props.pageSize)}>
                    <div className="ant-pagination-item-container">
                        <Icon className="anticon-double-left ant-pagination-item-link-icon"
                              type="double-left"/>
                        <span className="ant-pagination-item-ellipsis">•••</span>
                    </div>
                </Link>
            );
        if (type === 'jump-next')
            return (
                <Link to={this.getUrl(page, this.props.pageSize)}>
                    <div className="ant-pagination-item-container">
                        <Icon className="ant-pagination-item-link-icon" type="double-right"/>
                        <span className="ant-pagination-item-ellipsis">•••</span>
                    </div>
                </Link>
            );
        if (type === 'prev')
            return (
                <Link to={this.getUrl(page, this.props.pageSize)}>
                    <Icon type="caret-left"/>
                </Link>
            );
        if (type === 'next')
            return (
                <Link to={this.getUrl(page, this.props.pageSize)}>
                    <Icon type="caret-right"/>
                </Link>
            );
        if (type === 'page')
            return <Link to={this.getUrl(page, this.props.pageSize)}>{page}</Link>;
    };

    titleFunc = () => {
        return (
            <TableTitle/>
        )
    };

    expandedRowRender = (record, index, indent, expanded) => {
        return (
            <UserDetails record={record}/>
        )
    };

    render() {
        const colMap = {
            'userId': 'User ID',
            'userType': 'User Roles',
            'userStatus': 'User Status',
            'userName': 'User Name'
        };
        let columns = [];
        let firstRecord = this.props.users[0];
        for (let k in firstRecord) {
            if (k === "key") continue;
            let column = {};
            column.align = 'center';
            column.title = colMap[k];
            column.dataIndex = k;
            column.key = k;
            if (k === 'userType') {
                column.render = userType => {
                    if (userType === '0') {
                        return (<Tag color={'green'}>Admin</Tag>);
                    } else if (userType === '1') {
                        return (<Tag color={'geekblue'}>User</Tag>);
                    }
                }
            }
            if (k === 'userStatus') {
                column.render = userStatus => {
                    if (userStatus === '0') {
                        return (<Tag color={'green'}>Enable</Tag>);
                    } else if (userStatus === '1') {
                        return (<Tag color={'#8c8c8c'}>Disabled</Tag>);
                    } else if (userStatus === '2') {
                        return (<Tag color={'#000000'}>Deleted</Tag>);
                    }
                }
            }
            if (k === 'userId') {
                column.width = '70px'
            }
            columns.push(column)
        }

        if (columns.length !== 0) {
            renderAction(columns)
        }

        this.props.users.map(
            (value) => {
                value.key = value.userId;
            }
        );

        return (
            <User>
                <Table
                    bordered
                    size="small"
                    title={this.titleFunc}
                    columns={columns}
                    dataSource={this.props.users}
                    loading={this.props.loading}
                    pagination={{
                        total: this.props.total,
                        pageSize: this.props.pageSize,
                        current: this.props.pageNum,
                        // defaultCurrent: this.props.pageNum,  // we'd better use current other than defaultCurrent
                        pageSizeOptions: pageSizeOptions,
                        showSizeChanger: true,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.pageChange,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                        itemRender: this.itemRender
                    }}
                    expandedRowRender={this.expandedRowRender}
                >
                </Table>
            </User>
        )
    }
}


export default UserList;

