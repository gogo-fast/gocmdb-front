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
    ({aliCloud}) => ({
        defaultRegionId: aliCloud.defaultRegionId,
    })
)
@withRouter
class DeleteInstance extends Component {

    handleConfirm = () => {
        if (this.props.record && 'InstanceId' in this.props.record) {
            let {Status, InstanceId} = this.props.record;
            if (Status !== "Stopped") {
                openNotificationWithIcon(
                    `can not delete instance [${InstanceId}]`,
                    `instance [${Status}] can not de delete`
                );
                return
            }
            this.props.dispatch({
                type: "aliCloud/deleteInstance",
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
                title="Are you sure delete this instance?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <Button icon={"delete"} style={{background: '#ff7a45', width: '28px', height: '28px'}} size='small'/>
            </Popconfirm>
        )
    }
}


export default DeleteInstance;
