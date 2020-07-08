import {connect} from 'dva'
import React, {Component} from 'react';
import withRouter from 'umi/withRouter'
import {
    Divider,
    Button,
    Icon,
    Modal,
    Form,
    Radio,
    notification,
    message,
} from 'antd';
import {parseSearch} from "../../../utils/parseSearch";
import loadLocalStory from "../../../utils/loadLocalStory";


const {confirm} = Modal;

const openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
        message: msg,
        description: desc,
    });
};

@connect()
@withRouter
class StopHost extends Component {
    handlerOk = () => {
        console.log(this.props.record);
        if (this.props.record && 'clusterIp' in this.props.record) {
            if (!this.props.record.isOnline) {
                openNotificationWithIcon('error', 'this host is offline', ' can not stop a offline host.');
                return
            }
            this.props.dispatch({
                type: "host/stopHost",
                payload: {
                    uuid: this.props.record.uuid,
                    clusterIp: this.props.record.clusterIp,
                }
            })
        }
    };

    showStopConfirm = () => {
        let _this = this;
        confirm({
            title: <p>Do you Want to stop the host? <br/>hostname: {_this.props.record.hostname}
                <br/>uuid: {_this.props.record.uuid}</p>,
            content: 'Please make sure what you are doing',
            width: 600,
            onOk() {
                _this.handlerOk();
            },
            // onCancel() {
            //     console.log('Cancel');
            // },
        });
    };

    render() {
        return (
            <Button icon={"poweroff"} style={{background: '#a0d911', width: '28px', height: '28px'}} size='small'
                    onClick={this.showStopConfirm}/>

        )
    }
}

@connect()
@withRouter
class DeleteHost extends Component {

    handlerOk = () => {
        let {page, size} = parseSearch(this.props.location.search);
        if (!page || !size) {
            [page, size] = [1, 5]
        }

        if (this.props.record && 'uuid' in this.props.record) {
            if (this.props.record.isOnline) {
                openNotificationWithIcon('warning', 'stop this host first', 'host is online can not be deleted.');
                return
            }
            this.props.dispatch({
                type: "host/deleteHost",
                payload: {
                    // since to reload host list after delete action, pageNum and pageSize needed here.
                    pageNum: page,
                    pageSize: size,
                    uuid: this.props.record.uuid,
                },
            })
        }
    };

    showDeleteConfirm = () => {
        let _this = this;
        confirm({
            title: <p>Do you Want to delete the host? <br/>hostname: {_this.props.record.hostname}
                <br/>uuid: {_this.props.record.uuid}</p>,
            content: 'Please make sure what you are doing',
            width: 600,
            onOk() {
                _this.handlerOk();
            },
            // onCancel() {
            //     console.log('Cancel');
            // },
        });
    };

    render() {
        return (
            <Button icon={"delete"} style={{background: '#ffa940', width: '28px', height: '28px'}} size='small'
                    onClick={this.showDeleteConfirm}/>
        )
    }
}


const renderAction = (columns) => {
    columns.push({
            align: 'center',
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <span>
                        <StopHost record={record}/>
                        <Divider type="vertical"/>
                        <DeleteHost record={record}/>
                    </span>
                )
            }
        }
    );
};


export default renderAction;

