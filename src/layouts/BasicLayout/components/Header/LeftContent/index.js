import {Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import styles from "./index.less";


const LeftContent = (props) => {

    function siderCollapse() {
        // change openKeys should before change side Collapsed
        // other wise flash appear while side bar collapsed
        // since the operation is sync in reducers
        props.dispatch({
            type: "layout/updateMenuKeys",
            payload: {
                openKeys: [],
            }
        });

        props.dispatch({
            type: 'layout/siderTrigger',
            payload: {siderCollapsed: !props.siderCollapsed}
        });
    }

    return (
        <div className={styles['header-left']}>
            <div className={styles['sider-trigger']}>
                <Icon
                    type={props.siderCollapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={siderCollapse}
                />
            </div>
        </div>
    )
};


export default connect(
    ({layout}) => ({
        siderCollapsed: layout.siderCollapsed,
    })
)(withRouter(LeftContent));
