
//绩效管理
const performanceMG = r => require.ensure([], () => r(require('@/page/performanceMG/index.vue')), 'chunkname5');
const dataStatistics = r => require.ensure([], () => r(require('@/page/performanceMG/dataStatistics.vue')), 'chunkname5');


export default
    {
        path: '/performanceMG',
        name: "performanceMG",
        component: performanceMG,
        redirect: { name: "dataStatistics" },
        children: [
            {
                path: 'dataStatistics',
                name: "dataStatistics",
                component: dataStatistics,
                meta: { title: "数据统计", keepAlive: true }
            },
        ]

    }