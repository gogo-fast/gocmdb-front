import {Component} from 'react';
import {Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import {apiWsUrl} from "../../../../../utils/constants";

@connect(
    ({layout, loading, login, aliCloud}) => ({
        currentTheme: layout.theme,
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
class Refresh extends Component {

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

    reloadInstanceList = () => {
        this.actionReload(this.props.defaultRegionId, this.props.pageNum, this.props.pageSize)
    };

    render() {
        return (
            <span>
                {this.props.loading
                    ?
                    <Button type={(this.props.currentTheme.themeType === 'dark') ? 'primary' : 'default'}>
                        <Icon type="loading"/> Reload
                    </Button>
                    :
                    <Button type={(this.props.currentTheme.themeType === 'dark') ? 'primary' : 'default'}
                            onClick={this.reloadInstanceList}>
                        <Icon type="redo"/> Reload
                    </Button>
                }
            </span>
        )
    }
}

export default Refresh;
