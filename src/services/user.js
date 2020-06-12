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
                userId: userId
            }
        }).then(
        value => {
            if (!value.data.data.users) {
                value.data.data.users = [];
                return value
            } else {
                return value
            }
        }
    )
}

function svcGetUserById(reqData) {
    let {userId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user`,
            params: {
                userId: userId
            }
        }
    )
}

function svcGetUserByName(reqData) {
    // console.log('userName in service:', userName);
    // console.log('url in service:', `${apiUrl}/user/name?userName=${userName}`);
    let {userId, userName} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/user`,
            params: {
                userName: userName,
                userId: userId
            }
        }).then(
        value => {
            if (value.data.status === 'ok') {
                let {msg, status, data} = value.data;
                return Object.assign({}, {
                    data: {
                        msg: msg,
                        status: status,
                        data: {
                            "currentPageNum": 1,
                            "total": 1,
                            "users": [data],
                        }
                    }

                })
            } else {
                let {msg, status, data} = value.data;
                return Object.assign({}, {
                    data: {
                        msg: msg,
                        status: status,
                        data: {
                            "currentPageNum": 1,
                            "total": 0,
                            "users": [],
                        }
                    }
                })
            }
        }
    );
}

function svcUpdateUserStatus(reqData) {
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/status`,
            params: {
                userId: reqData.userId,
            },
            data: reqData,
        }
    )
}

function svcUpdateUserType(reqData) {
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/type`,
            params: {
                userId: reqData.userId,
            },
            data: reqData,
        }
    )
}

function svcUpdatePassword(reqData) {
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/password`,
            params: {
                userId: reqData.userId,
            },
            data: reqData,
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
                userId: userId
            }
        }
    )
}

function svcUpdateUserDetails(reqData) {
    let {userId} = reqData;
    return axios(
        {
            method: "PUT",
            url: `${apiUrl}/user/detail`,
            params: {
                userId: userId
            },
            data: reqData
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
    let formData = new FormData();
    formData.append("file", reqData.file);
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/user/avatar`,
            params: {
                userId: reqData.userId,
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
