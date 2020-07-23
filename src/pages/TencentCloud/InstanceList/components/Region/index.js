import React, {Component} from 'react';
import {connect} from 'dva';
import {
    Dropdown,
    Icon,
} from 'antd';


import tencentRegionMap from "../../../../../../config/tencentRegionConfig";
import styles from './index.less';
import {apiWsUrl} from "../../../../../utils/constants";
import countryFlagMap from "../../../../../../config/countryFlagMap";


@connect(
    ({tencentCloud, login}) => ({
        regions: tencentCloud.regions,
        instancesWs: tencentCloud.instancesWs,
        pageNum: tencentCloud.instanceListPageNum,
        pageSize: tencentCloud.instanceListPageSize,
        defaultRegionId: tencentCloud.defaultRegionId,
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
            type: "tencentCloud/updateDefaultRegionId",
            payload: {
                defaultRegionId: RegionId,
            }
        });

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance/list?platType=tencent&regionId=${RegionId}&page=${this.props.pageNum}&size=${this.props.pageSize}`);
        this.props.dispatch({
            type: "tencentCloud/updateInstanceWebSocket",
            payload: {ws: ws}
        });
        ws.onmessage = msgEv => {
            this.props.dispatch(
                {
                    type: "tencentCloud/updateInstances",
                    payload: JSON.parse(msgEv.data),
                }
            );
        }
    };

    renderRegions = (regions, location) => {
        return regions.map(
            (value, index) => {
                let regionId = value.RegionId;
                let Location = tencentRegionMap[regionId].Location;
                let country = tencentRegionMap[regionId].Country;
                let flag = countryFlagMap[country];
                let regionName = tencentRegionMap[regionId].RegionName;
                if (Location === location) {
                    return (
                        // 通过 "data-*" 设置的自定义属性，可以通过 e.currentTarget.getAttribute('data-*')) 获取。
                        // 也可以通过使用 id 来实现，但是有限选择 "data-*"。id在以前的情况下，默认将从data-*属性中提取数据。
                        <div
                            key={regionId}
                            style={{backgroundColor: (regionId === this.props.defaultRegionId) ? '#bae7ff' : '#fafafa'}}
                            data-region-id={regionId}
                            onClick={e => this.handlerClick(e)}
                        >
                            <span className={styles['region-item']}>
                                <span className={styles['flag']}>
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
            <Dropdown
                overlay={
                    <div className={styles['regions-container']}>
                        <div className={styles['regions-container-left']}>
                            <div className={styles['location-title']}>亚太</div>
                            <div className={styles['region-items']}>
                                {this.renderRegions(this.props.regions, "亚太")}
                            </div>
                        </div>
                        <div className={styles['regions-container-right']}>
                            <div className={styles['location-title']}>欧美</div>
                            <div className={styles['region-items']}>
                                {this.renderRegions(this.props.regions, "欧美")}
                            </div>
                            <div className={styles['location-title']}>中东与印度</div>
                            <div className={styles['region-items']}>
                                {this.renderRegions(this.props.regions, "中东与印度")}
                            </div>
                        </div>
                    </div>
                }
            >
                <span className={styles['default-region']}>
                    <Icon type="global"/>
                    &nbsp;&nbsp;
                    <span>
                        {tencentRegionMap[this.props.defaultRegionId].RegionName}
                    </span>
                    &nbsp;&nbsp;
                    <Icon type="caret-down"/>
                </span>
            </Dropdown>
        )
    }
}


export default Region;



