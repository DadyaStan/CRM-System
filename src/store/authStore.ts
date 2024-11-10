import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';
import { UserRegistration, AuthData, Profile, Token } from "../types/auth";
import { api } from '../api/api';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    const userError = ref<string>('');
    const isLoading = ref<boolean>(false);

    const signup = async (registrationData: UserRegistration) => {
        try {
            isLoading.value = true;
            const response = await api.post<Profile>('/auth/signup', registrationData);

            console.log(response)
            if (response.status === 201) {
                return response;
            }
        } catch (error: any) {
            if (error.status === 400) {
                alert('400 Bad Request: Ошибка десериализации запроса или неверный ввод.')
            } else if (error.status === 409) {
                alert('409 Conflict: Пользователь уже существует.')
            } else if (error.status === 500) {
                alert('500 Internal Server Error: Внутренняя ошибка сервера.')
            }

            throw new Error;
        } finally {
            isLoading.value = false;
        }
    }
    const signin = async (loginData: AuthData): Promise<void> => {
        try {
            isLoading.value = true;
            const response = await api.post<Token>('/auth/signin', loginData);

            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                const expiresIn: any = decodeToken(response.data.accessToken)
                localStorage.setItem('expiresIn', new Date(Date.now() + expiresIn * 1000).toString());
                
                await router.push('/todo-list/app/todo');
            }
        } catch (error: any) {
            if (error.status === 400) {
                alert('Bad Request: Ошибка десериализации запроса или неверный ввод.')
            } else if (error.status === 401) {
                alert('401 Unauthorized: Неверные учетные данные.')
            } else if (error.status === 500) {
                alert('500 Internal Server Error: Внутренняя ошибка сервера.')
            }

            throw new Error;
        } finally {
            isLoading.value = false;
        }
    }
    const logout = async (): Promise<void> => {
        try {
            await api.post<void>('/user/logout');

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');

            router.push('/todo-list/auth/login');

            console.log('Logout');
        } catch (error) {
            console.error('Ошибка при логауте: ' + error);
            throw new Error;
        }
    }
    const fetchProfile = async (): Promise<Profile> => {
        try {
            const response = await api.get<Profile>('/user/profile');
            
            return response.data;
        } catch (error) {
            console.error(`Ошибка при загрузке профиля: ${error}`);

            throw new Error;
        }
    }

    const decodeToken = (accessToken: string) => {
        try {
            const decoded = jwtDecode(accessToken);

            return decoded.exp;
        } catch (error) {
            console.error('Ошибка при декодировании токена: ' + error);

            throw error;
        }
    }

    return { signup, signin, fetchProfile, logout, userError, isLoading }
});