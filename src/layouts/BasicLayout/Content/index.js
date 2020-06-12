import {Component} from 'react';
import {Layout} from 'antd';

import styles from "./index.less";


const {Content} = Layout;


export default class MainContent extends Component {
    render() {
        return (
            <Content className={styles['main-content']}>
                {this.props.children}
            </Content>
        )
    }
}
