import React, {Component} from 'react';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {Card, Icon, Avatar, Divider, Upload, message} from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import loadLocalStory from "../../../../utils/loadLocalStory";
import {formatDayTime, formatTimeStamp} from '../../../../utils/parseTime';

import 'ant-design-pro/dist/ant-design-pro.css'
import styles from './index.less'



const {Meta} = Card;
const {Description} = DescriptionList;


@connect(
    ({login}) => ({
        currentUser: login.currentUser,
    })
)
@withRouter
class RightContent extends Component {

    render() {
        let {
            userId,
            userName,
            userType,
            userStatus,
            gender,
            birthDay,
            tel,
            email,
            addr,
            remark,
            createdTime,
            updatedTime
        } = this.props.currentUser;

        return (
            <div>
                <Card
                    bordered={false}
                    loading={this.props.loading}
                    // cover={<AvatarUpload/>}
                >
                    <Meta
                        title={userName}
                        description="This is the user information"
                    />
                    <Divider/>
                    <DescriptionList size="large">
                        <Description term="User Role">
                            {(userType === '0')
                                ?
                                <span>
                                    Admin &nbsp;
                                    <Icon type="setting"/>
                                </span>
                                :
                                <span>
                                    user
                                </span>

                            }
                        </Description>
                        <Description term="User Status">
                            {
                                (userStatus === '0')
                                    ?
                                    <span>
                                        Enable &nbsp;
                                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
                                    </span>
                                    :
                                    <span>
                                        Disabled &nbsp;
                                        <Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d"/>
                                    </span>
                            }
                        </Description>
                        <Description term="Gender">
                            {
                                (gender === '0')
                                    ?
                                    <span>
                                        Girl &nbsp;
                                        <Icon type="woman"/>
                                    </span>
                                    :
                                    <span>
                                        Boy &nbsp;
                                        <Icon type="man"/>
                                    </span>
                            }
                        </Description>
                        <Description term="BirthDay">
                            {birthDay ? <span>{formatDayTime(birthDay)}</span> : <Icon type="question"/>}
                        </Description>
                        <Description term="Tel">
                            {tel ? tel : <Icon type="question"/>}
                        </Description>
                        <Description term="Email">
                            {email ? email : <Icon type="question"/>}
                        </Description>
                        <Description term="Addr">
                            {addr ? addr : <Icon type="question"/>}
                        </Description>
                        <Description term="Remark">
                            {remark ? remark : <Icon type="question"/>}
                        </Description>
                        <Description term="Create Time">
                            {createdTime ? <span>{formatTimeStamp(createdTime)}</span> : <Icon type="question"/>}
                        </Description>
                        <Description term="Update Time">
                            {updatedTime ? <span>{formatTimeStamp(updatedTime)}</span> : <Icon type="question"/>}
                        </Description>
                    </DescriptionList>
                </Card>
            </div>
        );
    }
}

export default RightContent;


