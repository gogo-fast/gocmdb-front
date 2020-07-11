const hostListColumnMap = {
    // 'id': 'ID',

    // main
    'uuid': 'UUID',
    'isOnline': 'Online Status',
    'hostStatus': 'Host Status',
    'outBoundIp': "Out Bound IP",
    'clusterIp': "Cluster IP",
    'hostname': 'Host Name',
    'os': 'OS',
    'arch': 'Arch',
    'cpuCount': 'Cpu Count',
    'cpuUsePercent': 'Cpu Use Percent',
    'ramPercent': 'Ram Usage Percent',

    // expand
    'ips': 'Ip List',
    'ramTotal': 'Ram Total',
    'ramUsed': 'Ram Used',
    'disks': 'Disks',
    'avgLoad': 'Load Average',
    'bootTime': 'Boot Time',
    'createTime': 'Create Time',
    'updateTime': 'Update Time',
    'deleteTime': 'Delete Time',
};


// mainColumns is a sub set of keys of hostListColumnMap
const mainColumns = [
    'uuid',
    'isOnline',
    'hostStatus',
    'outBoundIp',
    'clusterIp',
    'hostname',
    'os',
    'arch',
    'cpuCount',
    'cpuUsePercent',
    'ramPercent',
];

// defaultMainColumns is a sub set of mainColumns
const defaultMainColumns = [
    'uuid',
    'isOnline',
    'hostStatus',
    'outBoundIp',
    'clusterIp',
    'hostname',
    'os',
    // 'arch',
    // 'cpuCount',
    'cpuUsePercent',
    'ramPercent',
];


const expandColumns = [
    'ips',
    'ramTotal',
    'ramUsed',
    'disks',
    'bootTime',
    'createTime',
    'updateTime',
    'deleteTime',
];

export {
    hostListColumnMap,
    mainColumns,
    defaultMainColumns,
    expandColumns,
};
