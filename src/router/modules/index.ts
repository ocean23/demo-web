import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const files = require.context('.', false, /\.ts$/);

let routes: RouteRecordRaw[] = [];

files.keys().forEach((filename: string) => {
  if (filename === './index.ts') return;

  routes = routes.concat(files(filename).default);
});

export const configRoutes = routes;

export const RootRoute = {
  path: '/',
  name: 'Root',
  component: Layout,
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
  children: [],
};

export const basicRotues = [RootRoute];
