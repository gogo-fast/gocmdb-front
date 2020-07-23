import React, {Component} from 'react';
import {
    PageHeader,
} from 'antd';

import Refresh from "../Refresh";
import SearchInstance from "../SearchInstance";
import iconStyles from '../../../../../commons/iconfonts/icon.css';
import ToolsBar from "../ToolsBar";

import styles from './index.less'

const InstanceListPageHeader = () =>
    <div>
        <PageHeader
            ghost={false}
            title={
                <span>
                    {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                    <span className={styles['cloud-logo']}>
                        <i style={{color: '#1890ff', fontSize: 32}} className={iconStyles['iconfont']}>&#xe731;</i>
                    </span>
                    &nbsp;&nbsp;Instances list page
                </span>
            }
            extra={[
                <Refresh key="1"/>,
                <SearchInstance key="2"/>,
            ]}
        >
            <ToolsBar/>
        </PageHeader>
    </div>;


export default InstanceListPageHeader;


