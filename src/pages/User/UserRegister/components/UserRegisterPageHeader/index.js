import React, {Component} from 'react';
import Reset from "../Reset";
import {PageHeader, Button} from 'antd';


class UserRegisterPageHeader extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    ghost={false}
                    title="User register page"
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
