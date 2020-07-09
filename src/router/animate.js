

const animate = r => require.ensure([], () => r(require('@/page/animate/index3.vue')), 'chunkname5');

export default
    {
        path: '/animate',
        name: "animate",
        component: animate,
       

    }