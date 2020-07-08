import React, {Component, useEffect} from 'react';
import {
    Modal,
    Form,
    Input,
    Button,
} from 'antd';
import {connect} from 'dva';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import loadLocalStory from "../../../../../utils/loadLocalStory";


const {confirm} = Modal;

const SecuritySettingsForm = Form.create({name: 'security_settings_form'})(
    class extends Component {
        state = {
            confirmDirty: false,
        };

        // 失去焦点的回调
        handleConfirmBlur = e => {
            const {value} = e.target;
            this.setState({confirmDirty: this.state.confirmDirty || !!value});
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
                    sm: {span: 16},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {span: 24, offset: 0,},
                    sm: {span: 16, offset: 0,},
                },
            };

            return (
                <div className={styles['form-wrapper-div']}>
                    <Form  {...formItemLayout} labelAlign={'left'} layout="horizontal" onSubmit={this.handleSubmit}>
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

                        <Form.Item {...tailFormItemLayout}>
                            <div className={styles['pwd-btn-group']}>
                                <div className={styles['pwd-btn']}>
                                    <Button type="primary" onClick={this.props.handleSubmit}>
                                        Commit
                                    </Button>
                                </div>
                                <div className={styles['pwd-btn']}>
                                    <Button type="default" onClick={this.props.handleCancel}>
                                        Cancel
                                    </Button>
                                </div>

                            </div>

                        </Form.Item>
                    </Form>
                </div>

            );
        }
    }
);


@connect(
    ({login}) => ({
        currentUser: login.currentUser,
    })
)
@withRouter
class SecuritySettings extends Component {

    handleCommit = (values) => {
        const {form} = this.formRef.props;
        this.props.dispatch({
            type: "login/setPassword",
            payload: {
                // userId: currentUser.userId,
                userId: this.props.currentUser.userId,
                // currentUserId: currentUser.userId,
                currentUserId: this.props.currentUser.userId,
                password: values.password,
            },
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
                        title: 'Are You Sure Change The Password?',
                        content: 'remember the new password.',
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
                <SecuritySettingsForm
                    wrappedComponentRef={this.saveFormRef}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </div>
        )
    }
}


export default SecuritySettings;



