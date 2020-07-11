import {
    svcGetSecurityGroups,
    svcGetInstanceList,
    svcGetInstanceById,
    svcGetRegions,
    svcStartInstanceById,
    svcStopInstanceById,
    svcRebootInstanceById,
    svcDeleteInstanceById,
} from "../services/cloud";
import {
    message
} from 'antd';
import aliyunRegionMap from "../../config/aliyunRegionConfig";

export default {
    namespaces: "aliCloud",
    state: {
        regions: [],
        defaultRegionId: "cn-qingdao",
        sgs: [],
        selectedColumns: [],
        instances: [],
        total: 0,
        instanceListPageNum: 1,
        instanceListPageSize: 5,
        instancesWs: null,
    },
    effects: {
        * getRegions(action, {call, put}) {
            const resp = yield call(svcGetRegions, action.payload);
            yield put({type: "updateRegions", payload: resp.data});
        },
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
        },
        * startInstance(action, {call, put}) {
            const resp = yield call(svcStartInstanceById, action.payload);
            yield put({type: "notification", payload: resp.data})
        },
        * stopInstance(action, {call, put}) {
            const resp = yield call(svcStopInstanceById, action.payload);
            yield put({type: "notification", payload: resp.data})
        },
        * rebootInstance(action, {call, put}) {
            const resp = yield call(svcRebootInstanceById, action.payload);
            yield put({type: "notification", payload: resp.data})
        },
        * deleteInstance(action, {call, put}) {
            const resp = yield call(svcDeleteInstanceById, action.payload);
            yield put({type: "notification", payload: resp.data})
        },
    },
    reducers: {
        updateInstances(state, action) {
            let currentPageNum = action.payload.data.currentPageNum;
            return Object.assign({}, state, {
                instances: action.payload.data.instances,
                total: action.payload.data.total,
                instanceListPageNum: (currentPageNum === -1) ? state.instanceListPageNum : currentPageNum,
            })
        },
        updateRegions(state, action) {
            let newRegions = [];
            action.payload.data.map(
                value => {
                    if (value.RegionId in aliyunRegionMap) {
                        newRegions.push(aliyunRegionMap[value.RegionId])
                    } else {
                        newRegions.push(value)
                    }
                }
            );
            // return Object.assign({}, state, {regions: action.payload.data})
            return Object.assign({}, state, {regions: newRegions})
        },
        updateDefaultRegionId(state, action) {
            let {defaultRegionId} = action.payload;
            return Object.assign({}, state, {defaultRegionId: defaultRegionId})
        },
        updateSgs(state, action) {
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
        updateSelectedColumns(state, action) {
            return Object.assign({}, state, {selectedColumns: action.payload.selectedColumns})
        },
        updateInstanceWebSocket(state, action) {
            return Object.assign({}, state, {instancesWs: action.payload.ws})
        }
    },
    subscriptions: {}
}
