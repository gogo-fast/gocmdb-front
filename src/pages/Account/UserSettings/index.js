import Account from "../index";
import React, {Component} from 'react'
import withRouter from 'umi/withRouter';
import {connect} from 'dva'
import {
    Tabs,
    Divider,
} from 'antd';
import SecuritySettings from "./components/Security";
import BasicSettings from "./components/Basic";
import AccountSettingPageHeader from "./components/SettingPageHeader";

import styles from './index.less'

const {TabPane} = Tabs;

@connect()
@withRouter
class UserSettings extends Component {

    // callback = (key) => {
    //     console.log(key);
    // };

    render() {
        return (
            <Account>
                <AccountSettingPageHeader/>
                <div className={styles.container}>
                    <Tabs
                        className={styles['setting-tab']}
                        size={"large"}
                        tabPosition={"left"}
                        defaultActiveKey="1"
                        // onChange={this.callback}
                    >
                        <TabPane
                            tab={
                                <span className={styles['tab-title']}>
                                Basic Settings
                            </span>
                            }
                            key="1"
                        >
                            <BasicSettings/>
                        </TabPane>
                        <TabPane tab="Security Settings" key="2">
                            <SecuritySettings/>
                        </TabPane>
                    </Tabs>
                </div>
            </Account>
        )
    }
}


export default UserSettings;
