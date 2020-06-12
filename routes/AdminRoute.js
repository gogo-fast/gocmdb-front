import Redirect from 'umi/redirect';
import withRouter from 'umi/withRouter';
import React, {Component} from 'react';
import {connect} from 'dva';
import loadLocalStory from "../src/utils/loadLocalStory";


export default class extends Component {
    render() {
        let currentUser = loadLocalStory('user');
        let {userId, userName, userStatus, userType} = currentUser;
        if (userId !== undefined && userType === "0") {
            return this.props.children
        }
        return <Redirect to="/login" ></Redirect>
    }
}

