import Account from "../index";
import React, {Component} from 'react'
import withRouter from 'umi/withRouter';
import {connect} from 'dva'
import {Divider} from 'antd';
import LeftContent from "./components/LeftContent";
import RightContent from "./components/RightContent";
import AccountInformationPageHeader from "./components/InfomationPageHeader";
import styles from './index.less';

@connect()
@withRouter
class UserInfo extends Component {

    render() {
        return (
            <Account>
                <AccountInformationPageHeader/>
                <Divider type={'horizontal'}/>
                <div className={styles['user-info-container']}>
                    <div className={styles['left-content']}>
                        <LeftContent/>
                    </div>
                    <div className={styles['right-content']}>
                        <RightContent/>
                    </div>
                </div>
            </Account>
        )
    }
}


export default UserInfo;
