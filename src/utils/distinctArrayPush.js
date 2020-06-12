function distinctArrayPush(dest, src) {
    let stack = [];
    let [l, s] = [0, 0];
    let [ls, ss] = [[], []];
    if (dest.length > src) {
        [l, s] = [dest.length, src.length];
        [ls, ss] = [dest, src];
    } else {
        [l, s] = [src.length, dest.length];
        [ls, ss] = [src, dest];
    }

    for (let i = 0; i < l; i++) {
        let flag = false;
        for (let j = 0; j < s; j++) {
            if (i < s) {
                if (ss[j] === ls[i]) {
                    flag = true
                }
            }
        }
        if (!flag) {
            stack.push(ls[i])
        }
    }

    return [...stack, ...ss]
}


export default distinctArrayPush;
