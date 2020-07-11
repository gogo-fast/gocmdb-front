import React, {Component} from 'react';
import {connect} from 'dva';
import {
    Checkbox, Dropdown, Icon, Divider, Row, Col,
} from 'antd';
import {
    hostListColumnMap,
    defaultMainColumns,
    mainColumns
} from '../../../../../../config/hostListColumnMap'

import styles from './index.less'
import compareSort from "../../../../../utils/compareSort";
import {instanceListColumnMap} from "../../../../../../config/instanceListColumnMap";

const CheckboxGroup = Checkbox.Group;

@connect(
    ({host,}) => ({
        selectedColumns: host.selectedColumns,
    })
)
class HostListColumnSetting extends Component {
    onChange = e => {
        let v = e.target.value;
        let checked = e.target.checked;
        let newSelectedColumns = [];
        // if unchecked, remove from selected columns other wise add to selected columns.
        if (!checked) {
            this.props.selectedColumns.forEach(
                value => {
                    if (value !== v) {
                        newSelectedColumns.push(value)
                    }
                }
            );
        } else {
            // should resort according to mainColumns order.
            newSelectedColumns = compareSort(mainColumns, [v, ...this.props.selectedColumns])
        }
        this.props.dispatch({
            type: "host/updateSelectedColumns",
            payload: {
                selectedColumns: newSelectedColumns
            },
        })
    };

    onCheckAllChange = e => {
        this.props.dispatch({
            type: "host/updateSelectedColumns",
            payload: {
                selectedColumns: e.target.checked ? mainColumns : ['uuid'],
            },
        })
    };

    render() {
        let plainOptions = [];
        mainColumns.forEach(
            (value, index) => {
                if (value in hostListColumnMap) {
                    plainOptions.push(
                        <Checkbox
                            onChange={e => this.onChange(e)}
                            key={index}
                            value={value}
                            disabled={value === 'uuid'}
                            checked={this.props.selectedColumns.indexOf(value) !== -1}
                        >
                            {hostListColumnMap[value]}
                        </Checkbox>
                    )
                }
            }
        );

        return (
            <Dropdown
                overlay={
                    <div className={styles.columnFalls}>
                        <Row>
                            <Checkbox
                                onChange={e => this.onCheckAllChange(e)}
                                checked={mainColumns.length === this.props.selectedColumns.length}
                            >
                                Check all
                            </Checkbox>
                        </Row>

                        <Divider className={styles.divider} dashed={true}/>
                        <Row>
                            {
                                plainOptions.map(
                                    (value, index) => {
                                        return (
                                            <Col key={index} span={8}>
                                                {value}
                                            </Col>
                                        )
                                    }
                                )
                            }
                        </Row>
                    </div>
                }
                trigger={['hover']}
            >
                <span>
                    <Icon type="setting"/>
                    &nbsp;&nbsp;Select columns&nbsp;&nbsp;
                    <Icon type="caret-left"/>
                </span>

            </Dropdown>
        )
    }
}


export default HostListColumnSetting;







