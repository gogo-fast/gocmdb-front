import {Component} from 'react';
import {Input, Button, Icon, Select, Popover, Dropdown} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import Region from "./components/Region";


import styles from './index.less'
import loadLocalStory from "../../../../../utils/loadLocalStory";
import {apiWsUrl} from "../../../../../utils/constants";
import aliyunRegionMap from "../../../../../../config/regionConfig";


const {Search} = Input;
const {Option} = Select;

@connect(
    ({loading, login, aliCloud}) => ({
        loading: loading.models.aliCloud,
        pageNum: aliCloud.instanceListPageNum,
        pageSize: aliCloud.instanceListPageSize,
        regions: aliCloud.regions,
        defaultRegion: aliCloud.defaultRegion,
        defaultRegionId: aliCloud.defaultRegionId,
        instancesWs: aliCloud.instancesWs,
    })
)
@withRouter
class TableTitle extends Component {

    actionReload = (regionId, pageNum, pageSize) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

        this.props.dispatch(
            {
                type: "aliCloud/getInstanceList",
                payload: {
                    platType: "aliyun",
                    regionId: regionId,
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance/list?platType=aliyun&regionId=${regionId}&page=${pageNum}&size=${pageSize}`);
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

    actionSearch = (regionId, instanceId) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

        let inId = instanceId.trim();
        this.props.dispatch(
            {
                type: "aliCloud/searchInstance",
                payload: {
                    platType: "aliyun",
                    instanceId: inId,
                    regionId: regionId,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance?platType=aliyun&regionId=${regionId}&instanceId=${inId}`);
        this.props.dispatch({
            type: "aliCloud/updateInstanceWebSocket",
            payload: {ws: ws}
        });
        ws.onmessage = msgEv => {
            // rebuild data struct same to hostlist response
            let {status, msg, data} = JSON.parse(msgEv.data);
            let newResp = {
                "status": status,
                "msg": msg,
                "data": {
                    "total": (status === 'ok') ? 1 : 0,
                    "instances": (status === 'ok') ? data : [],
                    "currentPageNum": -1,
                }
            };
            this.props.dispatch(
                {
                    type: "aliCloud/updateInstances",
                    payload: newResp,
                }
            );
        }
    };

    reloadInstanceList = () => {
        this.actionReload(this.props.defaultRegionId, this.props.pageNum, this.props.pageSize)
    };

    doSearch = (instanceId) => {
        let inId = instanceId.trim();
        if (inId !== '') {
            this.actionSearch(this.props.defaultRegionId, inId)
        }
    };

    render() {
        return (
            <div className={styles['table-top']}>
                <span className={styles['table-top-left']}>
                    <h1 className={styles['table-title']}>Aliyun Instance List Page</h1>
                    <span className={styles['regions']}>
                        <Dropdown overlay={<Region/>}>
                            <span className={styles['default-region']}>
                                <span>
                                    {aliyunRegionMap[this.props.defaultRegionId].RegionName}
                                </span>
                                <Icon type="caret-down"/>
                            </span>
                        </Dropdown>
                    </span>
                </span>
                <span className={styles['table-top-right']}>
                    <span className={styles['right-item']}>
                        {this.props.loading
                            ?
                            <Button
                                className={styles.refresh}
                            >
                                <Icon type="loading"/>
                            </Button>
                            :
                            <Button
                                className={styles.refresh}
                                onClick={this.reloadInstanceList}
                            >
                                <Icon type="redo"/>
                            </Button>
                        }
                    </span>
                    <span className={styles['toolbar-item']}>
                        <Search
                            placeholder="do search by Instance id ..."
                            onPressEnter={e => {
                                this.doSearch(e.currentTarget.value)
                            }}
                            onSearch={value => {
                                this.doSearch(value)
                            }}
                            style={{width: 300}}
                        />
                    </span>
                </span>
            </div>
        )
    }
}

export default TableTitle;
