<script lang="ts" setup>
import { reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/store/authStore";

interface FormState {
  login: string;
  password: string;
}

const authStore = useAuthStore();

const formState = reactive<FormState>({
  login: "",
  password: "",
});

const onFinish = async (values: any) => {
  await authStore.signin(values);
  await authStore.fetchProfile();
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.login && formState.password);
});
</script>

<template>
  <div class="container">
    <div class="auth-page">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Login"
          name="login"
          :rules="[{ required: true, message: 'Please input your Login!' }]"
        >
          <a-input v-model:value="formState.login">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <RouterLink to="/CRM-System/auth/sign-up">Register now!</RouterLink>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
