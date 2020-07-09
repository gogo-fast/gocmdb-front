import {Component} from 'react';
import {Input, Button, Icon,} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';


@connect(
    ({layout, loading, login, user}) => ({
        currentTheme: layout.theme,
        loading: loading.models.user,
        pageNum: user.userListPageNum,
        pageSize: user.userListPageSize,
    })
)
@withRouter
class Refresh extends Component {

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

    reloadUsers = () => {
        this.actionReload(this.props.pageNum, this.props.pageSize)
    };

    render() {
        return (
            <span>
                {this.props.loading
                    ?
                    <Button type={(this.props.currentTheme.themeType === 'dark') ? 'primary' : 'default'}>
                        <Icon type="loading"/> Reload
                    </Button>
                    :
                    <Button type={(this.props.currentTheme.themeType === 'dark') ? 'primary' : 'default'}
                            onClick={this.reloadUsers}>
                        <Icon type="redo"/> Reload
                    </Button>
                }
            </span>
        )
    }
}

export default Refresh;
