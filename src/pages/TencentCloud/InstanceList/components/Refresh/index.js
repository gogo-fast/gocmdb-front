import {Component} from 'react';
import {Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import {apiWsUrl} from "../../../../../utils/constants";

@connect(
    ({layout, loading, login, tencentCloud}) => ({
        currentTheme: layout.theme,
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
class Refresh extends Component {

    actionReload = (regionId, pageNum, pageSize) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.instancesWs) this.props.instancesWs.close();

        this.props.dispatch(
            {
                type: "tencentCloud/getInstanceList",
                payload: {
                    platType: "tencent",
                    regionId: regionId,
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/cloud/ws/instance/list?platType=tencent&regionId=${regionId}&page=${pageNum}&size=${pageSize}`);
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
