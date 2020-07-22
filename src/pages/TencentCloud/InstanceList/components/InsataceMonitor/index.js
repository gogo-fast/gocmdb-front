import React, {Component} from "react";
import {connect} from 'dva'
import moment from "moment";
import {message} from 'antd'

//不是按需加载的话文件太大
// import echarts from 'echarts'
//下面是按需加载
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import styles from './index.less'
import {apiWsUrl} from "../../../../../utils/constants";
import sleep from "../../../../../utils/sleep";


@connect(
    ({tencentCloud, loading}) => ({
        startTime: tencentCloud.startTime,
        endTime: tencentCloud.endTime,
        period: tencentCloud.period,
        durationType: tencentCloud.durationType,
        loading: loading.models.tencentCloud,
    })
)
class InstanceMonitor extends Component {
    state = {
        ws: null,
        t: [],
        v: [],
        echarts_instance: null,
    };

    loadMonitorData = (echarts_instance) => {
        this.state.ws.onmessage = msgEv => {
            console.log('###### new monitor data coming ########');

            let t = [];
            let v = [];
            let {status, msg, data} = JSON.parse(msgEv.data);
            if (status === 'error') {
                message.error(msg)
            } else {
                if (data.length > 0) {
                    let [{MetricName, Timestamps, Values}] = data;
                    Timestamps.forEach(
                        value => t.push(moment.unix(value).format('HH:mm:ss'))
                    );
                    Values.forEach(
                        value => v.push(value.toFixed(2))
                    );

                    // change state to generate dynamic charts
                    this.setState({t, v});

                    let option = {
                        tooltip: {
                            trigger: 'axis',
                        },
                        xAxis: {
                            data: this.state.t,
                        },
                        yAxis: {
                            type: 'value',
                            max: this.props.max ? this.props.max : null,
                        },
                        series: [
                            {
                                name: this.props.name ? this.props.name : MetricName,
                                type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
                                data: this.state.v,
                                smooth: true
                            }
                        ]
                    };
                    echarts_instance.setOption(option);
                }
            }
        };
    };


    sendMata = (ws, metricName, startTime, endTime, period, durationType) => {
        // send action while one of startTime, endTime, period changed
        let data = {
            platType: 'tencent',
            regionId: this.props.regionId,
            metricName: metricName,
            startTime: startTime.format("YYYY-MM-DDTHH:mm:ssZ"),
            endTime: endTime.format("YYYY-MM-DDTHH:mm:ssZ"),
            period: parseInt(period),
            instanceIDs: [this.props.instanceId], // from father component
            durationType: durationType,
        };
        ws.send(JSON.stringify(data));
    };

    heartbeat = () => this.sendMata(this.state.ws, this.props.metricName, this.props.startTime, this.props.endTime, this.props.period, this.props.durationType)


    componentWillMount() {
        if (this.state.ws) {
            this.state.ws.close();
            this.setState({ws: null})
        }
        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance/monitor`);
        this.setState({ws: ws});
        let metricName = this.props.metricName;
        let startTime = this.props.startTime;
        let endTime = this.props.endTime;
        let period = this.props.period;
        let durationType = this.props.durationType;
        // send action after websocket established
        let data = {
            platType: 'tencent',
            regionId: this.props.regionId,
            metricName: metricName,
            startTime: startTime.format("YYYY-MM-DDTHH:mm:ssZ"),
            endTime: endTime.format("YYYY-MM-DDTHH:mm:ssZ"),
            period: parseInt(period),
            instanceIDs: [this.props.instanceId],  // from father component
            durationType: durationType,
        };
        ws.onopen = function () {
            ws.send(JSON.stringify(data));
        };
    }

// you should place echarts.init() in componentDidMount
// other wise document.getElementById('main') will be null.
    componentDidMount() {

        // 应该动态传递id,如果重复使用相同id的charts父组件，只能像是一个图表。
        let id = this.props.id;
        const chartContainer = document.getElementById(id);
        const myChart = echarts.init(chartContainer);
        // use addEventListener make every chart could resize.
        // use window.onresize can only resize the last one.
        window.addEventListener('resize', function () {
            // console.log(chartContainer.clientWidth, chartContainer.clientHeight);
            myChart.resize({
                width: chartContainer.clientWidth,
                height: chartContainer.clientHeight
            })
        });
        this.loadMonitorData(myChart);
        this.setState({echarts_instance: myChart});

        this.interval = setInterval(() => this.heartbeat(), 1000 * 10)

    }

    componentWillUnmount() {
        if (this.state.ws) {
            this.state.ws.close();
            this.setState({ws: null})
        }
        clearInterval(this.interval)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.props.period, nextProps.period);
        if (this.props.metricName !== nextProps.metricName || this.props.startTime !== nextProps.startTime || this.props.endTime !== nextProps.endTime || this.props.period !== nextProps.period || this.props.durationType !== nextProps.durationType) {
            console.log("props change ....");
            this.sendMata(this.state.ws, nextProps.metricName, nextProps.startTime, nextProps.endTime, nextProps.period, nextProps.durationType);
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div id={this.props.id} className={styles['mem-used-container']}/>
        );
    }
}


export default InstanceMonitor;