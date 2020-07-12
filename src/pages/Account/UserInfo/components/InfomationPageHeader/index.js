import React, {Component} from 'react';
import {PageHeader} from 'antd';
import iconStyles from "../../../../../commons/iconfonts/icon.css";

const AccountInformationPageHeader = () =>
    <div>
        <PageHeader
            ghost={false}
            title={
                <span>
                            {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                    <i style={{color: '#780650', fontSize: 32}} className={iconStyles['iconfont']}>&#xe706;</i>
                    &nbsp;&nbsp;Account information page
                        </span>
            }
            extra={[

            ]}
        >
        </PageHeader>
    </div>;


export default AccountInformationPageHeader;
