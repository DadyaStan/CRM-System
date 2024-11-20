<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import { signup } from "@/api/authApi";
import type { UserRegistration } from "@/types/auth";

interface FormState {
  username: string;
  login: string;
  pass: string;
  checkPass: string;
  email: string;
  phone: string;
}

const formRef = ref<FormInstance | any>();
const formState = reactive<FormState>({
  username: "",
  login: "",
  pass: "",
  checkPass: "",
  email: "",
  phone: "",
});
const isRegisterSuccess = ref<boolean>(false);

const handleSubmitProfile = async (values: FormState) => {
  console.log(values, formState);
  console.log("handle");
  const newObj: UserRegistration = {
    login: formState.login,
    username: formState.username,
    password: formState.pass,
    email: formState.email,
    phoneNumber: formState.phone,
  };

  try {
    await signup(newObj);
    isRegisterSuccess.value = true;
  } catch (error) {
    if (error instanceof Error && error.message === "409") {
      alert("Такой логин или почта уже существует");
    } else {
      alert(`Ошибка при создании профиля: ${error}`);
    }
  }
};

const validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Введите пароль");
  } else if (value.length < 6) {
    return Promise.reject("Пароль должен иметь больше 6 символов");
  } else {
    if (formState.checkPass !== "") {
      formRef?.value.validateFields("checkPass");
    }
    return Promise.resolve();
  }
};

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Введите снова пароль");
  } else if (value.length < 6) {
    return Promise.reject("Пароль должен иметь больше 6 символов");
  } else if (value !== formState.pass) {
    return Promise.reject("Пароль не совпадает");
  } else {
    return Promise.resolve("");
  }
};

const layout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 18 },
};

const handleFinishFailed = (errors: any) => {
  console.log(errors);
};
</script>

<template>
  <div class="auth-page">
    <div v-if="isRegisterSuccess" class="auth-page__success-box">
      <h3>Регистрация прошла успешно!</h3>
      <router-link to="/CRM-System/auth/login">
        Вернутся на страницу входа
      </router-link>
    </div>
    <a-form
      v-else
      ref="formRef"
      name="custom-validation"
      :model="formState"
      v-bind="layout"
      @finish="handleSubmitProfile"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item
        has-feedback
        label="Имя пользователя"
        name="username"
        :rules="[
          {
            required: true,
            min: 1,
            message: 'Введите имя пользователя',
            trigger: 'blur',
          },
          {
            max: 60,
            message: 'Введите меньше 60 символов',
            trigger: 'change',
          },
          {
            pattern: /^[a-zA-Zа-яА-ЯёЁ0-9]{1,60}$/,
            trigger: 'change',
            message: 'Символы русского/латинского алфавита!',
          },
        ]"
      >
        <a-input v-model:value="formState.username" autocomplete="off" />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Логин"
        name="login"
        :rules="[
          { required: true, message: 'Введите логин', trigger: 'blur' },
          { min: 2, message: 'Введите больше 1 символа', trigger: 'blur' },
          { max: 60, message: 'Введите меньше 60 символов', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]{2,60}$/,
            trigger: 'blur',
            message: 'Символы латинского алфавита!',
          },
        ]"
      >
        <a-input v-model:value="formState.login" autocomplete="off" />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Пароль"
        name="pass"
        :rules="[
          { required: true, min: 6, validator: validatePass, trigger: 'blur' },
        ]"
      >
        <a-input
          v-model:value="formState.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item
        has-feedback
        name="checkPass"
        label="Подтвердите"
        :rules="[
          {
            required: true,
            validator: validatePass2,
            trigger: 'change',
          },
        ]"
      >
        <a-input
          v-model:value="formState.checkPass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Почта"
        name="email"
        :rules="[
          {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            trigger: 'change',
            message: `Введите реальную почту`,
          },
        ]"
      >
        <a-input v-model:value="formState.email" autocomplete="off" />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Phone"
        name="phone"
        :rules="[
          {
            required: false,
            message: `Введите корректный номер телефона`,
            trigger: 'change',
            pattern: /^\+?[0-9\s\-()]{7,15}$/,
          },
        ]"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item class="auth-page__btn-box">
        <div>
          <div>
            <a-button type="primary" html-type="submit">
              Создать аккаунт
            </a-button>
          </div>

          <a-button style="margin: 20px auto">
            <router-link to="/CRM-System/auth/login">
              <p>Вернуться ко входу</p>
            </router-link>
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__success-box {
    display: flex;
    flex-direction: column;
  }

  &__btn-box {
    display: flex;
    align-items: center;
    margin-left: 150px;
  }
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
