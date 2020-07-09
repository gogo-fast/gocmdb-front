import {Component} from 'react';
import {Button, Icon,} from 'antd';
import {connect} from 'dva';


@connect(
    ({layout}) => ({
        currentTheme: layout.theme,
    })
)
class Reset extends Component {

    handleReset = () => {
        this.props.resetFun();
    };

    render() {
        return (
            <Button
                type={(this.props.currentTheme.themeType === 'dark') ? 'primary' : 'default'}
                onClick={this.handleReset}
            >
                <Icon type="dropbox"/> Reset
            </Button>
        )
    }
}

export default Reset;
