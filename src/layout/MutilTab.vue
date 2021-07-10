<template>
  <div>
    <!-- <el-tabs type="card" v-model="tabsValue" editable @tab-click="handleTabs">
      <el-tab-pane
        v-for="tab in tabnavBox"
        :key="tab.query ? tab.fullPath : tab.path"
        :label="tab.title"
        :name="tab.path"
      ></el-tab-pane>
    </el-tabs> -->
    <div class="tabnavBox">
      <transition-group name="list" tag="ul">
        <li
          v-for="(item, index) in tabnavBox"
          class="tabnav"
          :class="{ active: tabsValue === item.path }"
          :key="item.path"
        >
          <router-link :to="item.path"> {{ item.title }}</router-link>
          <i class="el-icon-error" v-if="index !== 0" @click="removeTab(item)"></i>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';

  export default defineComponent({
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const tabsValue = ref(null);
      const tabnavBox = computed(() => store.getters['tabs/tabnavBox']);
      watch(
        () => router.currentRoute.value,
        (val: any) => {
          tabsValue.value = val.path;
        },
        { immediate: true }
      );
      const removeTab = (item: any) => {
        console.log(item);
        store.dispatch('tabs/removeTab', { tabItem: item, fullPath: route.fullPath, router });
      };
      return {
        tabnavBox,
        tabsValue,
        removeTab,
      };
    },
  });
</script>
<style lang="less" scoped>
  .tabnavBox {
    width: 100%;
    height: 42px;
    min-height: 42px;
    overflow: hidden;
    border-top: 1px solid #f6f6f6;
    border-bottom: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    ul {
      display: flex;
      justify-content: flex-start;
      padding-left: 20px;
      flex-wrap: nowrap;
      overflow-x: auto;
      li {
        height: 30px;
        line-height: 26px;
        cursor: pointer;
        margin-top: 6px;
        margin-right: 5px;

        border: 1px solid #cccccc;

        overflow: hidden;
        &:not(:first-child) {
          padding-right: 10px;
          min-width: 80px;
        }
        a {
          padding: 0 13px;
          display: inline-block;
          height: 100%;
          font-size: 12px;
          color: #999999;
        }
        &:nth-child(n + 2) {
          a {
            padding-right: 15px;
          }
        }
        i {
          cursor: pointer;
          position: relative;
          top: 2px;
        }
      }
      li.active {
        background: #409eff;
        color: #ffffff;
        a {
          color: #ffffff;
        }
      }
    }
  }
  .tabnav {
    display: inline-block;
    transition: all 0.5s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-enter-active {
    transition: all 0.5s;
  }

  .list-leave-active {
    position: absolute;
    transition: all 1s;
  }
</style>
