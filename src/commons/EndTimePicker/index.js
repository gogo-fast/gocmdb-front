import React, {Component} from "react";
import {TimePicker} from "antd";


class EndTimePicker extends Component {
    onChange = time => {
        this.props.getValue && this.props.getValue(time);
        this.setState({value: time});
    };

    render() {
        return <TimePicker value={this.props.t} onChange={this.onChange} size={'small'}/>;
    }
}

export default EndTimePicker;