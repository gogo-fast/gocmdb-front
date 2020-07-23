import React from "react";
import {Typography} from 'antd';

const {Paragraph} = Typography;

const CopyedText = props => <Paragraph copyable>{props.text}</Paragraph>;

export default CopyedText;