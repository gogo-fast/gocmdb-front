import React, {Component} from 'react';
import {connect} from 'dva';
import {PageHeader} from 'antd';

import Refresh from "../Refresh";
import SearchUser from "../SearchUser";

@connect(
    ({layout, loading}) => ({
        currentTheme: layout.theme,
        loading: loading.models.user,
    })
)
class UserListPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title="Users list page"
                    extra={[
                        <Refresh key="0"/>,
                        <SearchUser key="1"/>,
                    ]}
                >
                </PageHeader>
            </div>
        );
    }
}


export default UserListPageHeader;
