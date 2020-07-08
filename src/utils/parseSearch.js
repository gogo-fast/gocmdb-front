function parseSearch(searchStr) {
    let params = {};
    let paramStrs = searchStr.trim().substring(1).split('&');
    paramStrs.forEach(
        value => {
            let _tmp = value.trim().split('=');
            params[_tmp[0].trim()] = (_tmp.length >1) ?  _tmp[1].trim() : ''
        }
    );
    return params
}

const numRe = /^\d+/;

function validPageNum(page) {
    let ret = numRe.exec(page);
    if (ret)
        return parseInt(ret[0]);
    return 1
}


function validPageSize(size, pageSizeOptions) {
    let pageSize = parseInt(pageSizeOptions[0]);
    pageSizeOptions.forEach(
        value => {
            if (value === size) {
                pageSize = parseInt(size);
            }
        }
    );
    return pageSize
}


export {
    parseSearch,
    validPageSize,
    validPageNum
};

