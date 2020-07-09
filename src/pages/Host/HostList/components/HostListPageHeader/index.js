import React, {Component} from 'react';

import {PageHeader} from 'antd';

import Refresh from "../Refresh";
import SearchHost from "../SearchHost";


class HostListPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title="Hosts list page"
                    extra={[
                        <Refresh key="0"/>,
                        <SearchHost key="1"/>,
                    ]}
                >
                </PageHeader>
            </div>
        );
    }
}


export default HostListPageHeader;
