
//团队管理
const teamMG = r => require.ensure([], () => r(require('@/page/teamMG/index.vue')), 'chunkname5');
const teamList = r => require.ensure([], () => r(require('@/page/teamMG/teamList.vue')), 'chunkname5');

export default
    {
        path: '/teamMG',
        name: "teamMG",
        component: teamMG,
        redirect: { name: "teamList" },
        children: [
            {
                path: 'teamList',
                name: "teamList",
                component: teamList,
                meta: { title: "团队管理", keepAlive: true }
            },
        ]

    }