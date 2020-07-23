import React, {Component} from "react";
import {Select} from "antd";
import {connect} from 'dva'
import moment from "moment";

const {Option} = Select;


class LastDurationTimePicker extends Component {
    state={
        value: '10'
    };
    handleChange = value => {
        this.setState({value});
        this.props.actionFunc(value)
    };

    componentWillMount() {
        this.props.actionFunc(this.state.value)
    }

    render() {
        return <Select size={"small"} defaultValue={this.state.value} value={this.state.value} onChange={this.handleChange}
                       style={{width: 140}}>
            <Option key="1" value={'10'}>last 10 minutes</Option>
            <Option key="2" value={'30'}>last half hour</Option>
            <Option key="3" value={'60'}>last 1 hour</Option>
        </Select>;
    }
}

export default LastDurationTimePicker;