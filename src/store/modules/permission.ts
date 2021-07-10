/* eslint-disable no-shadow */
import { asyncRoutes } from '@/router/index';
import { RouteMeta } from 'vue-router';

export interface PermissionState {
  routes: any[];
  addRoutes: any[];
}

function hasPermission(permissions: string[], route: RouteMeta) {
  const routeMeta: any = route.meta;
  if (routeMeta && routeMeta.permissionKey) {
    return permissions.includes(routeMeta.permissionKey);
  }
  return false;
}

export function filterAsyncRoutes(routes: any = [], permissions: string[]) {
  const result: any = [];
  routes.forEach((route: RouteMeta) => {
    const temp = { ...route };
    if (hasPermission(permissions, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, permissions);
      }
      result.push(temp);
    }
  });
  return result;
}

// state
const state = {
  routes: [],
  addRoutes: [],
};

// getters
const getters = {
  permissionRoutes: (state: any) => state.routes,
};

// mutations
const mutations = {
  setRoutes(state: any, routes: any) {
    state.addRoutes = routes;
    state.routes = routes;
  },
};

// actions
const actions = {
  generateRoutes({ commit }: { commit: any }, permissions: string[]) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions);
      commit('setRoutes', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
