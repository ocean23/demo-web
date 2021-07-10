<template>
  <div class="base-layout">
    <el-container>
      <el-aside width="auto"><Menu /></el-aside>
      <el-container>
        <el-header>
          <div class="action-container">
            <el-button
              circle
              :icon="sidebarState ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
              @click="changeSidebarState"
            ></el-button>
            <Breadcrumb />
          </div>
          <Header />
        </el-header>
        <MutilTab />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import Breadcrumb from './Breadcrumb.vue';
  import Header from './Header.vue';
  import Menu from './Menu';
  import MutilTab from './MutilTab.vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      Menu,
      Header,
      MutilTab,
      Breadcrumb,
    },
    setup() {
      const store = useStore();
      const sidebarState = computed(() => store.getters['app/sidebarState']);
      const changeSidebarState = () => store.commit('app/setSidebarState', !sidebarState.value);
      return {
        sidebarState,
        changeSidebarState,
      };
    },
  });
</script>
<style lang="less" scoped>
  .base-layout {
    display: flex;
    width: 100%;
    min-height: 100%;
    background: #f4f7f9;
    flex-direction: column;
    .el-aside {
    }
    .el-container {
      .el-header {
        display: flex;
        height: 48px;
        padding: 0 20px;
        margin-left: -1px;
        line-height: 48px;
        align-items: center;
        // color: #fff;
        justify-content: space-between;
        background: #fff;
        border-bottom: 1px solid #eee;
        border-left: 1px solid #eee;
        .action-container {
          display: flex;
          align-items: center;
          .el-button {
            margin-right: 12px;
          }
        }
      }
    }
  }
</style>
