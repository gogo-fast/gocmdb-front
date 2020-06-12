function checkArrayEqual(pre, next) {

    if (pre.length !== next.length){
        return false
    }
    for (let i in pre) {
        if (pre[i] !== next[i]) {
            return false
        }
    }
    return true
}

export default checkArrayEqual;
