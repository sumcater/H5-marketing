//待办事项
const backlog = r => require.ensure([], () => r(require('@/page/backlog/index.vue')), 'chunkname1');
const backlogList = r => require.ensure([], () => r(require('@/page/backlog/backlogList.vue')), 'chunkname1');

export default
    {
        path: '/backlog',
        name: "backlog",
        component: backlog,
        redirect: { name: "backlogList" },
        children: [
            {
                path: 'backlogList',
                name: "backlogList",
                component: backlogList,
                meta: { title: "待办事项", keepAlive: true }
            }
        ]
    }
