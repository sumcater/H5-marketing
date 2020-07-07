
//活动管理
const posterMG = r => require.ensure([], () => r(require('@/page/posterMG/index.vue')), 'chunkname5');
const posterList = r => require.ensure([], () => r(require('@/page/posterMG/posterList.vue')), 'chunkname5');
const posterAdd = r => require.ensure([], () => r(require('@/page/posterMG/posterAdd.vue')), 'chunkname5');
const myPoster = r => require.ensure([], () => r(require('@/page/posterMG/myPoster.vue')), 'chunkname5');


export default
    {
        path: '/posterMG',
        name: "posterMG",
        component: posterMG,
        redirect: { name: "posterList" },
        children: [
            {
                path: 'posterList',
                name: "posterList",
                component: posterList,
                meta: { title: "海报管理", keepAlive: true }
            },
            {
                path: 'posterAdd',
                name: "posterAdd",
                component: posterAdd,
                meta: { title: "参与沙龙", keepAlive: true }
            },
            {
                path: 'myPoster',
                name: "myPoster",
                component: myPoster,
                meta: { title: "我的专属海报", keepAlive: true }
            },
        ]

    }
