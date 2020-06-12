export default {
    namespaces: "layout",
    state: {
        theme: {
            themeType: 'dark',
            themeColor: '#001529',
            defaultChecked: false,
        },
        siderCollapsed: false,
        siderDrawerVisible: false,
        menus: null,
        openKeys: [],
        selectedKeys: [],

    },
    effects: {
    },
    reducers: {
        siderTrigger(state, action) {
            return Object.assign({}, state, {siderCollapsed: action.payload.siderCollapsed})
        },
        switchTheme(state, action) {
            return Object.assign({}, state, {theme: action.payload.theme})
        },
        updateMenuKeys(state, action) {
            return Object.assign({}, state, action.payload)
        },
    }
}
