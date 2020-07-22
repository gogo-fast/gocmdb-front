import React, {Component} from 'react'
import {Row, Card, Col, Badge} from 'antd';
import {connect} from 'dva'
import InsataceMonitor from "../InsataceMonitor";
import MemUsed from "../InsataceMonitor";

const colors = [
    'pink',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
];
const colorsLength = colors.length;


class InstanceDetails extends Component {


    render() {
        const colFormat = {xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6};
        let {RegionId, InstanceId} = this.props.record;
        const publicIpList = JSON.parse(this.props.record.PublicIpAddress);
        const privateIpList = JSON.parse(this.props.record.PrivateIpAddress);

        return (
            <div>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Card size="small" title="PublicIp list" bordered={false}>
                            {publicIpList.map((ip, index) => (
                                <span key={index} style={{padding: '12px'}}>
                                <Badge color={colors[Math.round(Math.random() * 100) % colorsLength]} text={ip}/>
                            </span>
                            ))}
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card size="small" title="PrivateIp list" bordered={false}>
                            {privateIpList.map((ip, index) => (
                                <span key={index} style={{padding: '12px'}}>
                                <Badge color={colors[Math.round(Math.random() * 100) % colorsLength]} text={ip}/>
                            </span>
                            ))}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="Cpu usage percent [%]" bordered={false}>
                            <InsataceMonitor id={"cpu-usage1"} metricName={"CPUUsage"} regionId={RegionId}
                                             instanceId={InstanceId}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="CpuLoadavg" bordered={false}>
                            <InsataceMonitor id={"cpu-loadavg1"} metricName={"CpuLoadavg"} regionId={RegionId}
                                             instanceId={InstanceId}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="Memory Used [MB]" bordered={false}>
                            <InsataceMonitor id={"mem-used1"} metricName={"MemUsed"} regionId={RegionId}
                                             instanceId={InstanceId}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="Memory Usage [%]" bordered={false}>
                            <InsataceMonitor id={"mem-usage1"} metricName={"MemUsage"} regionId={RegionId}
                                             instanceId={InstanceId}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="TcpCurrEstab [count]" bordered={false}>
                            <InsataceMonitor id={"tcp-curestab1"} metricName={"TcpCurrEstab"} regionId={RegionId}
                                             instanceId={InstanceId}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanOuttraffic [/Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={"LanOuttraffic1"}
                                name={'内网网卡的平均每秒出流量'}
                                metricName={"LanOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanIntraffic [/Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={"LanIntraffic1"}
                                name={'内网网卡的平均每秒入流量'}
                                metricName={"LanIntraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanOutpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={"LanOutpkg1"}
                                name={'内网网卡网卡的平均每秒出包量'}
                                metricName={"LanOutpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanInpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={"LanInpkg1"}
                                name={'内网网卡网卡的平均每秒入包量'}
                                metricName={"LanInpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanOuttraffic [Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={"WanOuttraffic1"}
                                name={'外网网卡的平均每秒出流量'}
                                metricName={"WanOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanIntraffic [Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={"WanIntraffic1"}
                                name={'外网网卡的平均每秒入流量'}
                                metricName={"WanIntraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanOutpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={"WanOutpkg1"}
                                name={'内网网卡网卡的平均每秒出包量'}
                                metricName={"WanOutpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanInpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={"WanInpkg1"}
                                name={'内网网卡网卡的平均每秒入包量'}
                                metricName={"WanInpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="AccOuttraffic [MB]" bordered={false}>
                            <InsataceMonitor
                                id={"AccOuttraffic1"}
                                name={'外网网卡的平均每秒出流量'}
                                metricName={"AccOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="BaseCpuUsage [%]" bordered={false}>
                            <InsataceMonitor
                                id={"BaseCpuUsage1"}
                                name={'基础 CPU 使用率'}
                                metricName={"BaseCpuUsage"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InstanceDetails;

