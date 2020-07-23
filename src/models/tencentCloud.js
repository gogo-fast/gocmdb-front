import moment from "moment";
import {
    svcGetSecurityGroups,
    svcGetInstanceList,
    svcGetInstanceById,
    svcGetRegions,
    svcStartInstanceById,
    svcStopInstanceById,
    svcRebootInstanceById,
    svcDeleteInstanceById,
    svcLoadMonitorData,
} from "../services/cloud";
import {
    message
} from 'antd';
import tencentRegionMap from "../../config/tencentRegionConfig";


export default {
    namespaces: "tencentCloud",
    state: {
        regions: [],
        defaultRegionId: "ap-chengdu",
        sgs: [],
        selectedColumns: [],
        instances: [],
        total: 0,
        instanceListPageNum: 1,
        instanceListPageSize: 5,
        instancesWs: null,
        startTime: moment(Date.now() - 1000 * 600),
        endTime: moment(Date.now()),
        period: '10',
        durationType: "fixed",
        monitorData: {
            cpuusage: {
                /*
                * instanceId1 : {Timestamps:[], Values:[]}
                * instanceId2 : {Timestamps:[], Values:[]}
                * */
            },
            memused: {
                /*
                * instanceId1 : {Timestamps:[], Values:[]}
                * instanceId2 : {Timestamps:[], Values:[]}
                * */
            }
        }
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
            let regions = action.payload.data.regions;
            regions.map(
                value => {
                    if (value.RegionId in tencentRegionMap) {
                        newRegions.push(tencentRegionMap[value.RegionId])
                    } else {
                        newRegions.push(value)
                    }
                }
            );
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
            return Object.assign({}, state, {instancesWs: action.payload.instancesWs})
        },
        updateStartTime(state, action) {
            return Object.assign({}, state, {startTime: action.payload})
        },
        updateEndTime(state, action) {
            return Object.assign({}, state, {endTime: action.payload})

        },
        updatePeriod(state, action) {
            return Object.assign({}, state, {period: action.payload})

        },
        updateDurationType(state, action) {
            return Object.assign({}, state, {durationType: action.payload})
        },
    },
    subscriptions: {}
}
