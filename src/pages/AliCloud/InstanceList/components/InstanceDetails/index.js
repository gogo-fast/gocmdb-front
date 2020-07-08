import React, {Component, useEffect} from 'react'
import {Descriptions, Spin, Button, Icon, Form, Modal, Radio, Input, DatePicker, Row, Card, Col, Badge} from 'antd';
import {connect} from 'dva'

import {
    formatDayTime,
    formatTimeStamp,
    parseDayTime,
    parseTimeStamp,
} from '../../../../../utils/parseTime'
import styles from './index.less'
import iconStyles from '../../../../../commons/iconfonts/icon.css'

import {Pie,} from 'ant-design-pro/lib/Charts';

const {TextArea} = Input;
const colors = [
    'pink',
    'red',
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

const colMap = {
    ////// 'id': 'ID',
    // 'InstanceId': 'InstanceId',
    // 'HostName': 'HostName',
    // 'RegionId': 'RegionId',
    // 'Status': 'Status',
    // 'OSName': 'OS',
    // 'Cpu': 'Cpu Count',
    // 'Memory': 'Memory',
    // 'InternetMaxBandwidthIn': 'Bandwidth In',
    // 'InternetMaxBandwidthOut': 'Bandwidth Out',

    'Uuid': 'UUID',
    'InstanceType': 'InstanceType',
    'CreatedTime': 'CreatedTime',
    'Description': 'Description',
    'InternetChargeType': 'InternetChargeType',
    'VpcId': 'VpcId',
    'PrivateIpAddress': 'PrivateIpAddress',
    'PublicIpAddress': 'PublicIpAddress',
};


const InstanceDetails = (props) => {

    const publicIpList = JSON.parse(props.record.PublicIpAddress);
    const privateIpList = JSON.parse(props.record.PrivateIpAddress);
    // const disks = JSON.parse(host.disks);
    // const load = JSON.parse(host.avgLoad);

    return (
        <div>
            <Row gutter={[8, 8]}>
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
                {/*{diskList.map(*/}
                {/*    (value, index) => {*/}
                {/*        return (*/}
                {/*            <Col key={index} span={4}>*/}
                {/*                <Card size="small" title={`Partition [${diskPartitions[index]}]`} bordered={true}>*/}
                {/*                    <span>{`Total: ${value.total} GB`}</span>*/}
                {/*                    <Pie percent={`${value.usePercent}`}*/}
                {/*                         total={`${value.usePercent}%`}*/}
                {/*                         height={100}*/}
                {/*                         color={value.usePercent > 90 ? '#ff4d4f' : '#40a9ff'}*/}
                {/*                    />*/}
                {/*                </Card>*/}
                {/*            </Col>*/}
                {/*        )*/}
                {/*    }*/}
                {/*)}*/}
                {/*<Col span={4}>*/}
                {/*    <Card size="small" title={"Ram"} bordered={true}>*/}
                {/*        <span>{`Total: ${host.ramTotal} MB`}</span>*/}
                {/*        <Pie percent={`${host.ramPercent}`} total={`${host.ramPercent}%`} height={100}/>*/}
                {/*    </Card>*/}
                {/*</Col>*/}
            </Row>
        </div>
    );
};

export default connect(
    ({aliCloud, loading}) => ({
        instances: aliCloud.hosts,
        loading: loading.models.aliCloud
    })
)(InstanceDetails);

