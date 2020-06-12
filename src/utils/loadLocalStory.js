function loadLocalStory(key) {
    if (key === 'token') {
        return localStorage.getItem(key);
    } else {
        let j = localStorage.getItem(key);
        if (j) {
            try {
                return JSON.parse(j)
            } catch (e) {
                return null
            }
        }
        return null
    }
}


export default loadLocalStory;
