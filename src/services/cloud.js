import axios from 'axios';
import {
    apiUrl
} from "../utils/constants";

function svcGetSecurityGroups(reqData) {
    let {platType, regionId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/cloud/sgs`,
            params: {
                platType: platType,
                regionId: regionId,
            },
        }
    )
}

function svcGetRegions(reqData) {
    let {platType} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/cloud/regions`,
            params: {
                platType: platType,
            },
        }
    ).then(
        value => {
            let regions = value.data.data;
            let status = value.data.status;
            value.data.data = {
                "regions": (status === 'ok') ? regions : [],
            };
            return value;
        }
    )
}

function svcLoadInstancesStatusList(reqData) {
    let {platType, regionId, instanceIds} = reqData;
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/cloud/instance/status/list`,
            params: {
                platType: platType,
                regionId: regionId,
            },
            data: {
                instanceIds: instanceIds,
            }
        }
    ).then(
        value => {
            let total = value.data.data.total;
            let instancesStatus = value.data.data.instancesStatus;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? total : 0,
                "instancesStatus": (status === 'ok') ? instancesStatus : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}


function svcGetAllInstancesStatusList(reqData) {
    let {platType, regionId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/cloud/instance/status/all`,
            params: {
                platType: platType,
                regionId: regionId,
            },
        }
    ).then(
        value => {
            let total = value.data.data.total;
            let instancesStatus = value.data.data.instancesStatus;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? total : 0,
                "instancesStatus": (status === 'ok') ? instancesStatus : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}


function svcGetInstanceList(reqData) {
    let {platType, regionId, pageNum, pageSize} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/cloud/instance/list`,
            params: {
                platType: platType,
                regionId: regionId,
                page: pageNum,
                size: pageSize,
            },
        }
    ).then(
        value => {
            let total = value.data.data.total;
            let instances = value.data.data.instances;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? total : 0,
                "instances": (status === 'ok') ? instances : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}


function svcGetInstanceById(reqData) {
    let {platType, regionId, instanceId} = reqData;
    return axios(
        {
            method: "GET",
            url: `${apiUrl}/cloud/instance`,
            params: {
                platType: platType,
                regionId: regionId,
                instanceId: instanceId,
            },
        }
    ).then(
        value => {
            let instances = value.data.data;
            let status = value.data.status;
            value.data.data = {
                "total": (status === 'ok') ? 1 : 0,
                "instances": (status === 'ok') ? instances : [],
                "currentPageNum": -1,
            };
            return value
        }
    )
}

function svcStartInstanceById(reqData) {
    let {platType, regionId, instanceId} = reqData;
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/cloud/instance/start`,
            params: {
                platType: platType,
                regionId: regionId,
                instanceId: instanceId,
            },
        }
    )
}

function svcStopInstanceById(reqData) {
    let {platType, regionId, instanceId} = reqData;
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/cloud/instance/stop`,
            params: {
                platType: platType,
                regionId: regionId,
                instanceId: instanceId,
            },
        }
    )
}

function svcRebootInstanceById(reqData) {
    let {platType, regionId, instanceId} = reqData;
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/cloud/instance/reboot`,
            params: {
                platType: platType,
                regionId: regionId,
                instanceId: instanceId,
            },
        }
    )
}

function svcDeleteInstanceById(reqData) {
    let {platType, regionId, instanceId} = reqData;
    return axios(
        {
            method: "POST",
            url: `${apiUrl}/cloud/instance/delete`,
            params: {
                platType: platType,
                regionId: regionId,
                instanceId: instanceId,
            },
        }
    )
}


export {
    svcGetSecurityGroups,
    svcGetInstanceList,
    svcGetInstanceById,
    svcGetRegions,
    svcStartInstanceById,
    svcStopInstanceById,
    svcRebootInstanceById,
    svcDeleteInstanceById,
    svcLoadInstancesStatusList,
    svcGetAllInstancesStatusList
}
