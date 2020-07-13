import {Component} from 'react';
import {Input} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';


import {apiWsUrl} from "../../../../../utils/constants";


const {Search} = Input;


@connect(
    ({loading, login, tencentCloud}) => ({
        loading: loading.models.tencentCloud,
        pageNum: tencentCloud.instanceListPageNum,
        pageSize: tencentCloud.instanceListPageSize,
        regions: tencentCloud.regions,
        defaultRegion: tencentCloud.defaultRegion,
        defaultRegionId: tencentCloud.defaultRegionId,
        instancesWs: tencentCloud.instancesWs,
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
                type: "tencentCloud/searchInstance",
                payload: {
                    platType: "tencent",
                    instanceId: instanceId,
                    regionId: regionId,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance?platType=tencent&regionId=${regionId}&instanceId=${instanceId}`);
        this.props.dispatch({
            type: "tencentCloud/updateInstanceWebSocket",
            payload: {ws: ws}
        });
        ws.onmessage = msgEv => {
            // rebuild data struct same to host list response
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
                    type: "tencentCloud/updateInstances",
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
