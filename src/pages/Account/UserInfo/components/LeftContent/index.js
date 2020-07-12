import React, {Component} from 'react';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {Card, Icon, Avatar, Divider, Upload, message} from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import loadLocalStory from "../../../../../utils/loadLocalStory";
import {formatDayTime, formatTimeStamp} from '../../../../../utils/parseTime';

import 'ant-design-pro/dist/ant-design-pro.css'
import styles from './index.less'
import AvatarUpload from "./components/AvatarUpload";
import MyDetails from "./components/MyDetails";


const {Meta} = Card;


@connect(
    ({login}) => ({
        currentUser: login.currentUser,
    })
)
@withRouter
class LeftContent extends Component {

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
            <div className={styles.container}>
                <Card
                    bordered={false}
                    loading={this.props.loading}
                    cover={<AvatarUpload/>}
                >
                    {/*<Meta*/}
                    {/*    title={userName}*/}
                    {/*    description="This is the user information"*/}
                    {/*/>*/}
                    {/*<Divider/>*/}
                    {/*<div>*/}
                    {/*    <MyDetails/>*/}
                    {/*</div>*/}
                </Card>
            </div>
        );
    }
}

export default LeftContent;


