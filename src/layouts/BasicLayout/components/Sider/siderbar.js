import Logo from "./components/Logo";
import SiderMenu from "./components/SiderMenu";

import styles from './siderbar.less'

const SiderBar = (props) => (
    <div className={styles['sider-bar']}>
        <Logo/>
        <SiderMenu/>
    </div>
);


export default SiderBar;
