import {Component} from 'react';
import {Input, Button, Icon} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';


import styles from './index.less'
import loadLocalStory from "../../../../../utils/loadLocalStory";


const {Search} = Input;


@connect(
    ({loading, login, user}) => ({
        loading: loading.models.user,
        pageNum: user.userListPageNum,
        pageSize: user.userListPageSize,
    })
)
@withRouter
class TableTitle extends Component {

    actionReload = (pageNum, pageSize) => {
        let currentUser = loadLocalStory('user');
        if (!currentUser || !("userId" in currentUser)) {
            return
        }
        this.props.dispatch(
            {
                type: "user/loadUsers",
                payload: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    userId: currentUser.userId,
                }
            }
        )
    };

    actionSearch = (userName) => {
        let currentUser = loadLocalStory('user');
        if (!("userId" in currentUser)) {
            return
        }
        this.props.dispatch(
            {
                type: "user/searchUser",
                payload: {
                    userName: userName,
                    reqUser: currentUser
                }
            }
        )
    };

    reloadUsers = () => {
        this.actionReload(this.props.pageNum, this.props.pageSize)
    };

    doSearch = (userName) => {
        if (userName !== '') {
            this.actionSearch(userName)
        }
    };

    render() {
        return (
            <div className={styles['table-top']}>
                <h1 className={styles['table-title']}>This Is User List Page</h1>
                <span>
                    {this.props.loading
                        ?
                        <Button
                            className={styles.refresh}
                            onClick={this.reloadUsers}
                        >
                            <Icon type="loading"/>
                        </Button>
                        :
                        <Button
                            className={styles.refresh}
                            onClick={this.reloadUsers}
                        >
                            <Icon type="redo"/>
                        </Button>
                    }

                    <Search
                        maxLength={48}
                        placeholder="do search by username ..."
                        onPressEnter={e => {
                            this.doSearch(e.currentTarget.value)
                        }}
                        onSearch={value => {
                            this.doSearch(value)
                        }}
                        style={{width: 200}}
                    />
                </span>
            </div>
        )
    }
}

export default TableTitle;
