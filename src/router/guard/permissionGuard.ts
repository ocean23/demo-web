import type { Router, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';
import store from '@/store/index';
import { RootRoute } from '../modules/index';

export default function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // const token = getToken();
    const token = 'demo'; // TODO 此处获取token
    if (token) {
      const hasLogin = store.getters['app/hasLogin'];
      if (hasLogin) {
        next();
      } else {
        try {
          const permissions = await store.dispatch('app/getPermissions');
          const accessRoutes = await store.dispatch('permission/generateRoutes', permissions);
          // router.addRoute(accessRoutes);
          accessRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(RootRoute.name, route);
          });
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch('app/resetPermissions');
          ElMessage.error(error || 'Has Error');
          // TODO redirect to portal
        }
      }
    } else {
      ElMessage.error('登录过期，请重新登录');
      // TODO redirect to portal;
    }
  });
}
