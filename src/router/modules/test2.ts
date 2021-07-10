import ViewContainer from '@/layout/ViewContainer.vue';

const router = {
  path: '/test2',
  name: 'test2',
  component: () => import('@/layout/ViewContainer.vue'),
  meta: {
    title: '示例2',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: true,
  },
  children: [
    {
      path: '/test2/demo1',
      name: 'test21',
      component: () => import('@/views/test/test2.vue'),
      meta: {
        title: '示例2-1',
        hide: false,
        permissionKey: 'menu-test',
        showChildren: false,
      },
    },
    {
      path: '/test2/demo2',
      name: 'test22',
      component: () => import('@/views/test/index.vue'),
      meta: {
        title: '示例2-2',
        hide: false,
        permissionKey: 'menu-test',
        showChildren: false,
      },
    },
  ],
};

export default router;
