import React, {Component} from 'react';
import {ChartCard, Field} from 'ant-design-pro/lib/Charts';
import {Icon, Tooltip} from 'antd';
import {connect} from 'dva';
import iconStyles from '../../../../../../commons/iconfonts/icon.css'
import withRouter from 'umi/withRouter';

@connect(
    ({dashboard}) => ({
        instances: dashboard.tencentInstancesStatus['ap-beijing']
    })
)
@withRouter
class TencentInstanceCount extends Component {
    componentDidMount() {
        this.props.dispatch(
            {
                type: "dashboard/getInstanceCount",
                payload: {
                    platType: 'tencent',
                    regionId: 'ap-beijing',
                }
            }
        );
    }

    render() {
        return (
            <ChartCard
                style={{minWidth: '240px'}}
                title="腾讯云主机数量"
                avatar={
                    <i style={{color: '#096dd9', fontSize: 48}} className={iconStyles['iconfont']}>&#xe747;</i>
                }
                action={
                    <Tooltip title="每一个region单独展示">
                        <Icon type="info-circle-o"/>
                    </Tooltip>
                }
                total={() => <span dangerouslySetInnerHTML={{__html: this.props.instances && this.props.instances.length}}/>}
                footer={<Field label="华北地区(北京)"/>}
            />
        )
    }
}

export default TencentInstanceCount;


