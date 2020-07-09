import {Component} from 'react';
import {Input, Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import {apiWsUrl} from "../../../../../utils/constants";


@connect(
    ({layout, loading, host}) => ({
        currentTheme: layout.theme,
        loading: loading.models.host,
        pageNum: host.hostListPageNum,
        pageSize: host.hostListPageSize,
        hostsWs: host.hostsWs,
    })
)
@withRouter
class Refresh extends Component {

    actionReload = (pageNum, pageSize) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.hostsWs) this.props.hostsWs.close();

        this.props.dispatch(
            {
                type: "host/getHostList",
                payload: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/host/ws/list?page=${pageNum}&size=${pageSize}`);
        this.props.dispatch({
            type: "host/updateHostWebSocket",
            payload: {ws: ws}
        });
        ws.onmessage = msgEv => {
            this.props.dispatch(
                {
                    type: "host/updateHosts",
                    payload: JSON.parse(msgEv.data),
                }
            );
        }
    };

    reloadHostList = () => {
        this.actionReload(this.props.pageNum, this.props.pageSize)
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
                            onClick={this.reloadHostList}>
                        <Icon type="redo"/> Reload
                    </Button>
                }
            </span>
        )
    }
}

export default Refresh;
