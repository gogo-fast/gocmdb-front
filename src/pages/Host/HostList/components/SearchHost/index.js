import {Component} from 'react';
import {Input, Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import {apiWsUrl} from "../../../../../utils/constants";


const {Search} = Input;


@connect(
    ({loading, host}) => ({
        loading: loading.models.host,
        pageNum: host.hostListPageNum,
        pageSize: host.hostListPageSize,
        hostsWs: host.hostsWs,
    })
)
@withRouter
class SearchHost extends Component {

    actionSearch = (uuid) => {
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.hostsWs) this.props.hostsWs.close();

        this.props.dispatch(
            {
                type: "host/searchHost",
                payload: {
                    uuid: uuid,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/host/ws?uuid=${uuid}`);
        this.props.dispatch({
            type: "host/updateHostWebSocket",
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
                    "hosts": (status === 'ok') ? data : [],
                    "currentPageNum": -1,
                }
            };
            this.props.dispatch(
                {
                    type: "host/updateHosts",
                    payload: newResp,
                }
            );
        }

    };

    doSearch = (uuid) => {
        let newUuid = uuid.trim();
        if (newUuid !== '') {
            this.actionSearch(newUuid)
        }
    };

    render() {
        return (
            <Search
                placeholder="do search by uuid ..."
                onPressEnter={e => {
                    this.doSearch(e.currentTarget.value)
                }}
                onSearch={value => {
                    this.doSearch(value)
                }}
                style={{width: 350}}
            />
        )
    }
}

export default SearchHost;
