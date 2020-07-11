import React, {Component} from 'react';
import {connect} from 'dva';
import {
    PageHeader,
    Descriptions
} from 'antd';

import Refresh from "../Refresh";
import SearchHost from "../SearchHost";
import HostListColumnSetting from "../ColumnSetting";
import iconStyles from "../../../../../commons/iconfonts/icon.css";


@connect()
class HostListPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title={
                        <span>
                            {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                            <i style={{color: '#00474f', fontSize: 32}} className={iconStyles['iconfont']}>&#xe72f;</i>
                            &nbsp;&nbsp;Hosts list page
                        </span>
                    }
                    extra={[
                        <Refresh key="0"/>,
                        <SearchHost key="1"/>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item><HostListColumnSetting/></Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        );
    }
}


export default HostListPageHeader;
