import {Row, Col, Icon, Tooltip} from 'antd';
import AliZhangJiaKouInstanceCount from "../aliyun/AliInstanceCount/Zhangjiakou";
import AliQingDaoInstanceCount from "../aliyun/AliInstanceCount/Qingdao";
import TencentInstanceCount from "../tencent/TencentInstanceCount/Beijing";
import HostCount from "../host/HostCount";
import UserCount from "../user/UserCount";


const InstanceCount = () => {
    const colFormat = {xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6};
    return (
        <Row gutter={[24, 24]}>
            <Col  {...colFormat}>
                <AliZhangJiaKouInstanceCount/>
            </Col>
            <Col  {...colFormat}>
                <AliQingDaoInstanceCount/>
            </Col>
            <Col  {...colFormat}>
                <TencentInstanceCount/>
            </Col>
            <Col {...colFormat}>
                <HostCount/>
            </Col>
            <Col  {...colFormat}>
                <UserCount/>
            </Col>
        </Row>
    )
};


export default InstanceCount;

