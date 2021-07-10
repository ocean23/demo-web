import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import scrollWaiter from '@/utils/scrollWaiter';
import { configRoutes, basicRotues } from './modules/index';
import createGuard from './guard/index';

export const asyncRoutes = configRoutes;

const router = createRouter({
  history: createWebHistory(),
  routes: basicRotues,
  scrollBehavior: async (to, from, savedPostion) => {
    await scrollWaiter.wait();
    if (savedPostion) {
      return savedPostion;
    }
    if (to.matched.every((record, i) => from.matched[i] !== record)) {
      return { left: 0, top: 0 };
    }
    return false;
  },
});

export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

export default router;
