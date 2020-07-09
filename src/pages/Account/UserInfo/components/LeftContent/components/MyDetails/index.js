import React from "react";
import {connect} from 'dva';
import {Icon} from 'antd'
import {formatDayTime, formatTimeStamp} from "../../../../../../../utils/parseTime";

import styles from './index.less'


const MyDetails = (props) => {

    let {
        userId, userName, userType, userStatus, gender, birthDay, tel, email, addr, remark, createdTime, updatedTime
    } = props.currentUser;
    return (
        <div>
            <p>
                <span className={styles.label}>User Role:</span>
                {(userType === '0')
                    ? <span>Admin &nbsp;<Icon type="setting"/></span>
                    : <span>user</span>
                }
            </p>
            <p>
                <span className={styles.label}>User Status:</span>
                {(userStatus === '0')
                    ? <span>Enable &nbsp;<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/></span>
                    : <span>Disabled &nbsp;<Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d"/></span>
                }
            </p>
            <p>
                <span className={styles.label}>Gender:</span>
                {(gender === '0')
                    ? <span>Girl &nbsp; <Icon type="woman"/></span>
                    : <span>Boy &nbsp;<Icon type="man"/> </span>
                }
            </p>
            <p>
                <span className={styles.label}>BirthDay:</span>
                {birthDay ? <span>{formatDayTime(birthDay)}</span> : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Tel:</span>
                {tel ? tel : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Email:</span>
                {email ? email : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Addr:</span>
                {addr ? addr : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Remark:</span>
                {remark ? remark : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Create Time:</span>
                {createdTime ? <span>{formatTimeStamp(createdTime)}</span> : <Icon type="question"/>}
            </p>
            <p>
                <span className={styles.label}>Update Time:</span>
                {updatedTime ? <span>{formatTimeStamp(updatedTime)}</span> : <Icon type="question"/>}
            </p>
        </div>
    )

};


export default connect(
    ({login}) => ({
        currentUser: login.currentUser,
    })
)(MyDetails);
