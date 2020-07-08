const menuList = [
    {
        title: 'Home',
        key: '/home',
        icon: 'home',
        url: "/home",
        roles: ['admin', 'user']
    },
    {
        title: 'Dashboard',
        key: '/dashboard',
        icon: 'dashboard',
        roles: ['admin', 'user'],
        menus: [
            {
                title: 'Project-1',
                key: '/dashboard/pj1',
                icon: 'project',
                url: '/dashboard/pj1',
                roles: ['admin', 'user']
            },
            {
                title: 'Project-2',
                key: '/dashboard/pj2',
                icon: 'project',
                url: '/dashboard/pj2',
                roles: ['admin', 'user']
            },
        ]
    },
    {
        title: 'Cloud',
        key: '/cloud',
        icon: 'cloud',
        roles: ['admin', 'user'],
        menus: [
            {
                title: 'AliCloud',
                key: '/cloud/aliyun',
                icon: 'aliyun',
                roles: ['admin', 'user'],
                menus: [
                    {
                        title: 'Instances',
                        key: '/cloud/aliyun/instance/list',
                        icon: 'unordered-list',
                        url: '/cloud/aliyun/instance/list',
                        roles: ['admin', 'user']
                    },
                ]
            },
            {
                title: 'TencentCloud',
                key: '/cloud/tencent',
                icon: 'qq',
                roles: ['admin', 'user'],
                menus: [
                    {
                        title: 'Instances',
                        key: '/cloud/tencent/instance/list',
                        icon: 'unordered-list',
                        url: '/cloud/tencent/instance/list',
                        roles: ['admin', 'user']
                    },
                ]
            },
        ]
    },
    {
        title: 'Resource Manager',
        key: '/host',
        icon: 'appstore',
        roles: ['admin', 'user'],
        menus: [
            {
                title: 'Hosts',
                key: '/host/list',
                icon: 'unordered-list',
                url: '/host/list',
                roles: ['admin', 'user']
            },
        ]
    },
    {
        title: 'User',
        key: '/user',
        icon: 'team',
        roles: ['admin', 'user'],
        menus: [
            {
                title: 'User List',
                key: '/user/list',
                icon: 'unordered-list',
                url: '/user/list',
                roles: ['admin', 'user']
            },
            {
                title: 'User Register',
                key: '/user/register',
                icon: 'user-add',
                url: '/user/register',
                roles: ['admin']
            },
        ]
    },
    {
        title: 'Personal Center',
        key: '/account',
        icon: 'user',
        roles: ['admin', 'user'],
        menus: [
            {
                title: 'Information',
                key: '/account/info',
                icon: 'info-circle',
                url: '/account/info',
                roles: ['admin', 'user']
            },
            {
                title: 'Settings',
                key: '/account/settings',
                icon: 'setting',
                url: '/account/settings',
                roles: ['admin', 'user']
            },
        ]
    },
];


export default menuList
