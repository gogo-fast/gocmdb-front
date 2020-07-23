import React, {Component} from "react";
import {DatePicker} from "antd";


class CustomDateTimePicker extends Component {
    state = {
        endOpen: false,
    };

    disabledStartDate = startValue => {
        if (!startValue || !this.props.et) {
            return false;
        }
        return startValue.valueOf() > this.props.et.valueOf();
    };

    disabledEndDate = endValue => {
        if (!endValue || !this.props.st) {
            return false;
        }
        return endValue.valueOf() <= this.props.st.valueOf();
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({endOpen: true});
        }
    };

    handleEndOpenChange = open => {
        this.setState({endOpen: open});
    };

    // change start time in aliCloud namespace
    onStartChange = value => {
        this.props.updateStartTime(value)
    };
    // change end time in aliCloud namespace
    onEndChange = value => {
        this.props.updateEndTime(value)
    };

    render() {
        const {endOpen} = this.state;
        return (
            <div>
                <DatePicker

                    size={'small'}
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    // value={startValue}
                    value={this.props.st}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                &nbsp;&nbsp;
                <DatePicker
                    size={'small'}
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    // value={endValue}
                    value={this.props.et}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        );
    }
}

export default CustomDateTimePicker;

