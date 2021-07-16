const router = {
  path: '/job',
  name: 'job',
  component: () => import('@/views/job/index.vue'),
  meta: {
    title: '岗位',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: false,
  },
};

export default router;
