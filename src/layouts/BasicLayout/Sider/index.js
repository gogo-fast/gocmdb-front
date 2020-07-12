import {connect} from 'dva';
import {Layout} from 'antd';
import SiderBar from 'src/layouts/BasicLayout/components/Sider/Siderbar';
import loadtheme from "../../../utils/themeLoder";

import styles from "./index.less";


const {Sider} = Layout;


class MySider extends React.Component {

    state = {
        w: window.innerWidth,
    };

    componentWillMount() {
        var currentThemeData = {};
        currentThemeData = loadtheme();
        this.props.dispatch({
            type: "layout/switchTheme",
            payload: {theme: currentThemeData}
        })
    }

    componentDidMount() {
        // type must be "resize"
        window.addEventListener('resize', this.setCurrentWidth)
    }

    componentWillUnmount() {
        // type must be "resize"
        window.removeEventListener('resize', this.setCurrentWidth)
    }

    setCurrentWidth = () => {
        this.setState({
            w: window.innerWidth,
        });
        if (window.innerWidth < 1000) {
            // change openKeys should before change side Collapsed
            // other wise flash appear while side bar collapsed
            // since the operation is sync in reducers
            this.props.dispatch({
                type: "layout/updateMenuKeys",
                payload: {
                    openKeys: [],
                }
            });

            this.props.dispatch({
                type: 'layout/siderTrigger',
                payload: {siderCollapsed: true}
            })
        } else {
            this.props.dispatch({
                type: 'layout/siderTrigger',
                payload: {siderCollapsed: false}
            })
        }
    };

    render() {
        return (
            <Sider
                className={styles['layout-sider']}
                trigger={null}
                collapsible
                collapsed={this.props.siderCollapsed}
                theme={this.props.currentTheme.themeType}
            >
                <SiderBar/>
            </Sider>
        )
    }
}


export default connect(
    state => ({
        // should point to namespace layout before get the state value from layout namespace
        siderCollapsed: state.layout.siderCollapsed,
        currentTheme: state.layout.theme
    })
)(MySider);



