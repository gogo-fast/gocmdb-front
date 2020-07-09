import React, {Component} from "react";
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
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


@connect()
@withRouter
class RebootHost extends Component {

    handleConfirm = () => {
        if (this.props.record && 'clusterIp' in this.props.record) {
            let {isOnline, uuid, clusterIp, hostname, hostStatus} = this.props.record;
            if (hostStatus !== 0) {
                openNotificationWithIcon(
                    `can not start host [${hostname}]`,
                    `host not [Running] can not reboot`
                );
                return
            }
            this.props.dispatch({
                type: "host/rebootHost",
                payload: {
                    uuid: uuid,
                    clusterIp: clusterIp,
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
                title="Are you sure stop this host?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="left"
            >
                <span>
                    <Icon style={{color: "#722ed1"}} type="reload"/> Reboot
                </span>
            </Popconfirm>
        )
    }
}


export default RebootHost;
