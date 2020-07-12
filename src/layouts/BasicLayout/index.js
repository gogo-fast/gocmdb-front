import {Component} from 'react'
import {connect} from 'dva';
import {Layout} from 'antd';
import MySider from "./Sider";
import MyHeader from "./Header";
import MainContent from "./Content";
import MyFooter from "./Footer";
// import {ConfigDrawer} from "./ConfigDrawer";
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
        let {userType} = loadLocalStory('user');
        this.props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                menus: recursiveMenus(menuList, userType),
                openKeys: getMenuKeyMapFromPathName(pathName, "/home").openKeys,
                selectedKeys: getMenuKeyMapFromPathName(pathName, '/home').selectedKeys,
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
