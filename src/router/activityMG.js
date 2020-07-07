//活动管理
const activityMG = r => require.ensure([], () => r(require('@/page/activityMG/index.vue')), 'chunkname5');
const activityList = r => require.ensure([], () => r(require('@/page/activityMG/activityList.vue')), 'chunkname5');
const activityAddEdit = r => require.ensure([], () => r(require('@/page/activityMG/activityAddEdit.vue')), 'chunkname5');
const activityDetail = r => require.ensure([], () => r(require('@/page/activityMG/activityDetail.vue')), 'chunkname5');
const activityResult = r => require.ensure([], () => r(require('@/page/activityMG/activityResult.vue')), 'chunkname5');


export default
    {
        path: '/activityMG',
        name: "activityMG",
        component: activityMG,
        redirect: { name: "activityList" },
        children: [
            {
                path: 'activityList',
                name: "activityList",
                component: activityList,
                meta: { title: "活动列表", keepAlive: true }
            },
            {
                path: 'activityAddEdit',
                name: "activityAddEdit",
                component: activityAddEdit,
                meta: { title: "创建修改活动", keepAlive: true }
            },
            {
                path: 'activityDetail',
                name: "activityDetail",
                component: activityDetail,
                meta: { title: "活动详情", keepAlive: true }
            },
            {
                path: 'activityResult',
                name: "activityResult",
                component: activityResult,
                meta: { title: "创建活动", keepAlive: true }
            },
        ]

    }
