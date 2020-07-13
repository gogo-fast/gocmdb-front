import axios from 'axios';

// 对所有 axios 请求做允许携带 cookie 处理
// allow take cookie while do a ajax request
axios.defaults.withCredentials = true;

// 如果要对单独的请求设置，将 {withCredentials: true} 作为单独的配置设置在请求中。
// if you want setting withCredentials individually, place {withCredentials: true} inner the request data

import {
    apiUrl,
} from "../utils/constants";

function svcGetHostList(reqData) {
    let {pageNum, pageSize} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/host/list`,
            params: {
                page: pageNum,
                size: pageSize,
            }
        }
    ).then(
        value => {
            let total = value.data.data.total;
            let hosts = value.data.data.hosts;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? total : 0,
                "hosts": (status === 'ok') ? hosts : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcGetHostByUUID(reqData) {
    // console.log('userName in service:', userName);
    // console.log('url in service:', `${apiUrl}/user/name?userName=${userName}`);
    let {uuid} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/host`,
            params: {
                uuid: uuid,
            }
        }
    ).then(
        value => {
            let hosts = value.data.data;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? 1 : 0,
                "hosts": (status === 'ok') ? hosts : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcStartHost(reqData) {
    console.log("~~~~~~~~svcStartHost~~~~~~")
    return {}
}

function svcRebootHost() {
    console.log("~~~~~~~~svcRebootHost~~~~~~")
    return {}
}

function svcStopHost(reqData) {
    let {userId, uuid, clusterIp} = reqData;
    // console.log(userId, uuid, action);
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/host/stop`,
            params: {
                uuid: uuid,
                userId: userId,
                clusterIp: clusterIp,
            }
        }
    )
}

function svcDeleteHost(reqData) {
    let {userId, uuid, clusterIp} = reqData;
    // console.log(userId, uuid, action);
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/host/delete`,
            params: {
                uuid: uuid,
                userId: userId,
            }
        }
    )
}


export {
    svcGetHostList,
    svcGetHostByUUID,
    svcStartHost,
    svcRebootHost,
    svcStopHost,
    svcDeleteHost,
};
