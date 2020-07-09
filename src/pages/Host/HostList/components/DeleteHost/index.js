import React, {Component} from "react";
import loadLocalStory from "../../../../../utils/loadLocalStory";
import {parseSearch} from "../../../../../utils/parseSearch";
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
    Button,
    Popconfirm,
    notification,
    Icon,
} from "antd";


const openNotificationWithIcon = (msg, desc) => {
    notification.open({
        message: msg,
        description: desc,
        style: {
            width: 600,
            marginLeft: 335 - 600,
        },
        icon: <Icon type="frown" style={{color: '#a8071a'}}/>,
    });
};


@connect(
    ({host}) => ({
        pageNum: host.hostListPageNum,
        pageSize: host.hostListPageSize,
    })
)
@withRouter
class DeleteHost extends Component {

    handleConfirm = () => {
        if (this.props.record && 'uuid' in this.props.record) {
            let {isOnline, uuid, hostname} = this.props.record;
            if (isOnline) {
                openNotificationWithIcon(
                    `can not stop host [${hostname}]`,
                    `host [OnLine] can not delete`
                );
                return
            }
            this.props.dispatch({
                type: "host/deleteHost",
                payload: {
                    // since to reload host list after delete action,
                    // pageNum and pageSize needed here.
                    pageNum: this.props.pageNum,
                    pageSize: this.props.pageSize,
                    uuid: uuid,
                },
            })
        }
    };

    handleCancel = () => {
        // console.log('!!!!!!!!!!!!')
    };

    render() {
        return (
            <Popconfirm
                title="Are you sure delete this host?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
                <span>
                    <Icon style={{color: '#a8071a'}} type="delete"/> Delete
                </span>
            </Popconfirm>
        )
    }
}


export default DeleteHost;
