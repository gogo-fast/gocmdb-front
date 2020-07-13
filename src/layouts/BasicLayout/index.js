import {Component} from 'react'
import {connect} from 'dva';
import {Layout} from 'antd';
import MySider from "./Sider";
import MyHeader from "./Header";
import MainContent from "./Content";
import MyFooter from "./Footer";
import loadTheme from "../../utils/themeLoder";
import {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath,
} from "../../utils/parseLocation";
import recursiveMenus from "../../utils/recursiveMenus";
import menuList from "../../../config/menuConfig";
import withRouter from 'umi/withRouter';

import styles from './index.less'
import loadLocalStory from "../../utils/loadLocalStory";


@connect()
@withRouter
class BasicLayout extends Component {

    // initialize side menus and theme before mounting the react node.
    componentWillMount() {
        // there should reload current user from local story while refresh web page every time
        // do not get current user from models.login.currentUser, since models.login.currentUser
        // is in memory, it will lose wile refresh web page, it only exist after login action.
        let currentUser = loadLocalStory('user');
        if (!currentUser || !("userId" in currentUser)) {
            return
        }

        this.props.dispatch({
            type: "login/reStoreCurrentUserMem",
            payload: {data: currentUser}
        });

        var currentThemeData = {};
        currentThemeData = loadTheme();
        this.props.dispatch({
            type: "layout/switchTheme",
            payload: {theme: currentThemeData}
        });

        let pathName = this.props.location.pathname;
        let {userType} = currentUser;
        this.props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                menus: recursiveMenus(menuList, userType),
                openKeys: getMenuKeyMapFromPathName(pathName, "/dashboard").openKeys,
                selectedKeys: getMenuKeyMapFromPathName(pathName, '/dashboard').selectedKeys,
            }
        })
    }


    render() {
        return (
            <Layout className={styles['main-layout']}>
                <MySider/>
                <Layout>
                    <MyHeader/>
                    <MainContent>
                        {this.props.children}
                    </MainContent>
                    <MyFooter/>
                </Layout>
            </Layout>
        );
    }
}


export default BasicLayout;
