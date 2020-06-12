import {Component} from 'react';
import {Layout} from 'antd';

import styles from "./index.less";


const {Content} = Layout;

// the components under src/pages will automatic inject into <Layout.Content /> by umi
export default class MainContent extends Component {
    render() {
        return (
            <Content className={styles['main-content']}>
                {this.props.children}
            </Content>
        )
    }
}
