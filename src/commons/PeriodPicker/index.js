import React, {Component} from "react";
import {Select} from "antd";

const {Option} = Select;


class Period extends Component {
    handleChange = value => {
        this.props.getValue && this.props.getValue(value);
    };

    render() {
        let optionValueList = [];
        let valueList;
        if (!this.props.valuelist) {
            valueList = [parseInt(this.props.p)]
        } else {
            valueList = this.props.valuelist
        }
        let l = valueList.length;
        for (let i = 0; i < l; i++) {
            let v = valueList[i];
            let _v = Math.floor(v / 60);
            // console.log("v:", v, "_v", _v);
            // console.log(`${_v}`, typeof `${_v}`);
            switch (_v) {
                case 0 :
                    optionValueList.push(<Option key={`${i}`} value={`${v}`}>{v} seconds</Option>);
                    break;
                case 1 :
                    optionValueList.push(<Option key={`${i}`} value={`${v}`}>{_v} minute</Option>);
                    break;
                default:
                    optionValueList.push(<Option key={`${i}`} value={`${v}`}>{_v} minutes</Option>)
            }
        }

        return <Select size={"small"} value={this.props.p} onChange={this.handleChange} style={{width: 110}}>
            {optionValueList}
        </Select>;
    }
}


export default Period;