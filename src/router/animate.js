


const animate = r => require.ensure([], () => r(require('@/page/animate/index.vue')), 'chunkname5');
const animate1 = r => require.ensure([], () => r(require('@/page/animate/index1.vue')), 'chunkname5');
const animate2 = r => require.ensure([], () => r(require('@/page/animate/index2.vue')), 'chunkname5');
const animate3 = r => require.ensure([], () => r(require('@/page/animate/index3.vue')), 'chunkname5');
const animate4 = r => require.ensure([], () => r(require('@/page/animate/index4/index.vue')), 'chunkname5');

export default
    {
        path: '/animate',
        name: "animate",
        component: animate,
        redirect: { name: "animate1" },
        children: [
            {
                path: 'animate1',
                name: "animate1",
                component: animate1,
                meta: { title: "动画1", keepAlive: true }
            },
            {
                path: 'animate2',
                name: "animate2",
                component: animate2,
                meta: { title: "动画2", keepAlive: true }
            },
            {
                path: 'animate3',
                name: "animate3",
                component: animate3,
                meta: { title: "动画3", keepAlive: true }
            },
            {
                path: 'animate4',
                name: "animate4",
                component: animate4,
                meta: { title: "动画4", keepAlive: true }
            },


        ]
    }
