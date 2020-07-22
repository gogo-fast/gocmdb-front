import React, {Component} from "react";
import {Select} from "antd";

const {Option} = Select;


class Period extends Component {
    handleChange = value => {
        this.props.getValue && this.props.getValue(value);
    };

    render() {
        return <Select size={"small"} defaultValue='300' value={this.props.p} onChange={this.handleChange} style={{width: 110}}>
            <Option key="1" value={'10'}>10 seconds</Option>
            <Option key="2" value={'60'}>1 minute</Option>
            <Option key="3" value={'300'}>5 minutes</Option>
        </Select>;
    }
}


export default Period;