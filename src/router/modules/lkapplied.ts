const router = {
  path: '/applied',
  name: 'applied',
  component: () => import('@/views/job/applied.vue'),
  meta: {
    title: '应聘的岗位',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: false,
  },
};

export default router;
