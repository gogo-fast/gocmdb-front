import React, {Component} from 'react';
import {connect} from 'dva';


import {
    PageHeader,
    Descriptions,
} from 'antd';

import Refresh from "../Refresh";
import SearchInstance from "../SearchInstance";
import Region from "../Region";
import InstanceListColumnSetting from "../ColumnSetting";
import iconStyles from '../../../../../commons/iconfonts/icon.css';


@connect()
class InstanceListPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title={
                        <span>
                             {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                            <i style={{color: '#fa8c16', fontSize: 32}} className={iconStyles['iconfont']}>&#xe672;</i>
                            &nbsp;&nbsp;Instances list page
                        </span>
                    }
                    extra={[
                        <Refresh key="1"/>,
                        <SearchInstance key="2"/>,
                    ]}
                >
                    <Descriptions size="small" column={4}>
                        <Descriptions.Item label="Select region"><Region/></Descriptions.Item>
                        <Descriptions.Item>
                            <InstanceListColumnSetting/>
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        );
    }
}


export default InstanceListPageHeader;
