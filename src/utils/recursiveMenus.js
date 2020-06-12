import {Menu, Icon} from 'antd';
import Link from 'umi/link';
// import { Link } from "react-router-dom";

const {SubMenu} = Menu;


function checkUserType(ts, t) {
    let _user_type = '';
    let flag = 0;
    switch (t) {
        case "0":
            _user_type = 'admin';
            break;
        case "1":
            _user_type = 'user';
            break;
        default:
            _user_type = 'user';
    }
    for (let _t of ts) {
        if (_t === _user_type) {
            flag++;
        }
    }
    return flag > 0
}


function recursiveMenus(menus, userType) {
    return menus.map(
        value => {
            let {title, key, icon, url, menus, roles} = value;
            let k = `${key}`;
            let i = `${icon}`;
            let t = `${title}`;
            let u = `${url}`;
            if (roles && roles.length > 0) {
                if (checkUserType(roles, userType)) {
                    if (menus && (menus.length !== 0)) {
                        return (
                            <SubMenu
                                key={k}
                                title={
                                    <span>
                                  <Icon type={i}/>
                                  <span>{t}</span>
                            </span>
                                }
                            >
                                {recursiveMenus(menus, userType)}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={k}>
                                <Link to={u}>
                                    <Icon type={i}/>
                                    <span>{t}</span>
                                </Link>
                            </Menu.Item>
                        )
                    }
                }
            }
        }
    )
}


export default recursiveMenus;



