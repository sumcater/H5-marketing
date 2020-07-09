

const animate = r => require.ensure([], () => r(require('@/page/animate/index.vue')), 'chunkname5');

export default
    {
        path: '/animate',
        name: "animate",
        component: animate,
       

    }