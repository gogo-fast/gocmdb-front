import {
    message
} from 'antd';
import {
    svcGetHostList,
    svcGetHostByUUID,
    svcStopHost,
    svcDeleteHost,
} from "../services/host";
import {apiWsUrl} from "../utils/constants";


export default {
    namespaces: "host",
    state: {
        hosts: [],
        total: 0,
        hostListPageNum: 1,
        hostListPageSize: 5,
        hostsWs: null,
    },
    effects: {
        * getHostList(action, {call, put}) {
            const resp = yield call(svcGetHostList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({type: "updateHosts", payload: resp.data})
        },
        * searchHost(action, {call, put}) {
            const resp = yield call(svcGetHostByUUID, action.payload);
            yield put({type: "updateHosts", payload: resp.data})
        },
        * stopHost(action, {call, put}) {
            const resp = yield call(svcStopHost, action.payload);
            yield put({type: "notification", payload: resp.data});
        },
        * deleteHost(action, {call, put}) {
            const resp = yield call(svcDeleteHost, action.payload);
            yield put({type: "notification", payload: resp.data});
            let {status, msg, data} = resp.data;
            // let {uuid, pageNum, pageSize} = action.payload;
            if (status === 'ok') {
                const newResp = yield call(svcGetHostList, action.payload);
                yield put({type: "updateHosts", payload: newResp.data})
            }
        },
    },
    reducers: {
        updateHosts(state, action) {
            let currentPageNum = action.payload.data.currentPageNum;
            console.log("currentPageNum", currentPageNum)
            return Object.assign({}, state, {
                hosts: action.payload.data.hosts,
                total: action.payload.data.total,
                hostListPageNum: (currentPageNum === -1) ? state.hostListPageNum: currentPageNum,

            })
        },
        notification(state, action) {
            let {msg, status} = action.payload;
            if (status === 'ok') {
                message.success(msg)
            } else {
                message.error(msg)
            }
            return state
        },
        setPagination(state, action) {
            return Object.assign({}, state, {
                hostListPageNum: action.payload.hostListPageNum,
                hostListPageSize: action.payload.hostListPageSize,
            })
        },
        updateHostWebSocket(state, action) {
            return Object.assign({}, state, {hostsWs: action.payload.ws})
        }
    },
    subscriptions: {
        loadHostsPage({dispatch, history}) {
            return history.listen(
                // callback while pathname or query change
                ({pathname, query}) => {
                    if (pathname === '/host/list') {
                        let searchStr = history.location.search;
                        const ws = new WebSocket(`${apiWsUrl}/host/ws/list${searchStr}`);
                        dispatch({
                            type: "updateHostWebSocket",
                            payload: {ws: ws}
                        });
                        ws.onmessage = msgEv => dispatch({
                            type: "updateHosts",
                            payload: JSON.parse(msgEv.data),
                        });
                    }
                }
            )
        },
    }

}
