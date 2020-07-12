import React, {Component} from 'react';
import {ChartCard, Field} from 'ant-design-pro/lib/Charts';
import {Icon, Tooltip} from 'antd';
import {connect} from 'dva';
import iconStyles from '../../../../../../commons/iconfonts/icon.css'
import withRouter from 'umi/withRouter';

@connect(
    ({dashboard}) => ({
        instances: dashboard.aliInstancesStatus['cn-zhangjiakou']
    })
)
@withRouter
class AliZhangJiaKouInstanceCount extends Component {
    componentWillMount() {
        this.props.dispatch(
            {
                type: "dashboard/getInstanceCount",
                payload: {
                    platType: 'aliyun',
                    regionId: 'cn-zhangjiakou',
                }
            }
        );
    }

    render() {
        return (
            <ChartCard
                style={{minWidth: '240px'}}
                title="阿里云主机数量"
                avatar={
                    <i style={{color: '#fa8c16', fontSize: 48}} className={iconStyles['iconfont']}>&#xe66d;</i>
                }
                action={
                    <Tooltip title="每一个region单独展示">
                        <Icon type="info-circle-o"/>
                    </Tooltip>
                }
                total={() => <span dangerouslySetInnerHTML={{__html: this.props.instances && this.props.instances.length }}/>}
                footer={<Field label="华北3(张家口)" />}
            />
        )
    }
}

export default AliZhangJiaKouInstanceCount;


