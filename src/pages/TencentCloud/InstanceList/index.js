import {connect} from 'dva'
import React, {Component} from 'react';
import {
    Table,
    Tag,
    Icon,
    Badge,
    Spin,
} from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter'

import TencentCloud from "../index";
import {parseSearch, validPageSize, validPageNum} from "../../../utils/parseSearch";
import renderAction from "./action";
import {
    apiWsUrl,
    pageSizeOptions
} from '../../../utils/constants'
import {
    instanceListColumnMap,
    defaultMainColumns,
} from '../../../../config/instanceListColumnMap'
import instanceStatusMap from "../../../../config/instanceStatus";
import InstanceListPageHeader from "./components/InstanceListPageHeader";
import InstanceDetails from "./components/InstanceDetails";
import CopyedText from "../../../commons/CopyedText";
import iconStyles from "../../../commons/iconfonts/icon.css";
import styles from './index.less';


@connect(
    ({tencentCloud, loading, login}) => ({
        selectedColumns: tencentCloud.selectedColumns,
        instances: tencentCloud.instances,
        total: tencentCloud.total,
        loading: loading.models.tencentCloud,
        pageNum: tencentCloud.instanceListPageNum,
        pageSize: tencentCloud.instanceListPageSize,
        defaultRegionId: tencentCloud.defaultRegionId,
        instancesWs: tencentCloud.instancesWs,
    })
)
@withRouter
class InstanceList extends Component {

