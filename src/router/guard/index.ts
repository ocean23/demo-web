import type { Router } from 'vue-router';
import createPermissionGuard from './permissionGuard';
import createProgressGuard from './progressGuard';

function setTitle(title: string, appTitle?: string) {
  const curTitle = title ? `${title}-${appTitle}` : `${appTitle}`;
  document.title = curTitle;
}

export default function createGuard(router: Router) {
  router.beforeEach(async (to, next) => {
    // TODO
  });

  router.afterEach((to: any) => {
    setTitle(to.meta.title);
  });
  createProgressGuard(router);
  createPermissionGuard(router);
}
