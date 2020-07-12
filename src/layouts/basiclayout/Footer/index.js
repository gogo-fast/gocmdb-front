import {Layout} from 'antd';

import styles from './index.less';


const {Footer} = Layout;


const MyFooter = () => (
    <Footer className={styles['layout-footer']}>
        <p> [ CMDB Base On Ant Design ] Created By gogo-fast </p>
    </Footer>
);


export default MyFooter
