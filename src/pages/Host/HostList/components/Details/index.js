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

const HostDetails = (props) => {

    // let {uuid} = props.record;
    let host = {};
    for (let h of props.hosts) {
        if (h.uuid === props.record_uuid) {
            host = h
        }
    }
    const ipList = JSON.parse(host.ips);
    const disks = JSON.parse(host.disks);
    const load = JSON.parse(host.avgLoad);

    let diskPartitions = [];
    let diskList = [];
    for (let k in disks) {
        disks[k].usePercent = Math.round(disks[k].usePercent)
        diskPartitions.push(k);
        diskList.push(disks[k])
    }
    if ('uuid' in host) {
        return (
            <div>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Card size="small" title="Ip list" bordered={true}>
                            {ipList.map((ip, index) => (
                                <span key={index} style={{padding: '12px'}}>
                                <Badge color={colors[Math.round(Math.random() * 100) % colorsLength]} text={ip}/>
                            </span>
                            ))}
                        </Card>
                    </Col>
                    {diskList.map(
                        (value, index) => {
                            return (
                                <Col key={index} span={4}>
                                    <Card size="small" title={`Partition [${diskPartitions[index]}]`} bordered={true}>
                                        <span>{`Total: ${value.total} GB`}</span>
                                        <Pie percent={`${value.usePercent}`}
                                             total={`${value.usePercent}%`}
                                             height={100}
                                             color={value.usePercent > 90 ? '#ff4d4f' : '#40a9ff'}
                                        />
                                    </Card>
                                </Col>
                            )
                        }
                    )}
                    <Col span={4}>
                        <Card size="small" title={"Ram"} bordered={true}>
                            <span>{`Total: ${host.ramTotal} MB`}</span>
                            <Pie percent={`${host.ramPercent}`} total={`${host.ramPercent}%`} height={100}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return <Spin/>
    }

};

export default connect(
    ({host, loading}) => ({
        hosts: host.hosts,
        loading: loading.models.host
    })
)(HostDetails);

