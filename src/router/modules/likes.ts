const router = {
  path: '/likes',
  name: 'likes',
  component: () => import('@/views/job/likes.vue'),
  meta: {
    title: '收藏的岗位',
    icon: 'el-icon-menu',
    hide: false,
    permissionKey: 'menu-test',
    showChildren: false,
  },
};

export default router;
