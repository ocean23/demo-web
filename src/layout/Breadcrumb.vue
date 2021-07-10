<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in matchedRoutes" :key="item.path">
        <el-dropdown v-if="item.children.length" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ item.meta.title }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="child in item.children"
                :key="child.name"
                :command="child.path"
              >
                {{ child.meta.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <template v-else>
          {{ item.meta.title }}
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
  import type { AppRouteRecordRaw } from '@/router/types.d';
  import { defineComponent, unref, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'Breadcrumb',
    setup() {
      const router = useRouter();
      const { currentRoute } = useRouter();
      const matchedRoutes: any = ref<AppRouteRecordRaw[]>([]);
      function getBreadcrumb() {
        const { matched } = unref(currentRoute);
        const matchedList = matched.filter((item) => item.meta && item.meta.title).splice(1);
        matchedRoutes.value = matchedList.filter((item) => item.meta && item.meta.title);
        console.log('[ matchedRoutes ]', matchedRoutes);
      }
      watch(
        () => currentRoute.value,
        () => {
          getBreadcrumb();
        },
        { immediate: true }
      );
      const handleCommand = (command: string) => {
        router.push(command);
      };
      return {
        matchedRoutes,
        handleCommand,
      };
    },
  });
</script>
<style lang="less" scoped>
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.24s;
  }

  .breadcrumb-enter-from,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(16px);
  }

  .breadcrumb-move {
    transition: all 0.38s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
