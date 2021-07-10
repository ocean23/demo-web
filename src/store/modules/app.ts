/* eslint-disable no-shadow */
// import { fetchUserPermission } from '@/api/app';

const state = {
  hasLogin: false,
  permissions: [],
  sidebarState: true,
};

const getters = {
  hasLogin: (state: any) => state.hasLogin,
  permissions: (state: any) => state.permissions,
  sidebarState: (state: any) => state.sidebarState,
};

const mutations = {
  setHasLogin(state: any, data: boolean) {
    state.hasLogin = data;
  },
  setPermissions(state: any, permissions: string[]) {
    state.permissions = permissions;
  },
  setSidebarState(state: any, data: boolean) {
    state.sidebarState = data;
  },
};

const actions = {
  async getPermissions({ commit }: any) {
    // TODO 更换成真实的fetchuserpermission请求
    // const { data } = await fetchUserPermission();
    const data: string[] = ['menu-test'];
    commit('setPermissions', data);
    commit('setHasLogin', true);
    return data;
  },
  resetPermissions({ commit }: any) {
    commit('setPermissions', []);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
