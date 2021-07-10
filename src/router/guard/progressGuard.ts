import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    NProgress.start();
    return true;
  });
  router.afterEach(async () => {
    NProgress.done();
    return true;
  });
}
