//登录
const index = r => require.ensure([], () => r(require('@/page/login/index.vue')), 'chunkname1');
const login = r => require.ensure([], () => r(require('@/page/login/login.vue')), 'chunkname1');

export default
    {
        path: '/login',
        name: "index",
        component: index,
        redirect: { name: "login" },
        children: [
            {
                path: 'login',
                name: "login",
                component: login,
                meta: { title: "登录", keepAlive: true }
            }
        ]
    }
