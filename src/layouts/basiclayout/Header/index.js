import {Layout} from 'antd';
import LeftContent from "../components/header/LeftContent";
import RightContent from "../components/header/RightContent";
import styles from './index.less';

const {Header} = Layout;


const MyHeader = (props) => {

    return (
        <Header className={styles['layout-header']}>
            <LeftContent/>
            <RightContent/>
        </Header>
    )
};

export default MyHeader;
