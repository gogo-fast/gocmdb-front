import {
    svcUploadAvatar,
    svcLoadAvatarFromUrl,
} from '../services/user'


import {
    message
} from 'antd';
import loadLocalStory from "../utils/loadLocalStory";


export default {
    namespaces: "avatar",
    state: {
        avatarUrl: null,
        // avatarData: null,
    },

    effects: {
        * uploadAvatar(action, {call, put}) {
            const resp = yield call(svcUploadAvatar, action.payload);
            // {"data":{"fileUrl":"http://127.0.0.1:8000/user/70/3fb19a44-3c25-428b-84a0-1429395a6e26.jpg"},"msg":"upload file success","status":"ok"}
            yield put({type: "notification", payload: resp.data});
            yield put({type: "updateAvatar", payload: resp.data});
        },
    },

    reducers: {
        notification(state, action) {
            let {msg, status} = action.payload;
            if (status === 'ok') {
                message.success(msg)
            } else {
                message.error(msg)
            }
            return state
        },
        updateAvatar (state, action) {
            let avatar = action.payload.data.fileUrl;
            let cu = loadLocalStory('user');
            cu.avatar = avatar;
            localStorage.setItem('user', JSON.stringify(cu));
            return Object.assign({}, state, {
                avatarUrl: action.payload.data.fileUrl,
            })
        },
        loadAvatarUrl (state, action) {
            return Object.assign({}, state, {
                avatarUrl: action.payload.avatarUrl,
            })
        }

    }
}