    actionFunc = (regionId, pageNum, pageSize) => {
        this.props.dispatch(
            {
                type: "tencentCloud/getInstanceList",
                payload: {
                    platType: 'tencent',
                    regionId: regionId,
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        );

        let instancesWs = new WebSocket(`${apiWsUrl}/cloud/ws/instance/list?platType=tencent&regionId=${regionId}&page=${pageNum}&size=${pageSize}`);
        this.props.dispatch({
            type: "tencentCloud/updateInstanceWebSocket",
            payload: {instancesWs: instancesWs}
        });
        instancesWs.onmessage = msgEv => {
            this.props.dispatch(
                {
                    type: "tencentCloud/updateInstances",
                    payload: JSON.parse(msgEv.data),
                }
            );
        }
    };

    componentWillMount() {
        // update columns form config first before node mount
        let selectedColumns = [];
        defaultMainColumns.forEach(
            value => {
                if (value in instanceListColumnMap) {
                    selectedColumns.push(value)
                }
            }
        );
        this.props.dispatch({
            type: "tencentCloud/updateSelectedColumns",
            payload: {
                selectedColumns: selectedColumns
            },
        });

        // load regions info from tencent api
        this.props.dispatch(
            {
                type: "tencentCloud/getRegions",
                payload: {
                    platType: "tencent",
                }
            }
        );

        let {regionId, page, size} = parseSearch(this.props.location.search);
        let [pageNum, pageSize] = [validPageNum(page), validPageSize(size, pageSizeOptions)];
        this.props.dispatch({
            type: "tencentCloud/setPagination",
            payload: {
                instanceListPageNum: pageNum,
                instanceListPageSize: pageSize
            }
        });

        // do not use this.props.pageNum and this.props.pageSize in componentWillMount
        // because they are still old values.
        // this.props.defaultRegionId should be set in models.tencentCloud.
        // since old value will be used in componentWillMount
        regionId = (regionId === '' || regionId === undefined) ? this.props.defaultRegionId : regionId;
        this.actionFunc(regionId, pageNum, pageSize);

    }

    componentWillUnmount() {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

    }


    getUrl = (regionId, pageNum, pageSize) => {
        return `/cloud/tencent/instance/list?regionId=${regionId}&page=${pageNum}&size=${pageSize}`
    };

    pageChange = (pageNum, pageSize) => {
        // close old websocket conn while page number changed
        if (this.props.instancesWs) this.props.instancesWs.close();
        // update url while page number changed
        this.props.dispatch({
            type: "tencentCloud/setPagination",
            payload: {
                instanceListPageNum: pageNum,
                instanceListPageSize: pageSize
            }
        });

        this.actionFunc(this.props.defaultRegionId, pageNum, pageSize);
    };

    onShowSizeChange = (pageNum, pageSize) => {
        // close old websocket conn while page size changed
        if (this.props.instancesWs) this.props.instancesWs.close();
        // update url while page size changed
        this.props.dispatch({
            type: "tencentCloud/setPagination",
            payload: {
                instanceListPageNum: pageNum,
                instanceListPageSize: pageSize
            }
        });

        let regionId = this.props.defaultRegionId;
        // console.log(this.getUrl(regionId, pageNum, pageSize))
        // change uri while page size changed
        this.props.history.replace(this.getUrl(regionId, pageNum, pageSize));
        //// reload host list while page size changed
        this.actionFunc(regionId, pageNum, pageSize);

    };

    // make sure url and current data are synchronous
    itemRender = (page, type) => {
        let size = this.props.pageSize;
        let regionId = this.props.defaultRegionId;
        // if (page === 0)
        //     return originalElement;
        if (type === 'jump-prev')
            return (
                <Link to={this.getUrl(regionId, page, size,)}>
                    <div className="ant-pagination-item-container">
                        <Icon className="anticon-double-left ant-pagination-item-link-icon"
                              type="double-left"/>
                        <span className="ant-pagination-item-ellipsis">•••</span>
                    </div>
                </Link>
            );
        if (type === 'jump-next')
            return (
                <Link to={this.getUrl(regionId, page, size,)}>
                    <div className="ant-pagination-item-container">
                        <Icon className="ant-pagination-item-link-icon" type="double-right"/>
                        <span className="ant-pagination-item-ellipsis">•••</span>
                    </div>
                </Link>
            );
        if (type === 'prev')
            return (
                <Link to={this.getUrl(regionId, page, size,)}>
                    <Icon type="caret-left"/>
                </Link>
            );
        if (type === 'next')
            return (
                <Link to={this.getUrl(regionId, page, size,)}>
                    <Icon type="caret-right"/>
                </Link>
            );
        if (type === 'page')
            return (
                <Link to={this.getUrl(regionId, page, size,)}>
                    {page}
                </Link>
            );
    };

    expandedRowRender = (record, index, indent, expanded) => {
        let c;
        for (let i in this.props.instances) {
            if (this.props.instances[i].InstanceId === record.InstanceId) {
                c = this.props.instances[i];
                break;
            }
            c = null;
        }
        return (
            // 需要在这里传入表格扩展行的展开状态 expanded 属性，为监控子组件使用。
            c ? <InstanceDetails record={c} expanded={expanded}/> : <Spin/>
        )
    };

    render() {
        let columns = [];
        for (let k of this.props.selectedColumns) {
            let column = {};
            column.align = 'center';
            column.title = instanceListColumnMap[k];
            column.dataIndex = k;
            column.key = k;
            if (k === 'InstanceId') {
                column.render = InstanceId => <CopyedText text={InstanceId}/>
            }
            if (k === 'Status') {
                column.render = Status => {
                    switch (Status) {
                        case instanceStatusMap.StatusPending:
                            return (<Tag color={'#722ed1'}>{instanceStatusMap.StatusPending}</Tag>);
                        case instanceStatusMap.StatusRunning:
                            return (<Tag color={'#237804'}>{instanceStatusMap.StatusRunning}</Tag>);
                        case instanceStatusMap.StatusStarting:
                            return (<Tag color={'#a0d911'}>{instanceStatusMap.StatusStarting}</Tag>);
                        case instanceStatusMap.StatusStopping:
                            return (<Tag color={'#d4b106'}>{instanceStatusMap.StatusStopping}</Tag>);
                        case  instanceStatusMap.StatusStopped:
                            return (<Tag color={'#876800'}>{instanceStatusMap.StatusStopped}</Tag>);
                        case  instanceStatusMap.StatusLaunchFailed:
                            return (<Tag color={'#cf1322'}>{instanceStatusMap.StatusLaunchFailed}</Tag>);
                        case  instanceStatusMap.StatusRebooting:
                            return (<Tag color={'#13c2c2'}>{instanceStatusMap.StatusRebooting}</Tag>);
                        case  instanceStatusMap.StatusShutdown:
                            return (<Tag color={'#780650'}>{instanceStatusMap.StatusShutdown}</Tag>);
                        case  instanceStatusMap.StatusDeleting:
                            return (<Tag color={'#c41d7f'}>{instanceStatusMap.StatusDeleting}</Tag>);
                        case  instanceStatusMap.StatusUnknown:
                            return (<Tag color={'#8c8c8c'}>{instanceStatusMap.StatusUnknown}</Tag>);
                        default:
                            return (<Tag color={'#8c8c8c'}>{instanceStatusMap.StatusUnknown}</Tag>);
                    }
                };
            }
            if (k === 'Cpu') {
                column.render = Cpu => {
                    return <Badge count={Cpu} style={{backgroundColor: '#69c0ff'}}>
                        <i className={iconStyles['iconfont']}>&#xe666;</i>
                    </Badge>
                }
            }
            if (k === 'Memory') {
                column.render = Memory => {
                    return <span>{Memory} MB</span>
                }
            }
            if (k === 'InternetMaxBandwidthIn' || k === 'InternetMaxBandwidthOut') {
                column.render = Bandwidth => {
                    return <span>{Bandwidth} Mbit/s</span>
                }
            }

            columns.push(column);
        }

        if (columns.length !== 0) {
            renderAction(columns)
        }
        let instanceList = [];
        this.props.instances.map(
            (value) => {
                let data = {};
                for (let k of this.props.selectedColumns) {
                    data["key"] = value.InstanceId;
                    data[k] = value[k]
                }
                instanceList.push(data)
            }
        );


        return (
            <TencentCloud>
                <InstanceListPageHeader/>
                <div className={styles.container}>
                    <Table
                        // bordered
                        size="small"
                        columns={(this.props.instances && this.props.instances.length !== 0) ? columns : null}
                        dataSource={instanceList}
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
            </TencentCloud>
        )
    }
}


export default InstanceList;

