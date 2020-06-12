import Account from "../index";
import React, {Component} from 'react'
import withRouter from 'umi/withRouter';
import {connect} from 'dva'
import LeftContent from "./LeftContent";

@connect()
@withRouter
class UserInfo extends Component {

    render() {
        return (
            <Account>
                <LeftContent/>
            </Account>
        )
    }
}


export default UserInfo;
