import React, {Component} from 'react';
import {
    Menu,
    Dropdown,
    Icon,
} from 'antd';
import StopHost from "./components/StopHost";
import StartHost from "./components/StartHost";
import RebootHost from "./components/RebootHost";
import DeleteHost from "./components/DeleteHost";


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
                                    <StartHost record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <StopHost record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <RebootHost record={record}/>
                                </Menu.Item>
                                <Menu.Item>
                                    <DeleteHost record={record}/>
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

