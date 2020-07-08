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
        * updateType(action, {call, put}) {
            const resp = yield call(svcUpdateUserType, action.payload);
            yield put({type: "notification", payload: resp.data});
            let {status, msg, data} = resp.data;
            if (status === 'ok') {
                let {userId, currentUserId} = action.payload;
                const newResp = yield call(svcGetUserById, action.payload);
                yield put({type: "updateSingleUser", payload: newResp.data});
                yield put({type: "getUserDetails", payload: {userId}});
                // if user updated is login user update reload details of login user.
                if (userId === currentUserId) {
                    // here could call functions in other namespaces.
                    yield put({type: "login/reloadCurrentUser", payload: {userId: currentUserId}})
                }
            }
        },
        * updateStatus(action, {call, put}) {
            const resp = yield call(svcUpdateUserStatus, action.payload);
            yield put({type: "notification", payload: resp.data});
            let {status, msg, data} = resp.data;
            let {userId, userStatus, currentUserId} = action.payload;
            if (status === 'ok') {
                if (userStatus !== "2") {
                    const newResp = yield call(svcGetUserById, action.payload);
                    yield put({type: "updateSingleUser", payload: newResp.data});
                    yield put({type: "getUserDetails", payload: {userId}});
                } else {
                    const newResp = yield call(svcGetUserList, action.payload);
                    yield put({type: "updateUsers", payload: newResp.data});
                }
                // if user updated is login user update reload details of login user.
                if (userId === currentUserId) {
                    // here could call functions in other namespaces.
                    yield put({type: "login/reloadCurrentUser", payload: {userId: currentUserId}})
                }
            }
        },
        * searchUser(action, {call, put}) {
            const resp = yield call(svcGetUserByName, action.payload);
            yield put({type: "updateUsers", payload: resp.data})
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
                // if user updated is login user update reload details of login user.
                let {userId, currentUserId} = action.payload;
                if (userId === currentUserId) {
                    // here could call functions in other namespaces.
                    yield put({type: "login/reloadCurrentUser", payload: {userId: currentUserId}})
                }
            }
        },
        * registerUser(action, {call, put}) {
            const resp = yield call(svcRegisterUser, action.payload);
            yield put({type: "notification", payload: resp.data});
        },
    },

    reducers: {
        updateUsers(state, action) {
            let currentPageNum = action.payload.data.currentPageNum;
            return Object.assign({}, state, {
                users: action.payload.data.users,
                total: action.payload.data.total,
                userListPageNum: (currentPageNum === -1) ? state.userListPageNum : currentPageNum,
            })
        },
        updateSingleUser(state, action) {
            let newUsers = [];
            let user = action.payload.data.users[0];
            if (user) {
                state.users.forEach(
                    value => {
                        if (value.userId === user.userId) {
                            newUsers.push(Object.assign(value, user))
                        } else {
                            newUsers.push(value)
                        }
                    }
                );
            }
            return Object.assign({}, state, {
                users: newUsers
            })
        },
        storeUserDetails(state, action) {
            let {userId} = action.payload.data;
            let newDetails = {};
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
