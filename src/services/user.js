import axios from 'axios';

// 对所有 axios 请求做允许携带 cookie 处理
// allow take cookie while do a ajax request
axios.defaults.withCredentials = true;

// 如果要对单独的请求设置，将 {withCredentials: true} 作为单独的配置设置在请求中。
// if you want setting withCredentials individually, place {withCredentials: true} inner the request data

import {
    apiUrl,
    ImgUrl,
} from "../utils/constants";


function svcGetUserList(reqData) {
    let {userId, pageNum, pageSize} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user/list`,
            params: {
                page: pageNum,
                size: pageSize,
                userId: userId,
            }
        }
    ).then(
        value => {
            let users = value.data.data.users;
            let total = value.data.data.total;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? total : 0,
                "users": (status === 'ok') ? users : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcGetUserById(reqData) {
    let {userId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user/id`,
            params: {
                userId: userId,
            }
        }
    ).then(
        value => {
            let users = value.data.data;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? 1 : 0,
                "users": (status === 'ok') ? users : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcGetUserByName(reqData) {
    let {userName} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user/name`,
            params: {
                userName: userName,
            }
        }
    ).then(
        value => {
            let users = value.data.data;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? 1 : 0,
                "users": (status === 'ok') ? users : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcUpdateUserStatus(reqData) {
    let {userId, userStatus} = reqData;
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/status`,
            params: {
                userId: userId,
            },
            data: {userStatus: userStatus},
        }
    )
}

function svcUpdateUserType(reqData) {
    let {userId, userType} = reqData;
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/type`,
            params: {
                userId: userId,
            },
            data: {userType: userType},
        }
    )
}

function svcUpdatePassword(reqData) {
    let {userId, password} = reqData;
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/password`,
            params: {
                userId: userId,
            },
            data: {password: password},
        }
    )
}

function svcGetUserDetailsById(reqData) {
    let {userId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user/detail`,
            params: {
                userId: userId,
            }
        }
    )
}

function svcUpdateUserDetails(reqData) {
    let {userId, details} = reqData;
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/detail`,
            params: {
                userId: userId,
            },
            data: details,
        }
    )
}

function svcRegisterUser(reqData) {
    return axios.post(
        `${apiUrl}/user`,
        reqData,
    )
}

function svcUploadAvatar(reqData) {
    let {userId, file} = reqData;
    let formData = new FormData();
    formData.append("file", file);
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/user/avatar`,
            params: {
                userId: userId,
            },
            data: formData,
        }
    )
}

function svcLoadAvatarFromUrl(reqData) {
    let {userId, avatarUrl} = reqData;
    console.log(userId, avatarUrl);
    return axios.get(`${reqData.avatarUrl}`)
}


export {
    svcGetUserList,
    svcGetUserById,
    svcGetUserByName,
    svcUpdateUserStatus,
    svcUpdateUserType,
    svcUpdatePassword,
    svcGetUserDetailsById,
    svcUpdateUserDetails,
    svcRegisterUser,
    svcUploadAvatar,
    svcLoadAvatarFromUrl,
}
