import Redirect from 'umi/redirect';
import React, {Component} from 'react';
import loadLocalStory from "../src/utils/loadLocalStory";


export default class extends Component {
    render() {
        let currentUser = loadLocalStory('user');
        if (!currentUser || !("userId" in currentUser)) {
            return <Redirect to="/login"></Redirect>
        }
        return this.props.children
    }
}
