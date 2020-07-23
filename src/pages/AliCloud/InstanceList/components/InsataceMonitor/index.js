import React, {Component} from "react";
import {connect} from 'dva'
import moment from "moment";
import {message} from 'antd'

// import charts needed
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import styles from './index.less'
import {
    apiWsUrl,
    websocketFetchInterval,
} from "../../../../../utils/constants";


@connect(
    ({aliCloud, loading}) => ({
        startTime: aliCloud.startTime,
        endTime: aliCloud.endTime,
        period: aliCloud.period,
        durationType: aliCloud.durationType,
        loading: loading.models.aliCloud,
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
            let t = [];
            let v = [];
            let {status, msg, data} = JSON.parse(msgEv.data);
            if (status === 'error') {
                message.error(msg)
            } else {
                if (data.length > 0) {
                    let [{MetricName, Timestamps, Values}] = data;
                    Timestamps.forEach(
                        // timestamp of aliyun is milliseconds based, while tenCent cloud is second based.
                        // so here use moment(), while moment.unix() used in tenCent cloud.
                        value => t.push(moment(value).format('HH:mm:ss'))
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
            platType: 'aliyun',
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

    heartbeat = () => this.sendMata(this.state.ws, this.props.metricName, this.props.startTime, this.props.endTime, this.props.period, this.props.durationType);

    buildWsConnection() {
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
            platType: 'aliyun',
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

    componentWillMount() {
        this.buildWsConnection()
    }

    // 视表格展开状态决定是否获取数据
    getDataFromWsDependOnTableExpanded = () => {
        if (this.props.expanded) {
            this.heartbeat()
        }
    };

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
            myChart.resize({
                width: chartContainer.clientWidth,
                height: chartContainer.clientHeight
            })
        });
        this.loadMonitorData(myChart);
        this.setState({echarts_instance: myChart});
        // 通过定时检查表格展开状态决定是否拉取数据
        this.intervalId = setInterval(this.getDataFromWsDependOnTableExpanded, websocketFetchInterval)

    }

    componentWillUnmount() {
        if (this.state.ws) {
            this.state.ws.close();
            this.setState({ws: null})
        }
        clearInterval(this.intervalId)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.metricName !== nextProps.metricName || this.props.startTime !== nextProps.startTime || this.props.endTime !== nextProps.endTime || this.props.period !== nextProps.period || this.props.durationType !== nextProps.durationType) {
            if (this.props.expanded) {
                this.sendMata(this.state.ws, nextProps.metricName, nextProps.startTime, nextProps.endTime, nextProps.period, nextProps.durationType);
            }
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div id={this.props.id} className={styles['echarts-container']}/>
        );
    }
}


export default InstanceMonitor;