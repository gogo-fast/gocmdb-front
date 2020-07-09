import React, {Component} from 'react';
import {
    Menu,
    Dropdown,
    Icon,
} from 'antd';
import DeleteInstance from "./components/DeleteInstance";
import StopInstance from "./components/StopInstance";
import StartInstance from "./components/StartInstance";
import RebootInstance from "./components/RebootInstance";

const renderAction = (columns) => {
    columns.push({
            align: 'center',
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <Dropdown
                        size={"small"}
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <StartInstance record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <StopInstance record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <RebootInstance record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <DeleteInstance record={record}/>
                                </Menu.Item>
                            </Menu>
                        }
                        placement="bottomRight"
                    >
                        <a className="ant-dropdown-link">
                            <Icon type="menu"/> Mgr
                        </a>
                    </Dropdown>
                )
            }
        }
    );
};


export default renderAction;

