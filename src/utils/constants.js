// url of nginx proxy, use api prefix,
// and been write off while request from nginx to api server
const apiUrl = 'http://go.cmdb.com:8888/api/v1';
const apiWsUrl = 'ws://go.cmdb.com:8888/api/v1';
const imgUrl = 'http://go.cmdb.com:8888/api';

// used for dev server
// const apiUrl = 'http://go.cmdb.com:8000/v1';
// const apiWsUrl = 'ws://go.cmdb.com:8000/v1';
// const imgUrl = 'http://go.cmdb.com:8000';

const pageSizeOptions = ["5", "10", "20", "50"];

export {
    apiUrl,
    apiWsUrl,
    imgUrl,
    pageSizeOptions,
}

