<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '../../store/authStore';
//import { UserRegistration, AuthData, RefreshToken, Profile, ProfileRequest, PasswordRequest, Token } from "../../types/auth";

const authStore = useAuthStore();

const formState = reactive<any>({
    user: {
        username: '',
        login: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
    }
});

const isRegisterSuccess = ref<boolean>(false);

const usernameError = ref('');
const loginError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const emailError = ref('');
const phoneError = ref('');

const validateUsername = () => {
    usernameError.value = '';
    const usernamePattern = /^[a-zA-Zа-яА-ЯёЁ0-9]{1,60}$/;

    if (!formState.user.username) {
        usernameError.value = 'Имя пользователя является обязательным';
    } else if (!usernamePattern.test(formState.user.username)) {
        usernameError.value = 'Имя пользователя должно содержать от 1 до 60 символов (русские и латинские буквы)';
    }
};

const validateLogin = () => {
    loginError.value = '';
    const loginPattern = /^[a-zA-Z]{2,60}$/;

    if (!formState.user.login) {
        loginError.value = 'Логин является обязательным';
    } else if (!loginPattern.test(formState.user.login)) {
        loginError.value = 'Логин должен содержать от 2 до 60 латинских символов';
    }
};

const validatePassword = () => {
    passwordError.value = '';

    if (!formState.user.password) {
        passwordError.value = 'Пароль является обязательным';
    } else if (formState.user.password.length < 6 || formState.user.password.length > 60) {
        passwordError.value = 'Пароль должен содержать от 6 до 60 символов';
    }
};

const validateConfirmPassword = () => {
    confirmPasswordError.value = '';

    if (!formState.user.confirmPassword) {
        confirmPasswordError.value = 'Повторите пароль является обязательным';
    } else if (formState.user.confirmPassword !== formState.user.password) {
        confirmPasswordError.value = 'Пароль и его подтверждение не совпадают';
    }
};

const validateEmail = () => {
    emailError.value = '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.user.email) {
        emailError.value = 'Почтовый адрес является обязательным';
    } else if (!emailPattern.test(formState.user.email)) {
        emailError.value = 'Введите корректный почтовый адрес';
    }
};

const validatePhone = () => {
    phoneError.value = '';
    const phonePattern = /^\+?[0-9\s\-()]{7,15}$/;

    if (formState.user.phone && !phonePattern.test(formState.user.phone)) {
        phoneError.value = 'Введите корректный номер телефона';
    }
};

const handleSubmit = async () => {
    validateUsername();
    validateLogin();
    validatePassword();
    validateConfirmPassword();
    validateEmail();
    validatePhone();

    if (!usernameError.value && !loginError.value && !passwordError.value && !confirmPasswordError.value && !emailError.value && !phoneError.value) {
        const result: any = await authStore.signup(formState.user);

        if (result.status === 400) {
            alert('Ошибка десериализации запроса или неверный ввод.');
        } else if (result.status === 409) {
            alert('Пользователь уже существует.');
        } else if (result.status === 500) {
            alert('Внутренняя ошибка сервера.');
        } else if (result.status === 201) {
            isRegisterSuccess.value = true;
        }
    }
};
</script>

<template>
    <div class="auth-page">
        <div v-if="isRegisterSuccess" class="auth-page__success-box">
            <h3>Регистрация прошла успешно!</h3>
            <router-link to="/todo-list/auth/login">
                Вернутся на страницу входа
            </router-link>
        </div>
        <a-form v-else @submit.prevent="handleSubmit" layout="vertical">
            <!-- Имя пользователя -->
            <a-form-item label="Имя пользователя" :help="usernameError"
                :validateStatus="usernameError ? 'error' : 'success'">
                <a-input v-model:value="formState.user.username" @blur="validateUsername"
                    placeholder="Введите имя пользователя" />
            </a-form-item>

            <!-- Логин -->
            <a-form-item label="Логин" :help="loginError" :validateStatus="loginError ? 'error' : 'success'">
                <a-input v-model:value="formState.user.login" @blur="validateLogin" placeholder="Введите логин" />
            </a-form-item>

            <!-- Пароль -->
            <a-form-item label="Пароль" :help="passwordError" :validateStatus="passwordError ? 'error' : 'success'">
                <a-input-password v-model:value="formState.user.password" @blur="validatePassword"
                    placeholder="Введите пароль" />
            </a-form-item>

            <!-- Повторите пароль -->
            <a-form-item label="Повторите пароль" :help="confirmPasswordError"
                :validateStatus="confirmPasswordError ? 'error' : 'success'">
                <a-input-password v-model:value="formState.user.confirmPassword" @blur="validateConfirmPassword"
                    placeholder="Повторите пароль" />
            </a-form-item>

            <!-- Почтовый адрес -->
            <a-form-item label="Почтовый адрес" :help="emailError" :validateStatus="emailError ? 'error' : 'success'">
                <a-input v-model:value="formState.user.email" @blur="validateEmail"
                    placeholder="Введите почтовый адрес" />
            </a-form-item>

            <!-- Телефон -->
            <a-form-item label="Телефон" :help="phoneError" :validateStatus="phoneError ? 'error' : 'success'">
                <a-input v-model:value="formState.user.phone" @blur="validatePhone" placeholder="Введите телефон" />
            </a-form-item>

            <!-- Кнопка регистрации -->
            <a-form-item>
                <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
            </a-form-item>

            <!-- Кнопка возврата к логину -->
            <router-link to="/todo-list/auth/login">
                <a-form-item>
                    <a-button type="primary"><- Back to Log in</a-button>
                </a-form-item>
            </router-link>
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

    // &__background {
    //     width: 1110px;
    //     height: 100vh;
    //     background-image: url('../assets/image.png');
    //     background-size: contain;
    //     background-repeat: no-repeat;
    // }
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