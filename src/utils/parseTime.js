import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


// http://momentjs.cn/docs/#/parsing/
const dayTimeFromat = 'YYYY-MM-DDTHH:mm:ss';  // +HH:mm
const timeStampFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';  //+HH:mm

function formatDayTime(s) {
    let m = moment(s, dayTimeFromat);
    if (m.isValid()) {
        return m.format('YYYY/MM/DD')
    } else {
        return null
    }
}

function formatTimeStamp(s) {
    let m = moment(s, timeStampFormat);
    if (m.isValid()) {
        return m.format("YYYY/MM/DD HH:mm:ss.SSS")
    } else {
        return null
    }
}

function parseDayTime(s) {
    let m = moment(s, dayTimeFromat);
    if (m.isValid()) {
        return m
    } else {
        return null
    }
}

function parseTimeStamp(s) {
    let m = moment(s, timeStampFormat);
    if (m.isValid()) {
        return m
    } else {
        return null
    }
}

export {
    formatDayTime,
    formatTimeStamp,
    parseDayTime,
    parseTimeStamp,
}
