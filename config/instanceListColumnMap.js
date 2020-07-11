const instanceListColumnMap = {

    // main columns
    'InstanceId': 'InstanceId',
    'HostName': 'HostName',
    'RegionId': 'RegionId',
    'Status': 'Status',
    'OSName': 'OS',
    'Cpu': 'Cpu Count',
    'Memory': 'Memory',
    'InternetMaxBandwidthIn': 'Bandwidth In',
    'InternetMaxBandwidthOut': 'Bandwidth Out',

    // expand columns
    'Uuid': 'UUID',
    'InstanceType': 'InstanceType',
    'CreatedTime': 'CreatedTime',
    'Description': 'Description',
    'InternetChargeType': 'InternetChargeType',
    'VpcId': 'VpcId',
    'PrivateIpAddress': 'PrivateIpAddress',
    'PublicIpAddress': 'PublicIpAddress',
};


// mainColumns is a sub set of keys of hostListColumnMap
const mainColumns = [
    'InstanceId',
    'HostName',
    'RegionId',
    'Status',
    'OSName',
    'Cpu',
    'Memory',
    'InternetMaxBandwidthIn',
    'InternetMaxBandwidthOut',
];

// defaultMainColumns is a sub set of mainColumns
const defaultMainColumns = [
    'InstanceId',
    // 'HostName',
    'RegionId',
    'Status',
    'OSName',
    'Cpu',
    'Memory',
    'InternetMaxBandwidthIn',
    'InternetMaxBandwidthOut',
];


const expandColumns = [
    'Uuid',
    'InstanceType',
    'CreatedTime',
    'Description',
    'InternetChargeType',
    'VpcId',
    'PrivateIpAddress',
    'PublicIpAddress',
];

export {
    instanceListColumnMap,
    mainColumns,
    defaultMainColumns,
    expandColumns,
};
