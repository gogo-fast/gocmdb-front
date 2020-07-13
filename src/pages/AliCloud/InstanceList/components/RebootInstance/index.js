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
    ({aliCloud}) => ({
        defaultRegionId: aliCloud.defaultRegionId,
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
                    `only instance not [Running] can be reboot`
                );
                return
            }
            this.props.dispatch({
                type: "aliCloud/rebootInstance",
                payload: {
                    platType: 'aliyun',
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
