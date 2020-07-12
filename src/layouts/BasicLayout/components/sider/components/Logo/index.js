import {connect} from 'dva';

import logo from '../../../../../../../public/logo.svg'
import styles from "./index.less";


@connect(
    state => ({
        siderCollapsed: state.layout.siderCollapsed,
        currentTheme: state.layout.theme
    })
)
class Logo extends React.Component {

    render() {
            let logoBannerClassName = 'logo-banner-dark';
            if (this.props.currentTheme.themeType === 'dark') {
                logoBannerClassName = 'logo-banner-dark';
            } else if (this.props.currentTheme.themeType === 'light') {
                logoBannerClassName = 'logo-banner-light';
            } else {
                logoBannerClassName = 'logo-banner-dark';
            }
        return (
            <div className={styles['logo-container']}>
                <div className={styles['logo-item']}>
                    <img className={styles['logo-img']} alt="logo"
                         // src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                         src={logo}/>
                </div>
                <div className={styles['logo-item']}>
                    {this.props.siderCollapsed ? null :
                        <span className={styles[logoBannerClassName]}>GG - CMDB</span>}
                </div>
            </div>
        )
    }
}


export default Logo;
