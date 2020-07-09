import {Component} from 'react';
import {Input, Button, Icon, Select, Dropdown} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import Region from "../Region";


// import styles from './index.less'
import {apiWsUrl} from "../../../../../utils/constants";
import aliyunRegionMap from "../../../../../../config/aliyunRegionConfig";


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
class SearchInstance extends Component {

    actionSearch = (regionId, instanceId) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

        this.props.dispatch(
            {
                type: "aliCloud/searchInstance",
                payload: {
                    platType: "aliyun",
                    instanceId: instanceId,
                    regionId: regionId,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance?platType=aliyun&regionId=${regionId}&instanceId=${instanceId}`);
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

    doSearch = (instanceId) => {
        let inId = instanceId.trim();
        if (inId !== '') {
            this.actionSearch(this.props.defaultRegionId, inId)
        }
    };

    render() {
        return (
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
        )
    }
}

export default SearchInstance;
