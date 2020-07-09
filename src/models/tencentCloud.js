import {
    svcGetSecurityGroups,
    svcGetInstanceList,
    svcGetInstanceById,
} from "../services/cloud";
import {
    message
} from 'antd';
import {apiWsUrl} from "../utils/constants";


export default {
    namespaces: "tencentCloud",
    state: {
        regions: [],
        defaultRegionId: "ap-beijing",
        sgs: [],
        instances: [],
        total: 0,
        instanceListPageNum: 1,
        instanceListPageSize: 5,
        instancesWs: null,
    },
    effects: {
        * getInstanceList(action, {call, put}) {
            const resp = yield call(svcGetInstanceList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({type: "updateInstances", payload: resp.data})
        },
        * searchInstance(action, {call, put}) {
            const resp = yield call(svcGetInstanceById, action.payload);
            yield put({type: "updateInstances", payload: resp.data})
        },
        * getSecurityGroups(action, {call, put}) {
            const resp = yield call(svcGetSecurityGroups, action.payload);
            yield put({type: "updateSgs", payload: resp.data});
            yield put({type: "notification", payload: resp.data})
        }
    },
    reducers: {
        updateInstances(state, action) {
            return Object.assign({}, state, {
                instances: action.payload.data.hosts,
                total: action.payload.data.total,
                hostListPageNum: action.payload.data.currentPageNum,
            })
        },
        updateSgs(state, action) {
            console.log(1111, action.payload);
            return Object.assign({}, state, {sgs: action.payload.data})
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
                instanceListPageNum: action.payload.instanceListPageNum,
                instanceListPageSize: action.payload.instanceListPageSize,
            })
        },
        updateInstanceWebSocket(state, action) {
            return Object.assign({}, state, {instancesWs: action.payload.ws})
        }
    },
    subscriptions: {}
}
