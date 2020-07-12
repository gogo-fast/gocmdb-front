import React, {Component} from 'react';
import {ChartCard, Field} from 'ant-design-pro/lib/Charts';
import {Row, Col, Icon, Tooltip,} from 'antd';
import {connect} from 'dva';
import iconStyles from '../../../../../commons/iconfonts/icon.css'
import withRouter from 'umi/withRouter';

@connect(
    ({dashboard}) => ({
        total: dashboard.hostsCount
    })
)
@withRouter
class HostCount extends Component {
    componentWillMount() {
        this.props.dispatch(
            {
                type: "dashboard/getHostCount",
                payload: {
                    pageNum: 1,
                    pageSize: 1,
                }
            }
        );
    }

    render() {
        return (
            <ChartCard
                style={{minWidth: '240px'}}
                title="物理服务数量"
                avatar={
                    <i style={{color: '#08979c', fontSize: 48}} className={iconStyles['iconfont']}>&#xe664;</i>
                }
                action={
                    <Tooltip title="tips">
                        <Icon type="info-circle-o"/>
                    </Tooltip>
                }
                total={() => <span dangerouslySetInnerHTML={{__html: this.props.total}}/>}
                footer={<Field label="IDC-xxx"/>}
            />
        )
    }
}

export default HostCount;


