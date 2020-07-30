


export default
    {
        path: '/vue',
        name: "vue",
        component: ()=>import('@/page/vue/index.vue'),
        redirect: { name: "vue1" },
        children: [
            {
                path: 'vue1',
                name: "vue1",
                component: ()=>import('@/page/vue/vue1.vue'),
                meta: { title: "vue1", keepAlive: true }
            },
            {
                path: 'vue2',
                name: "vue2",
                component: ()=>import('@/page/vue/vue2.vue'),
                meta: { title: "vue2", keepAlive: true }
            },
           


        ]
    }
