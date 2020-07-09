import {Component} from 'react';
import {Input, Button, Icon,} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

const {Search} = Input;

@connect(
    ({loading, login, user}) => ({
        loading: loading.models.user,
        pageNum: user.userListPageNum,
        pageSize: user.userListPageSize,
    })
)
@withRouter
class SearchUser extends Component {

    actionSearchByName = (userName) => {
        this.props.dispatch(
            {
                type: "user/searchUser",
                payload: {
                    userName: userName,
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
        )
    }
}

export default SearchUser;
