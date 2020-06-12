/*
* deprecated / 弃用
* */
import {connect} from 'dva';
import {Drawer} from 'antd';
import SiderMenu from "../components/SiderMenu";

import Logo from "../components/Logo";


const SiderDrawer = (props) => {
    return (
        <Drawer
            // title={<Logo/>}  // if set logo here, a white line will appear underneath
            placement='left'
            closable={false}
            onClose={props.onClose}
            visible={props.siderDrawerVisible}
            width={200}
            bodyStyle={{padding: 0}}
            // drawerStyle={{background: "#001529"}}
            drawerStyle={{background: props.currentTheme.themeColor, overflow: "hidden"}}
            // className={styles['sider-drawer']}
        >
            <Logo/>
            <SiderMenu/>
        </Drawer>
    );
};


export default connect(
    state => ({
        siderDrawerVisible: state.layout.siderDrawerVisible,
        currentTheme: state.layout.theme
    }),
    {
        "onClose": () => ({type: "layout/siderDrawerTrigger", payload: {siderDrawerVisible: false}})
    }
)(SiderDrawer);
