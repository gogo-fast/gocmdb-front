import {Component} from 'react';
import {Input, Button, Icon,} from 'antd';
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
        this.props.dispatch(
            {
                type: "user/loadUsers",
                payload: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                }
            }
        )
    };

    actionSearchByName = (userName) => {
        let u = userName.trim();
        this.props.dispatch(
            {
                type: "user/searchUser",
                payload: {
                    userName: u,
                }
            }
        )
    };

    reloadUsers = () => {
        this.actionReload(this.props.pageNum, this.props.pageSize)
    };

    doSearchByName = (userName) => {
        let u = userName.trim();
        if (u !== '') {
            this.actionSearchByName(u)
        }
    };

    render() {
        return (
            <div className={styles['table-top']}>
                <h1 className={styles['table-title']}>User List Page</h1>
                <span className={styles['table-toolbar']}>
                    <span className={styles['toolbar-item']}>
                        {this.props.loading
                            ?
                            <Button
                                className={styles.refresh}
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
                    </span>
                    <span className={styles['toolbar-item']}>
                        <Search
                            placeholder="search by username ..."
                            onPressEnter={e => {
                                this.doSearchByName(e.currentTarget.value)
                            }}
                            onSearch={value => {
                                this.doSearchByName(value)

                            }}
                            style={{width: 200}}
                        />
                    </span>
                </span>
            </div>
        )
    }
}

export default TableTitle;
