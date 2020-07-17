import React, {Component} from 'react';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import Redirect from 'umi/redirect';
import {Icon, Menu, Dropdown, Avatar, Badge} from 'antd';
import distinctArrayPush from "../../../../../utils/distinctArrayPush";
import {getMenuKeyMapFromPathName} from "../../../../../utils/parseLocation";
import ThemeSwitcher from "../components/ThemeSwitcher";
import headImg from '../../../../../../public/logo.svg';
import ItisMe from '../components/ItisMe';

import styles from './index.less';
import loadLocalStory from "../../../../../utils/loadLocalStory";
import MyBadge from "../components/MyBadge";
import {imgUrl} from "../../../../../utils/constants";


@connect(
    ({layout, avatar}) => ({
        openKeys: layout.openKeys,
        siderCollapsed: layout.siderCollapsed,
        avatarUrl: avatar.avatarUrl,
    })
)
@withRouter
class RightContent extends Component {

    componentWillMount() {
        let currentUser = loadLocalStory("user");
        if (currentUser && ("userId" in currentUser)) {
            this.props.dispatch({
                type: "avatar/loadAvatarUrl",
                payload: {
                    avatarUrl: currentUser.avatar
                }
            })
        }
    }

    handleMenuClick = ({key, keyPath}) => {
        let currentUser = loadLocalStory('user');
        if (!currentUser || !("userId" in currentUser)) {
            return
        }
        let {userId} = currentUser;
        switch (key) {
            case '/account/info':
                this.props.history.push(
                    {
                        pathname: "/account/info",
                        state: {
                            from: this.props.location.pathname,
                            user: currentUser
                        }
                    }
                );
                let infoOpenKeys = this.props.siderCollapsed ? [] : distinctArrayPush(this.props.openKeys, getMenuKeyMapFromPathName("/account/info", "/dashboard").openKeys);
                this.props.dispatch({
                    type: "layout/updateMenuKeys",
                    payload: {
                        openKeys: infoOpenKeys,
                        selectedKeys: getMenuKeyMapFromPathName("/account/info", "/dashboard").selectedKeys,
                    }
                });
                break;
            case '/account/settings':
                this.props.history.push(
                    {
                        pathname: "/account/settings",
                        state: {
                            from: this.props.location.pathname,
                            user: currentUser
                        }
                    }
                );
                let settingsOpenKeys = this.props.siderCollapsed ? [] : distinctArrayPush(this.props.openKeys, getMenuKeyMapFromPathName("/account/settings", "/dashboard").openKeys);
                this.props.dispatch({
                    type: "layout/updateMenuKeys",
                    payload: {
                        openKeys: settingsOpenKeys,
                        selectedKeys: getMenuKeyMapFromPathName("/account/settings", "/dashboard").selectedKeys,
                    }
                });
                break;
            case '/logout':
                this.props.dispatch({
                    type: "login/userLogout",
                });

                this.props.history.push({pathname: '/login'});
                let d = {};
                d[userId] = {lastPathName: this.props.location.pathname};
                localStorage.setItem('before_quit', JSON.stringify(
                    Object.assign({}, d)
                ));
                break;
        }
    };

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key={"/account/info"}>
                    <Icon type="user"/>
                    <span> Personal Information</span>
                </Menu.Item>
                <Menu.Item key={"/account/settings"}>
                    <Icon type="setting" theme="filled"/>
                    <span> Personal Settings</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key={"/logout"}>
                    {/*<GoCMDBIcon type='iconLogout' style={{fontSize: 16}}/>*/}
                    <Icon type="unlock" theme="filled"/>
                    <span> Logout</span>
                </Menu.Item>
            </Menu>
        );

        let currentUser = loadLocalStory('user');
        if (!currentUser || !("userId" in currentUser)) {
            return <Redirect to="/login"></Redirect>
        }
        let {userName} = currentUser;
        if (userName === undefined) {
            userName = 'Guest'
        }

        return (
            <div className={styles['header-right-items']}>
                <div className={styles['right-item']}>
                    <ThemeSwitcher/>
                </div>

                <div className={styles['right-item']}>
                    <Avatar size="large" src={this.props.avatarUrl ? `${imgUrl}${this.props.avatarUrl}` : headImg}/>
                </div>

                <div className={styles['right-item']}>
                    <MyBadge/>
                </div>

                <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    className={styles['right-item']}
                >
                    {/*should wrapper with span*/}
                    <span>
                        <ItisMe/>
                    </span>
                </Dropdown>
            </div>
        )
    }
}


export default RightContent;
