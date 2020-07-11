function compareSort(s1, s2) {
    let l = s1.length;
    let t = [];
    for (let i = 0; i < l; i++) {
        for (let v of s2) {
            if (s1[i] === v) {
                t.push(v);
                break
            }
        }
    }
    return t
}

export default compareSort;
