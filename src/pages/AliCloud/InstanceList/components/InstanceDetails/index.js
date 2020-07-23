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
                        <Card size="small" title="PublicIp list" bordered={true}>
                            {publicIpList.map((ip, index) => (
                                <span key={index} style={{padding: '12px'}}>
                                <Badge color={colors[Math.round(Math.random() * 100) % colorsLength]} text={ip}/>
                            </span>
                            ))}
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card size="small" title="PrivateIp list" bordered={true}>
                            {privateIpList.map((ip, index) => (
                                <span key={index} style={{padding: '12px'}}>
                                <Badge color={colors[Math.round(Math.random() * 100) % colorsLength]} text={ip}/>
                            </span>
                            ))}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="concurrentConnections [count]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-1`}
                                metricName={"concurrentConnections"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="DiskWriteIOPS [Count/Second]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-2`}
                                metricName={"DiskWriteIOPS"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="DiskWriteBPS [Byte/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-3`}
                                metricName={"DiskWriteBPS"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="IntranetIn [Byte]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-4`}
                                metricName={"IntranetIn"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="IntranetInRate [bit/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-5`}
                                metricName={"IntranetInRate"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="IntranetOut [Byte]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-6`}
                                metricName={"IntranetOut"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="IntranetOutRate [bit/s]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-7`}
                                metricName={"IntranetOutRate"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="packetInDropRates [%]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-8`}
                                metricName={"packetInDropRates"}
                                regionId={RegionId}
                                instanceId={InstanceId}
                                expanded={this.props.expanded}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card size="small" title="packetOutDropRates [%]" bordered={false}>
                            <InsataceMonitor
                                id={`${InstanceId}-9`}
                                metricName={"packetOutDropRates"}
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

