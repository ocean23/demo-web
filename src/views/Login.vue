<template>
  <div class="loginForm">
    <el-form
      :model="loginForm"
      status-icon
      ref="loginFormRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, UnwrapRef } from 'vue';
import { useStore } from 'vuex';
import { loginApi } from '../api/app';

interface FormState {
  account: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();

    const loginForm = reactive({
      account: '13800000000',
      password: 'admin',
    });

    const loginFormRef = ref();

    function resetForm() {}

    function submitForm() {
      // console.log("loginForm",loginForm);
      // store.commit('app/setLoginFlag', true);
      loginApi(loginForm.account).then(res=>{
        store.commit('app/setLoginFlag', true);
        store.commit('app/setToken', res.data.token);
        console.log(res.data.token);
      });
    }

    return {
      resetForm,
      submitForm,
      loginForm,
      loginFormRef,
    };
  },
});
</script>

<style scoped>
.loginForm {
  margin: 18% auto;
}
</style>