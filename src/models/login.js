import {
    svcLogin
} from '../services/login'
import {
    svcGetUserDetailsById,
    svcUpdateUserDetails,
    svcUpdatePassword,
} from '../services/user'
import {
    message
} from 'antd';

import router from 'umi/router'
import loadLocalStory from "../utils/loadLocalStory";


export default {
    namespaces: "login",
    state: {},

    effects: {
        * userLogin(action, {call, put}) {
            const resp = yield call(svcLogin, action.payload);
            let {data, msg, status} = resp.data;
            let _uid = '';
            if (data.user) {
                let {userId} = data.user;
                if (userId) {
                    _uid = userId
                }
            }
            if (status === 'ok') {
                yield put({type: 'storeLoginData', payload: resp.data});
                // redirect while login success, but this operation should be inner effects,
                // do not place the route push operation inner reducers.
                let d = loadLocalStory('before_quit');
                if (d && (`${_uid}` in d)) {
                    if ('lastPathName' in d[_uid]) {
                        router.push(d[_uid]['lastPathName']);
                    } else {
                        router.push('/home');
                    }
                } else {
                    router.push('/home');
                }
            } else {
                message.error(msg)
            }
        },
        * updateDetails(action, {call, put}) {
            const resp = yield call(svcUpdateUserDetails, action.payload);
            yield put({type: "notification", payload: resp.data});
            if (resp.data.status === 'ok') {
                // get new user data after update user details, or you will get old data appeared
                // we could call effects innner the effects.
                yield put({type: "reloadCurrentUser", payload: action.payload});
            }
        },
        * reloadCurrentUser(action, {call, put}) {
            const resp = yield call(svcGetUserDetailsById, action.payload);
            let {msg, status} = resp.data;
            if (status === 'ok') {
                yield put({type: 'storeUserData', payload: resp.data});
            } else {
                message.error(msg)
            }
        },
        * setPassword(action, {call, put}) {
            const resp = yield call(svcUpdatePassword, action.payload);
            yield put({type: "notification", payload: resp.data});
        },
    },

    reducers: {
        storeLoginData(state, action) {
            let {data, msg, status} = action.payload;
            let {token, user} = data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return null
        },
        storeUserData(state, action) {
            // console.log(action.payload, '@@@@')
            let {data, msg, status} = action.payload;
            localStorage.setItem('user', JSON.stringify(data));
            return null
        },
        userLogout(state, action) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Object.assign({}, state, {})
        },
        notification(state, action) {
            let {msg, status} = action.payload;
            if (status === 'ok') {
                message.success(msg)
            } else {
                message.error(msg)
            }
            return null
        },
    }
}
