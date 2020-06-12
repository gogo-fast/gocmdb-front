import {connect} from 'dva'
import React, {Component} from 'react';
import withRouter from 'umi/withRouter'
import {
    Divider,
    Button,
    Icon,
    Modal,
    Form,
    Radio,
} from 'antd';
import {parseSearch} from "../../../utils/parseSearch";


const UserStatusForm = Form.create({name: 'user_status_form_modal'})(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const {visible, onCancel, onCommit, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Update User Status"
                    okText="Commit"
                    cancelText="Cancel"
                    onCancel={onCancel}
                    onOk={onCommit}
                >
                    <Form layout="vertical">
                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('userStatus', {
                                initialValue: this.props.record.userStatus,
                            })(
                                <Radio.Group>
                                    <Radio value="0">Enable</Radio>
                                    <Radio value="1">Disable</Radio>
                                    <Radio value="2">Delete</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


const UserTypeForm = Form.create({name: 'user_type_form_modal'})(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const {visible, onCancel, onCommit, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Update User Role"
                    okText="Commit"
                    cancelText="Cancel"
                    onCancel={onCancel}
                    onOk={onCommit}
                >
                    <Form layout="vertical">
                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('userType', {
                                initialValue: this.props.record.userType,
                            })(
                                <Radio.Group>
                                    <Radio value="0">Admin</Radio>
                                    <Radio value="1">User</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


@connect()
class UpdateUserTypePage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCommit = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let {userId} = this.props.record;
            this.props.dispatch({
                type: "user/updateType",
                payload: {
                    userId: userId,
                    userType: values.userType,
                }
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
            <span>
                <Button style={{background: '#ffd666'}} size='small' onClick={this.showModal}>
                    <Icon type="form"/>
                    User Role
                </Button>
                <UserTypeForm
                    record={this.props.record}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCommit={this.handleCommit}
                />
            </span>
        );
    }
}


@connect()
@withRouter
class UpdateUserStatusPage extends Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCommit = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let {page, size} = parseSearch(this.props.location.search);
            if (!page || !size) {
                [page, size] = [1, 5]
            }

            let {userId} = this.props.record;
            this.props.dispatch({
                type: "user/updateStatus",
                payload: {
                    pageNum: page,
                    pageSize: size,
                    userId: userId,
                    userStatus: values.userStatus,
                    // userStatus: parseInt(values.userStatus),
                }
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
            <span>
                <Button style={{background: '#a0d911'}} size='small' onClick={this.showModal}>
                    <Icon type="form"/>
                    User Status
                </Button>
                <UserStatusForm
                    record={this.props.record}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCommit={this.handleCommit}
                />
            </span>
        );
    }
}

const renderAction = (columns) => {
    columns.push({
            align: 'center',
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <span>
                        <UpdateUserTypePage record={record}/>
                        <Divider type="vertical"/>
                        <UpdateUserStatusPage record={record}/>
                    </span>
                )
            }
        }
    );
};


export default renderAction;

