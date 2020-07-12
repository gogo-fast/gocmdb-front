import React, {Component} from 'react';
import Reset from "../Reset";
import {PageHeader, Button} from 'antd';
import iconStyles from "../../../../../commons/iconfonts/icon.css";


class UserRegisterPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title={
                        <span>
                            {/*外部 iconfont 最好设置字体大小，否则会影响布局(columns 选择器下拉的时候回有提提跳动)*/}
                            <i style={{color: '#780650', fontSize: 32}} className={iconStyles['iconfont']}>&#xe6eb;</i>
                            &nbsp;&nbsp;User register page
                        </span>
                    }
                    extra={[
                        <Reset key={"0"} resetFun={this.props.resetFun}/>,
                    ]}
                >
                </PageHeader>
            </div>
        );
    }
}


export default UserRegisterPageHeader;
