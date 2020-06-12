import {Layout} from 'antd';
import LeftContent from "../components/Header/LeftContent";
import RightContent from "../components/Header/RightContent";
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
