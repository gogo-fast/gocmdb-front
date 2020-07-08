function genMenuKeys(path) {
    let pathList = path.split('/').slice(1);
    let s = '';
    let ss = [];

    pathList.forEach(
        value => {
            s = s.concat('/', value);
            ss.push(s)
        }
    );

    // 翻转是为了和 Menu 的 onClick({keyPath}) 中的 keyPath 一致。
    // reversed ss is same as keyPath of Menu
    return ss.reverse()
}

function getMenuKeyMapFromPathName(path, defaultPath) {
    let keyMap = {};
    let keys = genMenuKeys(path);
    if (keys.length < 2){
        keyMap['openKeys'] = [defaultPath];
        keyMap['selectedKeys'] = [defaultPath]
    } else {
        keyMap['openKeys'] = keys.slice(1, keys.length);
        keyMap['selectedKeys'] = keys.slice(0,1)
    }
    return keyMap
}

function getMenuKeyMapFromKeyPath(keyPath) {
    let keyMap = {};
    if (keyPath.length < 2){
        keyMap['openKeys'] = keyPath;
        keyMap['selectedKeys'] = keyPath
    } else {
        keyMap['openKeys'] = keyPath.slice(keyPath.length - 1);
        keyMap['selectedKeys'] = keyPath.slice(0, keyPath.length - 1)
    }
    return keyMap
}


export {
    getMenuKeyMapFromPathName,
    getMenuKeyMapFromKeyPath
};
