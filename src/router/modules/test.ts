const router = {
  path: '/test',
  name: 'test',
  component: () => import('@/views/test/index.vue'),
  meta: {
    title: '示例1',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: false,
  },
};

export default router;
