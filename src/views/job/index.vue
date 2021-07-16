<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
      <el-card class="job-card">
        <img :src="image" class="job-image" />
        <div style="padding: 14px">
          <span>22元/小时</span>
          <div class="bottom">
            <time class="time">月结-观澜京东</time>
            <el-button
              class="button like"
              v-if="!likeFlag"
              circle
              icon="el-icon-star-off"
              @click="like"
            ></el-button>
            <el-button
              class="button like"
              v-if="likeFlag"
              type="warning"
              circle
              icon="el-icon-star-on"
              @click="unlike"
            ></el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import image from '@/assets/image/job.jpg';
import { defineComponent, computed, ref, reactive, UnwrapRef } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const likeFlag = ref<boolean>(false);
    function like() {
      likeFlag.value = true;
    }
    function unlike() {
      likeFlag.value = false;
    }
    return {
      image,
      likeFlag,
      like,
      unlike,
    };
  },
});
</script>

<style scoped>
.like {
  float: right;
}
.job-image {
  /* max-width: 500px; */
  height: 100%;
  width: 100%;
}
.job-card {
  /* width: 200px; */
  height: 300px;
}
</style>