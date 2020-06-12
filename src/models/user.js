import {
    svcGetUserList,
    svcGetUserById,
    svcGetUserByName,
    svcUpdateUserStatus,
    svcUpdateUserType,
    svcGetUserDetailsById,
    svcUpdateUserDetails,
    svcRegisterUser,
} from '../services/user'

import {
    message
} from 'antd';
import loadLocalStory from "../utils/loadLocalStory";


export default {
    namespaces: "user",
    state: {
        users: [],
        total: 0,
        userListPageNum: 1,
        userListPageSize: 5,
        userDetails: {},
    },

    effects: {
        * loadUsers(action, {call, put}) {
            const resp = yield call(svcGetUserList, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            }
            yield put({type: "updateUsers", payload: resp.data})
        },
        * updateStatus(action, {call, put}) {
            const resp = yield call(svcUpdateUserStatus, action.payload);
            yield put({type: "notification", payload: resp.data});
            let {status, msg, data} = resp.data;
            let {userId, userStatus, pageNum, pageSize} = action.payload;
            if (status === 'ok') {
                if (userStatus !== "2") {
                    const newResp = yield call(svcGetUserById, action.payload);
                    yield put({type: "updateSingleUser", payload: newResp.data})
                } else {
                    const newResp = yield call(svcGetUserList, action.payload);
                    yield put({type: "updateUsers", payload: newResp.data})
                }
            }
        },
        * updateType(action, {call, put}) {
            const resp = yield call(svcUpdateUserType, action.payload);
            yield put({type: "notification", payload: resp.data});
            let {status, msg, data} = resp.data;
            if (status === 'ok') {
                let {userId} = action.payload;
                const newResp = yield call(svcGetUserById, action.payload);
                yield put({type: "updateSingleUser", payload: newResp.data})
            }
        },
        * searchUser(action, {call, put}) {
            const data = yield call(svcGetUserByName, action.payload);
            yield put({type: "updateUsers", payload: data.data})
        },
        * getUserDetails(action, {call, put}) {
            const resp = yield call(svcGetUserDetailsById, action.payload);
            if (resp.data.status === 'error') {
                yield put({type: "notification", payload: resp.data});
            } else {
                yield put({type: "storeUserDetails", payload: resp.data})
            }
        },
        * updateDetails(action, {call, put}) {
            const resp = yield call(svcUpdateUserDetails, action.payload);
            yield put({type: "notification", payload: resp.data});
            if (resp.data.status === 'ok') {
                // get new user data after update user details, or you will get old data appeared
                // we could call effects innner the effects.
                yield put({type: "getUserDetails", payload: action.payload});
            }
        },
        * registerUser(action, {call, put}) {
            const resp = yield call(svcRegisterUser, action.payload);
            yield put({type: "notification", payload: resp.data});
        },
    },

    reducers: {
        updateUsers(state, action) {
            return Object.assign({}, state, {
                users: action.payload.data.users,
                total: action.payload.data.total,
                userListPageNum: action.payload.data.currentPageNum,
            })
        },
        updateSingleUser(state, action) {
            let newUsers = [];
            state.users.forEach(
                value => {
                    if (value.userId === action.payload.data.userId) {
                        newUsers.push(Object.assign(value, action.payload.data))
                    } else {
                        newUsers.push(value)
                    }
                }
            );
            return Object.assign({}, state, {
                users: newUsers
            })
        },
        storeUserDetails(state, action) {
            let {userId} = action.payload.data;
            let newDetails = {};
            let currentUser = loadLocalStory('user');
            if (currentUser && ("userId" in currentUser)) {
                if (userId === currentUser.userId) {
                    localStorage.setItem('user', JSON.stringify(action.payload.data))
                }
            }
            newDetails[userId] = action.payload.data;
            return Object.assign({}, state, {
                userDetails: Object.assign({}, state.userDetails, newDetails)
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
                userListPageNum: action.payload.userListPageNum,
                userListPageSize: action.payload.userListPageSize,
            })
        },
    }
}
