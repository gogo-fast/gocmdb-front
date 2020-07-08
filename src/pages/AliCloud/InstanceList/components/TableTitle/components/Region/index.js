import React, {Component} from 'react';
import {Popover, Card, Col, Row, Button, Divider, Layout, Menu} from "antd";
import {connect} from 'dva';

const {Sider} = Layout;

import {
    china,
    singapore,
    australia,
    malaysia,
    indonesia,
    japan,
    germany,
    england,
    america,
    india,
    united_arab_emirates,
} from '../../../../../../../../public/flags/regionFlags.js'
import aliyunRegionMap from "../../../../../../../../config/regionConfig";
import iconStyles from '../../../../../../../commons/iconfonts/icon.css'
import styles from './index.less';
import layout from "../../../../../../../models/layout";
import {apiWsUrl} from "../../../../../../../utils/constants";

const countryFlagMap = {
    "china": china,
    "singapore": singapore,
    "australia": australia,
    "malaysia": malaysia,
    "indonesia": indonesia,
    "japan": japan,
    "germany": germany,
    "england": england,
    "america": america,
    "india": india,
    "united_arab_emirates": united_arab_emirates,
};


@connect(
    ({aliCloud, login}) => ({
        regions: aliCloud.regions,
        instancesWs: aliCloud.instancesWs,
        pageNum: aliCloud.instanceListPageNum,
        pageSize: aliCloud.instanceListPageSize,
    })
)
class Region extends Component {

    handlerClick = (e) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

        let RegionId = e.currentTarget.getAttribute('data-region-id');
        this.props.dispatch({
            type: "aliCloud/updateDefaultRegionId",
            payload: {
                defaultRegionId: RegionId,
            }
        });

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance/list?platType=aliyun&regionId=${RegionId}&page=${this.props.pageNum}&size=${this.props.pageSize}`);
        this.props.dispatch({
            type: "aliCloud/updateInstanceWebSocket",
            payload: {ws: ws}
        });
        ws.onmessage = msgEv => {
            this.props.dispatch(
                {
                    type: "aliCloud/updateInstances",
                    payload: JSON.parse(msgEv.data),
                }
            );
        }
    };

    renderRegions = (regions, location) => {
        let menuItemList = [];
        return regions.map(
            (value, index) => {
                let regionId = value.RegionId;
                let Location = aliyunRegionMap[regionId].Location;
                let country = aliyunRegionMap[regionId].Country;
                let flag = countryFlagMap[country];
                let regionName = aliyunRegionMap[regionId].RegionName;
                if (Location === location) {
                    return (
                        // 通过 "data-*" 设置的自定义属性，可以通过 e.currentTarget.getAttribute('data-*')) 获取。
                        // 也可以通过使用 id 来实现，但是有限选择 "data-*"。id在以前的情况下，默认将从data-*属性中提取数据。
                        <div key={regionId} data-region-id={regionId} onClick={e => this.handlerClick(e)}>
                            <span className={styles['region-item']}>
                                <span  className={styles['flag']}>
                                    {flag}
                                </span>
                                <span>
                                    &nbsp;&nbsp;{regionName}
                                </span>
                            </span>
                        </div>
                    )
                }
            }
        );
    };

    render() {
        return (
            <div className={styles['regions-container']}>
                <div className={styles['regions-container-left']}>
                    <div className={styles['region-items']}>
                        <div className={styles['location-title']}>亚太</div>
                        {this.renderRegions(this.props.regions, "亚太")}
                    </div>
                </div>
                <div className={styles['regions-container-right']}>
                    <div className={styles['region-items']}>
                        <div className={styles['location-title']}>欧美</div>
                        {this.renderRegions(this.props.regions, "欧美")}
                    </div>
                    <div className={styles['region-items']}>
                        <div className={styles['location-title']}>中东与印度</div>
                        {this.renderRegions(this.props.regions, "中东与印度")}
                    </div>
                </div>
            </div>
        );
    }
}


export default Region;



