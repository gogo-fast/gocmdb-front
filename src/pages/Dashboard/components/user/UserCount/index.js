import React, {Component} from 'react';
import {ChartCard, Field} from 'ant-design-pro/lib/Charts';
import {Row, Col, Icon, Tooltip, Card, Avatar} from 'antd';
import {connect} from 'dva';
import iconStyles from '../../../../../commons/iconfonts/icon.css'
import withRouter from 'umi/withRouter';

const {Meta} = Card;

@connect(
    ({dashboard}) => ({
        total: dashboard.usersCount
    })
)
@withRouter
class UserCount extends Component {
    componentWillMount() {
        this.props.dispatch(
            {
                type: "dashboard/getUserCount",
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
                title="Users 数量"
                avatar={
                    <i style={{color: '#c41d7f', fontSize: 48}} className={iconStyles['iconfont']}>&#xe67f;</i>
                }
                action={
                    <Tooltip title="tips">
                        <Icon type="info-circle-o"/>
                    </Tooltip>
                }
                total={() => <span dangerouslySetInnerHTML={{__html: this.props.total}}/>}
                footer={<Field label="total users of xxx company"/>}
            />
        )
    }
}

export default UserCount;


