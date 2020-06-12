import {Component} from 'react';
import {Menu} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter'
import {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath,
} from "../../../../../../utils/parseLocation";
import styles from "./index.less";


@connect(
    ({layout, login}) => ({
        currentTheme: layout.theme,
        menus: layout.menus,
        openKeys: layout.openKeys,
        selectedKeys: layout.selectedKeys,
        siderCollapsed: layout.siderCollapsed,
    })
)
@withRouter
class SiderMenu extends Component {

    // control Menu.Item which inflected by selectedKeys
    onClick = ({key, keyPath}) => {
        /*
        *     key:  /user/list
        * keyPath:  ["/user/list", "/user"]
        * */
        this.props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                selectedKeys: getMenuKeyMapFromKeyPath(keyPath).selectedKeys,
            }
        })
    };

    // control Submenu
    onOpenChange = (openKeys) => {
            this.props.dispatch({
                type: "layout/updateMenuKeys",
                payload: {
                    openKeys: openKeys,
                }
            });
    };

    render() {
        return (
            <Menu
                mode="inline"
                theme={this.props.currentTheme.themeType}
                className={styles['sider-menu']}
                defaultOpenKeys={this.props.openKeys}
                openKeys={this.props.openKeys}
                selectedKeys={this.props.selectedKeys}
                onClick={this.onClick}
                onOpenChange={this.onOpenChange}
            >
                {this.props.menus}
            </Menu>
        )
    }
}


export default SiderMenu;

