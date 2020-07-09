import React, {Component} from 'react';
import {connect} from 'dva';


import {
    PageHeader,
    Descriptions,
} from 'antd';

import Refresh from "../Refresh";
import SearchInstance from "../SearchInstance";
import Region from "../Region";
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
                            <i style={{color: '#fa8c16'}} className={iconStyles['iconfont']}>&#xe672;</i>
                            &nbsp;&nbsp;Instances list page
                        </span>
                    }
                    extra={[
                        <Refresh key="1"/>,
                        <SearchInstance key="2"/>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Select region"><Region/></Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        );
    }
}


export default InstanceListPageHeader;
