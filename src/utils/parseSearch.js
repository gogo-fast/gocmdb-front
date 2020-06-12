function parseSearch(searchStr) {
    let params = {};
    let paramStrs = searchStr.trim().substring(1).split('&');
    paramStrs.forEach(
        value => {
            let _tmp = value.split('=');
            params[_tmp[0]] = _tmp[1]
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

