import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import logo from "../../../public/logo.svg";
import styles from './index.less';
import loadLocalStory from "../../utils/loadLocalStory";


@connect(
    ({loading}) => ({
        loading: loading.models.login,
    })
)
@withRouter
class CMDBLoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'login/userLogin',
                    payload: values
                });
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={styles['login-div']}>
                <img className={styles['logo-img']} alt="logo" src={logo}/>

                <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="username:[admin|user]"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="password:[admin|123456]"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button loading={this.props.loading} type="primary" htmlType="submit"
                                className={styles["login-form-button"]}>
                            登录
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create({name: 'cmdb_login'})(CMDBLoginForm);



@withRouter
class LoginPage extends Component{
    render() {
        let token = loadLocalStory('token');
        if (token) {
            this.props.history.goBack();
            return null
        } else {
            return (
                <LoginForm/>
            );
        }
    }
}

export default LoginPage;
