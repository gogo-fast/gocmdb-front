import {Switch} from "antd";
import {connect} from 'dva';
import {Component} from 'react';

import styles from './index.less';

class ThemeSwitcher extends Component {

    changeToDark = () => {
        let themeData = {
            'themeType': 'dark',
            'themeColor': '#001529',  // set "side drawer" background color in siderdrawer.js.
            'defaultChecked': false,
        };
        localStorage.setItem('theme', JSON.stringify(themeData));
        this.props.dispatch({
            type: "layout/switchTheme",
            payload: {
                theme: themeData
            }
        });
    };

    changeToLight = () => {
        let themeData = {
            'themeType': 'light',
            'themeColor': '#fff',  // set "side drawer" background color in siderdrawer.js.
            'defaultChecked': true,
        };
        localStorage.setItem('theme', JSON.stringify(themeData));
        this.props.dispatch({
            type: "layout/switchTheme",
            payload: {
                theme: themeData
            }
        });
    };

    changeTheme = () => {
        if (this.props.currentTheme.themeType === 'dark') {
            this.changeToLight()
        } else if (this.props.currentTheme.themeType === 'light') {
            this.changeToDark()
        } else {
            this.changeToDark()
        }

    };

    render() {
        return (
            <div className={styles['switch']}>
                <Switch
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    defaultChecked={this.props.currentTheme.defaultChecked}
                    onChange={() => {
                        this.changeTheme()
                    }}
                />
            </div>
        )
    }
}


export default connect(
    state => (
        {currentTheme: state.layout.theme}
    )
)(ThemeSwitcher)
