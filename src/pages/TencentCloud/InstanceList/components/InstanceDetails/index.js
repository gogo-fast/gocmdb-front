import React, {Component} from 'react'
import {Row, Card, Col, Badge} from 'antd';
import InsataceMonitor from "../InsataceMonitor";

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
                            <InsataceMonitor
                                id={`${InstanceId}-1`}
                                metricName={"CPUUsage"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="CpuLoadavg" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-2`}
                                metricName={"CpuLoadavg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="Memory Used [MB]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-3`}
                                metricName={"MemUsed"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="Memory Usage [%]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-4`}
                                metricName={"MemUsage"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="TcpCurrEstab [count]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-5`}
                                metricName={"TcpCurrEstab"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanOuttraffic [/Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-6`}
                                name={'内网出带宽'}
                                metricName={"LanOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanIntraffic [/Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-7`}
                                name={'内网入带宽'}
                                metricName={"LanIntraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanOutpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-8`}
                                name={'内网出包量'}
                                metricName={"LanOutpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}

                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="LanInpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-9`}
                                name={'内网入包量'}
                                metricName={"LanInpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanOuttraffic [Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-10`}
                                name={'外网出带宽'}
                                metricName={"WanOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanIntraffic [Mbps]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-11`}
                                name={'外网入带宽'}
                                metricName={"WanIntraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanOutpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-12`}
                                name={'外网出包量'}
                                metricName={"WanOutpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="WanInpkg [个/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-13`}
                                name={'外网入包量'}
                                metricName={"WanInpkg"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="AccOuttraffic [MB]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-14`}
                                name={'外网出流量'}
                                metricName={"AccOuttraffic"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="BaseCpuUsage [%]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-15`}
                                name={'基础 CPU 使用率'}
                                metricName={"BaseCpuUsage"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InstanceDetails;

