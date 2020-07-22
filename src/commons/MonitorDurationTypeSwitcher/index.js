import React, {Component} from 'react';
import {
    Switch,
} from 'antd';


class MonitorDurationTypeSwitcher extends Component {
    state = {
        value: false
    };

    handleChange = value => {
        this.setState({value});
        this.props.getValue(value)
    };

    render() {
        return (
            <Switch
                size={'small'}
                checkedChildren="fixed"
                unCheckedChildren="custom"
                checked={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
}

export default MonitorDurationTypeSwitcher;