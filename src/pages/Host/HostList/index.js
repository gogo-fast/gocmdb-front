import {connect} from 'dva'
import React, {Component} from 'react';
import {
    Table,
    Tag,
    Icon,
    Progress,
    Badge,
} from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

import Host from "../index";
import {parseSearch, validPageSize, validPageNum} from "../../../utils/parseSearch";
import renderAction from "./action";
import {
    pageSizeOptions
} from '../../../utils/constants'
import {
    hostListColumnMap,
    defaultMainColumns,
    expandColumns,
    mainColumns
} from '../../../../config/hostListColumnMap';
import HostDetails from "./components/Details";
import HostListPageHeader from "./components/HostListPageHeader";
import iconStyles from "../../../commons/iconfonts/icon.css";
import styles from './index.less';

@connect(
    ({host, loading}) => ({
        selectedColumns: host.selectedColumns,
        hosts: host.hosts,
        total: host.total,
        loading: loading.models.host,
        pageNum: host.hostListPageNum,
        pageSize: host.hostListPageSize,
        hostsWs: host.hostsWs,
    })
)
@withRouter
class HostList extends Component {

    actionFunc = (pageNum, pageSize) => {
        this.props.dispatch(
            {
                type: "host/getHostList",
                payload: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        );
    };

    componentWillMount() {
        // update columns form config first before node mount
        let selectedColumns = [];
        defaultMainColumns.forEach(
            value => {
                if (value in hostListColumnMap) {
                    selectedColumns.push(value)
                }
            }
        );
        this.props.dispatch({
            type: "host/updateSelectedColumns",
            payload: {
                selectedColumns: selectedColumns
            },
        });


        let {page, size} = parseSearch(this.props.location.search);
        let [pageNum, pageSize] = [validPageNum(page), validPageSize(size, pageSizeOptions)];
        this.props.dispatch({
            type: "host/setPagination",
            payload: {
                hostListPageNum: pageNum,
                hostListPageSize: pageSize,
            }
        });

        // do not use this.props.pageNum and this.props.pageSize
        // because they are still old values.
        this.actionFunc(pageNum, pageSize);
    }

    componentWillUnmount() {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.hostsWs) this.props.hostsWs.close();
    }

    getUrl = (pageNum, pageSize) => {
        return `/host/list?page=${pageNum}&size=${pageSize}`
    };

    pageChange = (pageNum, pageSize) => {
        // close old websocket conn while page number changed
        if (this.props.hostsWs) this.props.hostsWs.close();
        // update url while page number changed
        this.props.dispatch({
            type: "host/setPagination",
            payload: {
                hostListPageNum: pageNum,
                hostListPageSize: pageSize,
            }
        });
        //// since already subscribe websocket in model, this function useless。
        this.actionFunc(pageNum, pageSize);
    };

    onShowSizeChange = (pageNum, pageSize) => {
        // close old websocket conn while page size changed
        if (this.props.hostsWs) this.props.hostsWs.close();
        // update url while page size changed
        this.props.dispatch({
            type: "host/setPagination",
            payload: {
                hostListPageNum: pageNum,
                hostListPageSize: pageSize,
            }
        });
        // change uri while page size changed
        this.props.history.replace(this.getUrl(pageNum, pageSize));
        //// reload host list while page size changed
        this.actionFunc(pageNum, pageSize);
    };

    // make sure url and current data are synchronous
    itemRender = (page, type) => {
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

    expandedRowRender = (record, index, indent, expanded) => {
        return (
            <HostDetails record_uuid={record.uuid}/>
        )
    };

    render() {
        let columns = [];
        for (let k of this.props.selectedColumns) {
            let column = {};
            column.align = 'center';
            column.title = hostListColumnMap[k];
            column.dataIndex = k;
            column.key = k;
            if (k === 'isOnline') {
                column.render = isOnline => {
                    if (isOnline === true) {
                        return (<Tag color={'green'}>OnLine</Tag>);
                    } else if (isOnline === false) {
                        return (<Tag color={'red'}>OffLine</Tag>);
                    }
                }
            }
            if (k === 'hostStatus') {
                column.render = hostStatus => {
                    switch (hostStatus) {
                        case 0:
                            return (<Tag color={'#237804'}>RUNNING</Tag>);
                        case 1:
                            return (<Tag color={'#a0d911'}>STARTING</Tag>);
                        case 2:
                            return (<Tag color={'#d4b106'}>STOPPING</Tag>);
                        case 3:
                            return (<Tag color={'#876800'}>STOPPED</Tag>);
                        case 4:
                            return (<Tag color={'#fa541c'}>MAINTAINING</Tag>);
                        case 5:
                            return (<Tag color={'#1f1f1f'}>DELETED</Tag>);
                        default:
                            return (<Tag color={'#8c8c8c'}>UNKNOWN</Tag>);
                    }
                };
            }
            if (k === 'cpuCount') {
                column.render = cpuCount => {
                    return <Badge count={cpuCount} style={{backgroundColor: '#69c0ff'}}>
                        <i className={iconStyles['iconfont']}>&#xe678;</i>
                    </Badge>
                }
            }
            if (k === 'cpuUsePercent') {
                column.render = cpuUsePercent => {
                    return <Progress percent={cpuUsePercent} type={'circle'} strokeWidth={10}
                                     format={cpuUsePercent => cpuUsePercent + '%'}
                                     strokeColor={cpuUsePercent < 80 ? '#13c2c2' : '#f5222d'}
                                     width={45}/>
                }
            }
            if (k === 'ramPercent') {
                column.render = ramPercent => {
                    return <Progress percent={ramPercent} type={'circle'} strokeWidth={10}
                                     format={ramPercent => ramPercent + '%'}
                                     strokeColor={ramPercent < 80 ? '#1890ff' : '#f5222d'}
                                     width={45}/>
                }
            }
            columns.push(column);
        }

        if (columns.length !== 0) {
            renderAction(columns)
        }
        let hostList = [];
        this.props.hosts.map(
            (value) => {
                let data = {};
                for (let k of this.props.selectedColumns) {
                    data["key"] = value.id;
                    data[k] = value[k]
                }
                hostList.push(data)
            }
        );

        return (
            <Host>
                <HostListPageHeader/>
                <div className={styles.container}>
                    <Table
                        // bordered
                        tableLayout={undefined}
                        size="small"
                        columns={this.props.hosts.length !== 0 ? columns : null}
                        dataSource={hostList}
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} hosts`,
                            itemRender: this.itemRender
                        }}
                        expandedRowRender={this.expandedRowRender}
                    >
                    </Table>
                </div>
            </Host>
        )
    }
}

export default HostList;

