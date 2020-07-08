import {connect} from 'dva'
import React, {Component} from 'react';
import withRouter from 'umi/withRouter'
import {
    Divider,
    notification,
    message,
} from 'antd';
import {parseSearch} from "../../../utils/parseSearch";
import loadLocalStory from "../../../utils/loadLocalStory";
import DeleteInstance from "./components/DeleteInstance";
import StopInstance from "./components/StopInstance";
import StartInstance from "./components/StartInstance";


const renderAction = (columns) => {
    columns.push({
            align: 'center',
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <span>
                        <StartInstance record={record}/>
                        <Divider type="vertical"/>
                        <StopInstance record={record}/>
                        <Divider type="vertical"/>
                        <DeleteInstance record={record}/>
                    </span>
                )
            }
        }
    );
};


export default renderAction;

