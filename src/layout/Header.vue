<template>
  <div class="info-container">
    <el-dropdown>
      <span class="user-avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        {{ '王小二' }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    function logout() {
      store.commit('app/setLoginFlag', false);
    }
    return { logout };
  },
});
</script>
<style lang="less" scoped>
.info-container {
  display: flex;
  justify-content: center;
  .user-avatar {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 8px;
    }
  }
}
</style>
