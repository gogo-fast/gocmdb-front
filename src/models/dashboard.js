import {
    svcLoadInstancesStatusList,
    svcGetAllInstancesStatusList,
} from "../services/cloud";
import {
    message
} from 'antd';
import {svcGetHostList} from "../services/host";
import {svcGetUserList} from "../services/user";


export default {
    namespaces: "dashboard",
    state: {
        aliInstancesStatus: {
            /*
            * <regionId> : [
                 {
                    "InstanceId": "ins-n0su500d",
                    "InstanceState": "RUNNING"
                 }
              ]
            * */
        },
        tencentInstancesStatus: {
            /*
            * <regionId> : [
                 {
                    "InstanceId": "ins-n0su500d",
                    "InstanceState": "RUNNING"
                 }
              ]
            * */
        },
        hostsCount: 0,
        usersCount: 0,
    },
    effects: {
        * getInstanceCount(action, {call, put}) {
            const resp = yield call(svcGetAllInstancesStatusList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({
                type: "updateInstancesStatus",
                payload: {
                    platType: action.payload.platType,
                    regionId: action.payload.regionId,
                    instancesStatus: resp.data.data.instancesStatus,
                }
            })
        }
        ,
        * getHostCount(action, {call, put}) {
            const resp = yield call(svcGetHostList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({type: "updateHostCount", payload: resp.data})
        }
        ,
        * getUserCount(action, {call, put}) {
            const resp = yield call(svcGetUserList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({type: "updateUserCount", payload: resp.data})
        },
    }
    ,
    reducers: {
        updateInstancesStatus(state, action) {
            let {platType, regionId, instancesStatus} = action.payload;
            let newState = Object.assign({}, state);
            switch (platType) {
                case 'aliyun':
                    newState.aliInstancesStatus[regionId] = instancesStatus;
                    return newState;
                case 'tencent':
                    newState.tencentInstancesStatus[regionId] = instancesStatus;
                    return newState;
                default:
                    return state;
            }
        },
        updateHostCount(state, action) {
            return Object.assign({}, state, {hostsCount: action.payload.data.total})
        },
        updateUserCount(state, action) {
            return Object.assign({}, state, {usersCount: action.payload.data.total})
        },
        subscriptions: {}
    }
}