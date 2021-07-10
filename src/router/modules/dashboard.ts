const router = {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '首页',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: false,
  },
};

export default router;
