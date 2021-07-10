import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  title: string;
  permissionKey: string;
  hide: boolean;
  showChildren?: boolean;
  icon?: string;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta;
  component?: any;
  components?: any;
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
}

export interface AppRouteModule {
  layout?: AppRouteRecordRaw;
  routes?: AppRouteRecordRaw[];
  children?: AppRouteRecordRaw[];
  component?: any;
}
