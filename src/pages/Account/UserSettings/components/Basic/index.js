import React, {Component, useEffect} from 'react';
import {
    Modal,
    DatePicker,
    Form,
    Input,
    Radio,
    Button,
} from 'antd';
import {connect} from 'dva';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import {parseDayTime} from "../../../../../utils/parseTime";
import loadLocalStory from "../../../../../utils/loadLocalStory";


const {confirm} = Modal;
const {TextArea} = Input;


const BasicSettingsForm = Form.create({name: 'basic_settings_form'})(
    class extends Component {
        state = {
            currentUser:  loadLocalStory('user')
        };

        render() {
            const {form} = this.props;
            const {getFieldDecorator} = form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 16},
                    sm: {span: 16},
                },
                wrapperCol: {
                    xs: {span: 16},
                    sm: {span: 16},
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {span: 24, offset: 0,},
                    sm: {span: 4, offset: 0,},
                },
            };

            let {
                userName,
                tel,
                email,
                addr,
                birthDay,
                remark,
            } = this.state.currentUser;
            return (
                <div className={styles['form-wrapper-div']}>
                    <Form  {...formItemLayout} labelAlign={'left'} layout="horizontal" onSubmit={this.handleSubmit}>

                        <Form.Item label="User Name" extra={'username can not be changed!'}>
                            {getFieldDecorator('userName', {})(<Input disabled={true} placeholder={userName}/>)}
                        </Form.Item>

                        <Form.Item label="Tel/Phone">
                            {getFieldDecorator('tel', {
                                initialValue: tel,
                                rules: [{required: true, message: 'please input tel/phone of this user'}],
                            })(<Input/>)}
                        </Form.Item>

                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                initialValue: email,
                                rules: [
                                    {type: 'email', message: 'are you sure the email you input is in right format?'},
                                    {required: true, message: 'you should give us a email of this user'},
                                ],
                            })(<Input placeholder={'email'}/>)}
                        </Form.Item>

                        <Form.Item label="Birth Day">
                            {getFieldDecorator('birthDay', {
                                initialValue: parseDayTime(birthDay),
                                rules: [
                                    {type: 'object', required: true, message: 'please select birthday for this user'},
                                ],
                            })(<DatePicker format="YYYY-MM-DD"/>,)
                            }
                        </Form.Item>

                        <Form.Item label="Address">
                            {getFieldDecorator('addr', {
                                initialValue: addr,
                                rules: [
                                    {required: true, message: 'please input address of this user'},
                                ],
                            })(<TextArea placeholder={'your address'} rows="1"/>)}
                        </Form.Item>

                        <Form.Item label="Remark">
                            {getFieldDecorator('remark', {
                                initialValue: remark,
                                rules: [
                                    {required: true, message: 'please add some remark for this user'},
                                ],
                            })(<TextArea remark={"something to describe yourself"} rows="2"/>)}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.props.handleSubmit}>
                                To Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    }
);


@connect()
@withRouter
class BasicSettings extends Component {

    handleCommit = (values) => {
        // const {form} = this.formRef.props;
        this.props.dispatch({
            type: "login/updateDetails",
            payload: Object.assign({}, loadLocalStory('user'), values),
        });

        // do not reset form after action
        // form.resetFields();
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
                        title: 'Are You Sure Commit The Change?',
                        content: 'please double check before you commit.',
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
                <BasicSettingsForm
                    wrappedComponentRef={this.saveFormRef}
                    handleSubmit={this.handleSubmit}
                />
            </div>

        )
    }
}


export default BasicSettings;



