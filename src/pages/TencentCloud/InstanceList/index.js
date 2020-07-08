import {connect} from 'dva'
import React, {Component} from 'react';
import {
    Table,
    Tag,
    Icon,
    Progress,
    Badge,
} from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter'

import TencentCloud from "../index";
import {parseSearch, validPageSize, validPageNum} from "../../../utils/parseSearch";
import {
    pageSizeOptions
} from '../../../utils/constants'
import distinctArrayPush from "../../../utils/distinctArrayPush";
import {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath,
} from "../../../utils/parseLocation";

@connect(
    ({host, loading, layout}) => ({
        hosts: host.hosts,
        total: host.total,
        loading: loading.models.host,
        pageNum: host.hostListPageNum,
        pageSize: host.hostListPageSize,
        hostsWs: host.hostsWs,
        openKeys: layout.openKeys,
        siderCollapsed: layout.siderCollapsed,
    })
)
@withRouter
class InstanceList extends Component {

    componentWillMount() {

    }

    render() {

        return (
            <TencentCloud>
                <div>
                    tencent cloud page
                </div>
            </TencentCloud>
        )
    }
}

export default InstanceList;

