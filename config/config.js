import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';


export default {
    // 插件配置
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true, // 在这里打开 dva
            },
            CaseSensitivePathsPlugin,
            {
                debub: true,
            }
        ],
    ],
    // 路由配置
    routes: [
        {
            path: '/login',
            component: '../layouts/Login'
        },
        {
            path: '/',
            component: '../layouts/BasicLayout',
            Routes: ['./routes/PrivateRoute.js'], // 路由守卫
            routes: [
                {
                    path: '/',
                    component: './Dashboard'
                },
                {
                    path: '/dashboard',
                    component: './Dashboard',
                },
                {
                    path: '/cloud/aliyun',
                    component: './AliCloud',
                    routes: [
                        {
                            path: '/cloud/aliyun/instance/list',
                            exact: true,
                            component: './AliCloud/InstanceList',
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    path: '/cloud/tencent',
                    component: './TencentCloud',
                    routes: [
                        {
                            path: '/cloud/tencent/instance/list',
                            exact: true,
                            component: './TencentCloud/InstanceList',
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    path: '/host',
                    component: './Host',
                    routes: [
                        {
                            path: '/host/list',
                            exact: true,
                            component: './Host/HostList',
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    path: '/user',
                    component: './User',
                    routes: [
                        {
                            path: '/user/list',
                            exact: true,
                            component: './User/UserList',
                        },
                        {
                            path: '/user/register',
                            exact: true,
                            component: './User/UserRegister',
                            Routes: ['./routes/AdminRoute.js'], // 路由守卫
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    path: '/account',
                    component: './Account',
                    routes: [
                        {
                            path: '/account/info',
                            exact: true,
                            component: './Account/UserInfo',
                        },
                        {
                            path: '/account/settings',
                            exact: true,
                            component: './Account/UserSettings',
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    // 默认路由不需要path字段
                    component: './Errors/NotFound',
                }
            ]
        },

    ],
}
