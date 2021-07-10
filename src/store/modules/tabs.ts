/* eslint-disable no-shadow */
// import { fetchUserPermission } from '@/api/app';

const state = {
  tabnavBox: [
    {
      title: '首页',
      path: '/dashboard',
    },
  ],
};
const getters = {
  tabnavBox: (state: any) => state.tabnavBox,
};
const mutations = {
  addTab(state: any, data: any) {
    for (let i = 0; i < state.tabnavBox.length; i += 1) {
      if (state.tabnavBox[i].path === data.path) {
        return false;
      }
    }
    state.tabnavBox.push({
      title: data.title,
      path: data.path,
    });
    return '';
  },
  removeTab(state: any, arg: any) {
    const index = state.tabnavBox.findIndex((value: any) => {
      return value.path === arg.tabItem.path;
    });
    state.tabnavBox.splice(index, 1);
    if (arg.tabItem.path === arg.fullPath) {
      const tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1];
      arg.router.push(tabActive.path);
    }
  },
};

const actions = {
  addTab({ commit }: any, data: any) {
    commit('addTab', data);
  },
  removeTab({ commit }: any, data: any) {
    commit('removeTab', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
