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
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {};
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
