import {Component} from 'react';
import {Input, Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';

import styles from './index.less'
import loadLocalStory from "../../../../../utils/loadLocalStory";
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
class TableTitle extends Component {

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

    actionSearch = (uuid) => {
        let newUuid = uuid.trim();
        // close old websocket conn while component unmount,
        // or old websocket alive still, page will blink after change page number or page size.
        // important!!!
        if (this.props.hostsWs) this.props.hostsWs.close();

        this.props.dispatch(
            {
                type: "host/searchHost",
                payload: {
                    uuid: newUuid,
                }
            }
        );

        let ws = new WebSocket(`${apiWsUrl}/host/ws?uuid=${newUuid}`);
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

    reloadHostList = () => {
        this.actionReload(this.props.pageNum, this.props.pageSize)
    };

    doSearch = (uuid) => {
        if (uuid !== '') {
            this.actionSearch(uuid)
        }
    };

    render() {
        return (
            <div className={styles['table-top']}>
                <span className={styles['table-top-left']}>
                    <span className={styles['top-items']}>
                        <span className={styles.test}>
                            <span className={styles['text']}>Host List Page</span>
                        </span>

                    </span>
                </span>

                <span className={styles['table-top-right']}>
                    <span className={styles['top-items']}>
                        {this.props.loading
                            ?
                            <Button
                                className={styles.refresh}
                                // onClick={this.reloadHostList}
                            >
                                <Icon type="loading"/>
                            </Button>
                            :
                            <Button
                                className={styles.refresh}
                                onClick={this.reloadHostList}
                            >
                                <Icon type="redo"/>
                            </Button>
                        }
                    </span>
                    <span className={styles['top-items']}>
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
                    </span>
                </span>
            </div>
        )
    }
}

export default TableTitle;
