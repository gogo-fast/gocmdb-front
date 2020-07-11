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
class RebootInstance extends Component {

    handleConfirm = () => {
        if (this.props.record && 'InstanceId' in this.props.record) {
            let {Status, InstanceId} = this.props.record;
            if (Status !== instanceStatusMap.StatusRunning) {
                openNotificationWithIcon(
                    `can not reboot instance [${InstanceId}]`,
                    `only instance [RUNNING] can reboot`
                );
                return
            }
            this.props.dispatch({
                type: "tencentCloud/rebootInstance",
                payload: {
                    platType: 'tencent',
                    regionId: this.props.defaultRegionId,
                    instanceId: this.props.record.InstanceId,
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
                title="Are you sure reboot this instance?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <span>
                    <Icon style={{color: "#722ed1"}} type="reload"/> Reboot
                </span>
            </Popconfirm>
        )
    }
}


export default RebootInstance;
