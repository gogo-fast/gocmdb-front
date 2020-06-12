import layout from "../models/layout";


const themeKeys = {"themeColor": null, "themeType": null, "defaultChecked": null};
const themeTypes = {"light": null, "dark": null};
const themeColors = {"#001529": null, "#fff": null, "#ffffff": null, "#FFF": null, "#FFFFFF": null};
const defaultCheckeds = {false: null, true: null};


function getDefaultTheme() {
    let currentThemeData = layout.state.theme;
    localStorage.setItem('theme', JSON.stringify(currentThemeData));
    return currentThemeData;
}


function checkThemeData(k, data) {
    switch (k) {
        case "themeType":
            return data[k] in themeTypes;
        case "themeColor":
            return data[k] in themeColors;
        case "defaultChecked":
            return data[k] in defaultCheckeds;
        default:
            return false
    }
}


function loadTheme() {
    let currentThemeData = {};
    try {
        currentThemeData = JSON.parse(localStorage.getItem('theme'));
        if (currentThemeData === null) {
            return getDefaultTheme()
        }
        for (let key in themeKeys) {
            if (!(key in currentThemeData)) {
                return getDefaultTheme()
            } else if (!checkThemeData(key, currentThemeData)) {
                return getDefaultTheme()
            }
        }
    } catch (e) {
        return getDefaultTheme()
    }

    return currentThemeData;
}


export default loadTheme;



