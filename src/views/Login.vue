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
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
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

interface FormState {
  account: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();

    const loginForm = reactive({
      account: 'admin',
      password: 'admin',
    });

    const loginFormRef = ref();
    // store.commit("app/hasLogin",true)

    function resetForm() {}

    function submitForm() {
      // console.log("loginForm",loginForm);
      store.commit('app/setLoginFlag', true);
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