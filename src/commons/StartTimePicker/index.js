import React, {Component} from "react";
import {TimePicker} from "antd";


class StartTimePicker extends Component {
    onChange = time => {
        this.props.getValue && this.props.getValue(time);
    };

    render() {
        return <TimePicker value={this.props.t} onChange={this.onChange} size={'small'}/>;
    }
}


export default StartTimePicker;