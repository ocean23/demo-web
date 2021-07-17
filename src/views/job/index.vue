<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in jobs" :key="o" :offset="index > 0 ? 2 : 0">
      <el-card class="job-card">
        <img :src="image" class="job-image" />
        <div style="padding: 14px">
          <span>{{ o.workContent }}</span>
          <div class="bottom">
            <!-- <time class="time">{{o.likeCount}}</time> -->
            <el-button
              class="button like"
              v-if="!o.like"
              circle
              icon="el-icon-star-off"
              @click="like(o)"
              >{{ o.likeCount }}</el-button
            >
            <el-button
              class="button like"
              v-if="o.like"
              type="warning"
              circle
              icon="el-icon-star-on"
              @click="unlike(o)"
              >{{ o.likeCount }}</el-button
            >
            <el-button class="button like" v-if="!o.published" @click="markPublish(o)"
              >上架</el-button
            >
            <el-button class="button like" v-if="o.published" @click="markPrivate(o)"
              >下架</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import image from '@/assets/image/job.jpg';
import { defineComponent, computed, ref, reactive, UnwrapRef, onMounted } from 'vue';
import {
  positionApi,
  likeApi,
  unLikeApi,
  positionPublishApi,
  positionPrivateApi,
} from '../../api/app';

export default defineComponent({
  name: 'Job',
  setup() {
    const jobs = ref([]);
    function like(row: any) {
      row.like = true;
      row.likeCount = row.likeCount + 1;
      likeApi(row.id).then((res) => {
        console.log('like success');
      });
    }
    function unlike(row: any) {
      row.like = false;
      row.likeCount = row.likeCount - 1;
      unLikeApi(row.id).then((res) => {
        console.log('unlike success');
      });
    }

    function markPublish(row: any) {
       positionPublishApi(row.id).then((res) => {
         row.published = true;
      });
    }
    function markPrivate(row: any) {
      positionPrivateApi(row.id).then((res) => {
         row.published = false;
      });
    }

    function loadData() {
      positionApi().then((res) => {
        console.log(res);
        jobs.value = res.data;
      });
    }

    onMounted(() => {
      loadData();
    });

    return {
      jobs,
      image,
      like,
      unlike,
      markPublish,
      markPrivate,
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
.bottom {
  padding-bottom: 25px;
}
</style>