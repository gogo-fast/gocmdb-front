import React, {Component} from "react";
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
    Popconfirm,
    notification,
    Icon,
} from "antd";
import instanceStatusMap from "../../../../../../config/instanceStatus";


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
    ({tencentCloud}) => ({
        defaultRegionId: tencentCloud.defaultRegionId,
    })
)
@withRouter
class StopInstance extends Component {

    handleConfirm = () => {
        if (this.props.record && 'InstanceId' in this.props.record) {
            let {Status, InstanceId} = this.props.record;
            if (Status === instanceStatusMap.StatusStopped || Status === instanceStatusMap.StatusStopping || Status === instanceStatusMap.StatusPending) {
                openNotificationWithIcon(
                    `can not stop instance [${InstanceId}]`,
                    `instance [${Status}] can not stop`
                );
                return
            }
            this.props.dispatch({
                type: "tencentCloud/stopInstance",
                payload: {
                    platType: 'tencent',
                    regionId: this.props.defaultRegionId,
                    instanceId: InstanceId,
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
                title="Are you sure stop this instance?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <span>
                    <Icon style={{color: "#d46b08"}} type="poweroff"/> Stop
                </span>
            </Popconfirm>
        )
    }
}


export default StopInstance;
