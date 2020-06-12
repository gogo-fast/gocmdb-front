import {connect} from 'dva';
import {Layout, Icon} from 'antd';
import RightContent from "../components/Header/rightContent";
import styles from './index.less';
import withRouter from 'umi/withRouter'

const {Header} = Layout;


const MyHeader = (props) => {

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
        <Header className={styles['layout-header']}>
            <div className={styles['header-left']}>
                <div className={styles['sider-trigger']}>
                    <Icon
                        type={props.siderCollapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={siderCollapse}
                    />
                </div>
            </div>
            <RightContent/>
        </Header>
    )
};


export default connect(
    ({layout}) => ({
        siderCollapsed: layout.siderCollapsed,
    })
)(withRouter(MyHeader));


