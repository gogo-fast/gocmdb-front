import styles from './index.less'
import {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath,
} from "../../utils/parseLocation";
import React, {useEffect, Component} from 'react'
import withRouter from 'umi/withRouter'
import {connect} from 'dva'


@connect(
    ({layout}) => ({
        openKeys: layout.openKeys,
        selectedKeys: layout.selectedKeys
    })
)
@withRouter
class Home extends Component {

    componentWillMount() {
        let pathName = this.props.location.pathname;
        this.props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                selectedKeys:  getMenuKeyMapFromPathName(pathName, "/home").selectedKeys,
            }
        })
    }

    render() {
        return (
            <div className={styles['home']}>
                <p>
                    CMDB front side，continue updating ......
                </p>
            </div>
        );
    }
}


export default connect()(withRouter(Home));
