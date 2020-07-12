import React, {Component} from 'react';
import {connect} from 'dva';
import {
    PageHeader,
    Descriptions
} from 'antd';

import iconStyles from "../../../../commons/iconfonts/icon.css";

@connect()
class DashboardPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title={
                        <span>
                            {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                            <i style={{color: '#00474f', fontSize: 32}} className={iconStyles['iconfont']}>&#xe6a4;</i>
                            &nbsp;&nbsp;Dashboard
                        </span>
                    }
                    extra={[]}
                >
                </PageHeader>
            </div>
        );
    }
}


export default DashboardPageHeader;
