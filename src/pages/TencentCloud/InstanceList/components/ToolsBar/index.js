import React, {Component} from 'react';
import {connect} from 'dva'
import {Icon} from 'antd'
import Region from "../Region";
import InstanceListColumnSetting from "../ColumnSetting";
import StartTimePicker from "../../../../../commons/StartTimePicker";
import EndTimePicker from "../../../../../commons/EndTimePicker";
import LastDurationTimePicker from "../../../../../commons/LastDurationTimePicker";
import Period from "../../../../../commons/PeriodPicker";
import MonitorDurationTypeSwitcher from "../../../../../commons/MonitorDurationTypeSwitcher";

import styles from './index.less'
import moment from "moment";


@connect(
    ({tencentCloud}) => ({
        startTime: tencentCloud.startTime,
        endTime: tencentCloud.endTime,
        period: tencentCloud.period,
        durationType: tencentCloud.durationType, // durationType: "fixed"
    })
)
class ToolsBar extends Component {
    updateStartTime = v => {
        console.log("v::::", v);
        if (v && v < this.props.endTime) {
            console.log(v.format('YYYY-MM-DDTHH:mm:ssZ'));
            this.props.dispatch({
                type: "tencentCloud/updateStartTime",
                payload: v
            })
        }
    };

    updateEndTime = v => {
        console.log("v::::", v);
        if (v && v > this.props.startTime) {
            console.log(v.format('YYYY-MM-DDTHH:mm:ssZ'));
            this.props.dispatch({
                type: "tencentCloud/updateEndTime",
                payload: v
            })
        }
    };

    updatePeriod = v => {
        console.log(parseInt(v));
        this.props.dispatch({
            type: "tencentCloud/updatePeriod",
            payload: v
        })
    };

    updateToLastTimeDuration = value => {
        this.props.dispatch({
            type: "tencentCloud/updateStartTime",
            payload: moment(Date.now() - 1000 * 60 * parseInt(value))
        });
        this.props.dispatch({
            type: "tencentCloud/updateEndTime",
            payload: moment(Date.now())
        })

    };

    changeTimePicker = value => {
        console.log("changeTimePicker:::", value);
        if (!value) {
            this.props.dispatch({
                type: "tencentCloud/updateDurationType",
                payload: "fixed"
            })
        } else {
            this.props.dispatch({
                type: "tencentCloud/updateDurationType",
                payload: "custom"
            })
        }
    };

    render() {
        return (
            <div className={styles['tools-container']}>
                <span className={styles['tool-item']}>
                    <Region/>
                </span>
                <span className={styles['tool-item']}>
                    <InstanceListColumnSetting/>
                </span>
                <span className={styles['tool-item']}>
                    <MonitorDurationTypeSwitcher getValue={this.changeTimePicker}/>
                </span>
                {
                    this.props.durationType === 'fixed'
                        ?
                        <span className={styles['tool-item']}>
                            <Icon type="fast-forward"/>
                            &nbsp;
                            <LastDurationTimePicker actionFunc={this.updateToLastTimeDuration}/>
                        </span>
                        :
                        <span className={styles['tool-item']}>
                            <Icon type="step-backward"/>
                            &nbsp;
                            <StartTimePicker t={this.props.startTime} getValue={this.updateStartTime}/>
                            &nbsp;
                            <EndTimePicker t={this.props.endTime} getValue={this.updateEndTime}/>
                            &nbsp;
                            <Icon type="step-forward"/>
                        </span>

                }
                <span className={styles['tool-item']}>
                    <Icon type="clock-circle"/>
                    &nbsp;
                    <Period p={this.props.period} getValue={this.updatePeriod}/>
                </span>
            </div>
        );
    }
}

export default ToolsBar;











