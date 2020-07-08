import React, {Component, useEffect} from 'react'
import {Descriptions, Spin, Button, Icon, Form, Modal, Radio, Input, DatePicker} from 'antd';
import {connect} from 'dva'
import {
    formatDayTime,
    formatTimeStamp,
    parseDayTime,
    parseTimeStamp,
} from '../../../../../utils/parseTime'
import styles from './index.less'
import iconStyles from '../../../../../commons/iconfonts/icon.css'
import loadLocalStory from "../../../../../utils/loadLocalStory";

const {TextArea} = Input;

const UserDetailsForm = Form.create({name: 'user_details_form_modal'})(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const {visible, onCancel, onCommit, form} = this.props;
            const {getFieldDecorator} = form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 6},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };

            return (
                <Modal
                    width={600}
                    visible={visible}
                    title="Update user details"
                    okText="Commit"
                    cancelText="Cancel"
                    onCancel={onCancel}
                    onOk={onCommit}
                >

                    <Form
                        {...formItemLayout}
                        layout="horizontal"
                    >
                        <Form.Item label="User ID" style={{display: 'none'}}>
                            {getFieldDecorator('userId', {
                                initialValue: this.props.selfDetails.userId,
                            })(<Input disabled={true}/>)}
                        </Form.Item>

                        <Form.Item label="User Name">
                            {getFieldDecorator('userName', {
                                initialValue: this.props.selfDetails.userName,
                            })(<Input disabled={true}/>)}
                        </Form.Item>

                        <Form.Item label="Gender">
                            {getFieldDecorator('gender', {
                                initialValue: this.props.selfDetails.gender,
                                rules: [{required: true, message: 'please choose gender for this user'}],
                            })(
                                <Radio.Group>
                                    <Radio value="0">
                                        <i style={{color: '#722ed1'}} className={iconStyles['iconfont']}>&#xe629;</i>
                                        &nbsp;Girl
                                    </Radio>
                                    <Radio value="1">
                                        <i style={{color: '#006d75'}} className={iconStyles['iconfont']}>&#xe621;</i>
                                        &nbsp;Boy
                                    </Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>

                        <Form.Item label="tel/phone">
                            {getFieldDecorator('tel', {
                                initialValue: this.props.selfDetails.tel,
                                rules: [{required: true, message: 'please input tel or phone num'}],
                            })(<Input/>)}
                        </Form.Item>

                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                initialValue: this.props.selfDetails.email,
                                rules: [
                                    {type: 'email', message: 'are you sure this email is in right format?'},
                                    {required: true, message: 'please input email of this user'}
                                ],
                            })(<Input/>)}
                        </Form.Item>

                        <Form.Item label="Birth Day">
                            {getFieldDecorator('birthDay', {
                                initialValue: parseDayTime(this.props.selfDetails.birthDay),
                                rules: [
                                    {type: 'object', required: true, message: 'please select birthday of this user'}
                                ],
                            })(<DatePicker format="YYYY-MM-DD"/>,)}
                        </Form.Item>

                        <Form.Item label="Address">
                            {getFieldDecorator('addr', {
                                initialValue: this.props.selfDetails.addr,
                                rules: [{required: true, message: 'please input the address of this user'}],
                            })(<TextArea rows="1"/>)}
                        </Form.Item>

                        <Form.Item label="备注">
                            {getFieldDecorator('remark', {
                                initialValue: this.props.selfDetails.remark,
                                rules: [{required: true, message: 'please add remark for this user'}],
                            })(<TextArea rows="2"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

@connect(
    ({login}) => ({
        currentUser: login.currentUser,
    })
)
class UpdateUserDetailsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        // reset form after action
        const {form} = this.formRef.props;
        form.resetFields();
        // disappear the modal
        this.setState({visible: false});
    };

    handleCommit = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // let {userId} = this.props.selfDetails;
            // console.log(values.userId)
            // this.props.selfDetails.userId <==> values.userId
            this.props.dispatch({
                type: "user/updateDetails",
                payload: {
                    userId: values.userId,
                    details: Object.assign({}, this.props.selfDetails, values),
                    // if updated user is login user,
                    // details of login user in memory and localStory should be update also.
                    // so currentUserId need here for models.user.updateDetails to call login/reloadCurrentUser
                    currentUserId: this.props.currentUser.userId,
                },
            });

            // reset form after action
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div className={styles['description-title']}>
                <div>User Details</div>
                <div>
                    <Button className={styles['edit-btn']} size='small' onClick={this.showModal}>
                        <Icon type="edit"/>
                        Edit
                    </Button>
                    <span>
                        <UserDetailsForm
                            selfDetails={this.props.selfDetails}
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCommit={this.handleCommit}
                        />
                    </span>
                </div>
            </div>
        );
    }
}


const UserDetails = (props) => {

    useEffect(
        () => {
            props.dispatch({
                type: "user/getUserDetails",
                // this is initialization data of user from user table
                // (only contain: userId, userName, userType, userStatus)
                payload: {
                    userId: props.record.userId,
                }
            })
        },
        []
    );

    let {userId} = props.record;
    if (props.userDetails[userId]) {
        return (
            <Descriptions
                title={<UpdateUserDetailsPage selfDetails={props.userDetails[userId]}/>}
            >
                <Descriptions.Item label="User ID">{userId}</Descriptions.Item>
                <Descriptions.Item label="User Name">{props.userDetails[userId].userName}</Descriptions.Item>
                <Descriptions.Item label="Gender">
                    {(props.userDetails[userId].gender === '0')
                        ? <i style={{color: '#722ed1'}} className={iconStyles['iconfont']}>&#xe629;</i>
                        : <i style={{color: '#006d75'}} className={iconStyles['iconfont']}>&#xe621;</i>
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Birth Day">
                    {formatDayTime(props.userDetails[userId].birthDay)}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{props.userDetails[userId].email}</Descriptions.Item>
                <Descriptions.Item label="Tel/Phone">{props.userDetails[userId].tel}</Descriptions.Item>
                <Descriptions.Item label="Address">{props.userDetails[userId].addr}</Descriptions.Item>
                <Descriptions.Item label="Remark">{props.userDetails[userId].remark}</Descriptions.Item>
                <Descriptions.Item label="Create Timestamp">
                    {
                        props.userDetails[userId].createdTime
                            ? formatTimeStamp(props.userDetails[userId].createdTime)
                            : null
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Update Timestamp">
                    {
                        props.userDetails[userId].updatedTime
                            ? formatTimeStamp(props.userDetails[userId].updatedTime)
                            : null
                    }
                </Descriptions.Item>
            </Descriptions>
        );
    } else {
        return <Spin/>
    }

};

export default connect(
    ({user, loading, login}) => ({
        userDetails: user.userDetails,
        loading: loading.models.user,
    })
)(UserDetails);

