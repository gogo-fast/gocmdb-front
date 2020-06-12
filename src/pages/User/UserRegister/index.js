import React, {Component, useEffect} from 'react';
import {
    Modal,
    DatePicker,
    Form,
    Input,
    Radio,
    Button,
    PageHeader,
    Divider,
} from 'antd';
import {connect} from 'dva';
import styles from './index.less';
import iconStyles from './icon.css';
import withRouter from 'umi/withRouter';


const {confirm} = Modal;
const {TextArea} = Input;


const UserRegisterForm = Form.create({name: 'user_register_form'})(
    class extends Component {
        state = {
            confirmDirty: false,
        };

        // 失去焦点的回调
        handleConfirmBlur = e => {
            const {value} = e.target;
            this.setState({confirmDirty: this.state.confirmDirty || !!value});
            console.log(this.state)
        };

        compareToFirstPassword = (rule, value, callback) => {
            const {form} = this.props;
            if (value && value !== form.getFieldValue('password')) {
                callback('Two passwords that you enter is inconsistent!');
            } else {
                callback();
            }
        };

        validateToNextPassword = (rule, value, callback) => {
            const {form} = this.props;
            if (value && this.state.confirmDirty) {
                form.validateFields(['passwordConfirm'], {force: true});
            }
            callback();
        };


        render() {
            const {form} = this.props;
            const {getFieldDecorator} = form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                    md: {span: 7},
                    lg: {span: 7},
                    xl: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 12},
                    md: {span: 12},
                    lg: {span: 11},
                    xl: {span: 9},
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {span: 24, offset: 0,},
                    sm: {span: 16, offset: 8,},
                    md: {span: 16, offset: 7,},
                    lg: {span: 16, offset: 7,},
                    xl: {span: 16, offset: 8,},
                },
            };

            return (
                <Form  {...formItemLayout} layout="horizontal" onSubmit={this.handleSubmit}>
                    <Form.Item label="User Role">
                        {getFieldDecorator('userType', {
                            initialValue: "1",
                            rules: [{required: true, message: 'please select a role for this user'}],
                        })(
                            <Radio.Group>
                                <Radio value="0">
                                    <span style={{width: "80px", display: 'inline-block'}}>
                                        <i className={iconStyles['iconfont']}>&#xe637;</i>
                                        &nbsp;Admin
                                    </span>
                                </Radio>
                                <Radio value="1">
                                    <span style={{width: "80px", display: 'inline-block'}}>
                                        <i className={iconStyles['iconfont']}>&#xe63c;</i>
                                        &nbsp;User
                                    </span>
                                </Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item label="Gender">
                        {getFieldDecorator('gender', {
                            initialValue: "1",
                            rules: [{required: true, message: 'please select gender for this user'}],
                        })(
                            <Radio.Group>
                                <Radio value="0">
                                    <span style={{width: "80px", display: 'inline-block'}}>
                                        <i style={{color: '#722ed1'}} className={iconStyles['iconfont']}>&#xe629;</i>
                                        &nbsp;Girl
                                    </span>
                                </Radio>
                                <Radio value="1">
                                    <span style={{width: "80px", display: 'inline-block'}}>
                                        <i style={{color: '#006d75'}} className={iconStyles['iconfont']}>&#xe621;</i>
                                        &nbsp;Boy
                                    </span>
                                </Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item label="User Name">
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'please input username'}],
                        })(<Input placeholder={"username"}/>)}
                    </Form.Item>

                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: 'please input password',},
                                {validator: this.validateToNextPassword,},
                            ],
                        })(<Input.Password placeholder={"password"}/>)}
                    </Form.Item>

                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('passwordConfirm', {
                            rules: [
                                {required: true, message: 'please input password again',},
                                {validator: this.compareToFirstPassword,},
                            ],
                        })(<Input.Password placeholder={"password above"} onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>

                    <Form.Item label="Tel/Phone">
                        {getFieldDecorator('tel', {
                            rules: [{required: true, message: 'please input tel/phone of this user'}],
                        })(<Input placeholder={"12366669999"}/>)}
                    </Form.Item>

                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [
                                {type: 'email', message: 'are you sure the email you input is in right format?'},
                                {required: true, message: 'you should give us a email of this user'},
                            ],
                        })(<Input placeholder={"abc@123.com"}/>)}
                    </Form.Item>

                    <Form.Item label="Birth Day">
                        {getFieldDecorator('birthDay', {
                            rules: [
                                {type: 'object', required: true, message: 'please select birthday for this user'},
                            ],
                        })(<DatePicker format="YYYY-MM-DD"/>,)}
                    </Form.Item>

                    <Form.Item label="Address">
                        {getFieldDecorator('addr', {
                            rules: [
                                {required: true, message: 'please input address of this user'},
                            ],
                        })(<TextArea placeholder={'a mysterious country, a mysterious city, a mysterious place, a mysterious house'} rows="1"/>)}
                    </Form.Item>

                    <Form.Item label="Remark">
                        {getFieldDecorator('remark', {
                            rules: [
                                {required: true, message: 'please add some remark for this user'},
                            ],
                        })(<TextArea placeholder={'Oh register a user account is so tedious ......'} rows="2"/>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.props.handleSubmit}>
                            Create User
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);


@connect()
@withRouter
class UserRegisterPage extends Component {

    handleCommit = (values) => {
        const {form} = this.formRef.props;
        this.props.dispatch({
            type: "user/registerUser",
            payload: values,
        });

        // reset form after action
        form.resetFields();
    };

    handleCancel = () => {
        // reset form after cancel
        const {form} = this.formRef.props;
        form.resetFields();
    };

    handleSubmit = e => {
        e.preventDefault();
        const {form} = this.formRef.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // we should rename this, because this in confirm always point to inner
                // other wise wo can not use this inner confirm
                const _this = this;
                confirm(
                    {
                        title: 'Are You Sure Add The User?',
                        content: 'We should add user prudently, avoid making to much garbage.',
                        okText: 'Yes',
                        okType: 'primary',
                        cancelText: 'No',
                        onOk() {
                            _this.handleCommit(values)
                        },
                        onCancel() {
                            _this.handleCancel();
                        },
                    }
                );
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <PageHeader
                    className={styles['page-head']}
                    title="User Register Page"
                />
                <Divider className={styles['page-divider']}/>
                <UserRegisterForm
                    wrappedComponentRef={this.saveFormRef}
                    handleSubmit={this.handleSubmit}
                />
            </div>

        )
    }
}


export default UserRegisterPage;



