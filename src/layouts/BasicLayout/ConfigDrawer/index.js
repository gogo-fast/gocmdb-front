import {Popover, Icon} from "antd";

import styles from './index.less'


const ConfigDrawer = () => (
    <div className={styles['config-drawer']}>
        <Popover
            placement="topLeft"
            title={"setting online"}
            content={"<ReactNode>"}
            trigger="click"
        >
            <div className={styles['config-drawer-trigger']}>
                <Icon type="setting" style={{color: "#f0f0f0"}} />
            </div>
        </Popover>
    </div>
);


export {
    ConfigDrawer
}
