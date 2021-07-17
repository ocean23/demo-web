<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in jobs" :key="o" :offset="index > 0 ? 2 : 0">
      <el-card class="job-card">
        <img :src="image" class="job-image" />
        <div style="padding: 14px">
          <span>{{ o.workContent }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import image from '@/assets/image/job.jpg';
import { defineComponent, computed, ref, reactive, onMounted } from 'vue';
import { appliedApi } from '../../api/app';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'Login',
  setup() {
    const jobs = ref([]);

    function loadData() {
      appliedApi().then((res) => {
        jobs.value = res.data;
      });
    }

    onMounted(() => {
      loadData();
    });

    return {
      image,
      jobs,
    };
  },
});
</script>

<style scoped>
.like {
  float: right;
}
.job-image {
  height: 100%;
  width: 100%;
}
.job-card {
  height: 300px;
}
.bottom {
  padding-bottom: 25px;
}
</style>