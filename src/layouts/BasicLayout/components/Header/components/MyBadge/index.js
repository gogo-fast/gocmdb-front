import {Avatar, Icon, Badge} from 'antd';
import styles from './index.less';

const MyBadge = () => {
    return (
        <div className={styles['my-badge']}>
            <Badge count={12}>
                <span className={styles.icon}>
                    <Icon type="bell" />
                </span>
            </Badge>
        </div>
    )
};


export default MyBadge;
