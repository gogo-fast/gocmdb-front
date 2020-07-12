import React, {Component} from 'react';
import {connect} from 'dva';
import {PageHeader} from 'antd';

import Refresh from "../Refresh";
import SearchUser from "../SearchUser";
import iconStyles from '../../../../../commons/iconfonts/icon.css';


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
                    title={
                        <span>
                            {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                            <i style={{color: '#722ed1', fontSize: 32}} className={iconStyles['iconfont']}>&#xe737;</i>
                            &nbsp;&nbsp;Users list page
                        </span>
                    }
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
