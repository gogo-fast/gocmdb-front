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
class StopHost extends Component {

    handleConfirm = () => {
        if (this.props.record && 'clusterIp' in this.props.record) {
            let {isOnline, uuid, clusterIp, hostname} = this.props.record;
            if (!isOnline) {
                openNotificationWithIcon(
                    `can not stop host [${hostname}]`,
                    `host [OffLine] can not stop`
                );
                return
            }
            this.props.dispatch({
                type: "host/stopHost",
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
                    <Icon style={{color: "#d46b08"}} type="poweroff"/> Stop
                </span>
            </Popconfirm>
        )
    }
}


export default StopHost;
