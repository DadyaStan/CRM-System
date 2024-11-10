import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: 'https://easydev.club/api/v1',
});

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) throw new Error('Refresh token не найден');

    const response = await axios.post('https://easydev.club/api/v1/auth/refresh', {
        refreshToken,
    });

    const { accessToken, expiresIn } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresIn', new Date(Date.now() + expiresIn * 1000).toString());

    return accessToken;
}

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        const expiresIn = localStorage.getItem('expiresIn');


        if (token && expiresIn) {
            const expirationTime = new Date(expiresIn).getTime();
            const currentTime = Date.now();
            const timeLeft = Math.max(0, expirationTime - currentTime);

            console.log('Время до истечения access токена: ', timeLeft / 1000, ' секунд');

            // Проверка истечения токена
            if (currentTime >= expirationTime) {
                try {
                    const newToken = await refreshAccessToken();
                    config.headers.Authorization = `Bearer ${newToken}`;
                } catch (error) {
                    console.error('Не удалось обновить токен:', error);
                    // Обработка случая, когда обновить токен невозможно (например, редирект на страницу входа)
                    return Promise.reject(error);
                }
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Проверка, является ли ошибка 401 СДЕЛАТЬ ПРОВЕРКУ НА ТО НЕ ПРОСРОЧИЛСЯ ЛИ ТОКЕН А НЕ 401
//         if (error.response && error.response.status === 401) {
//             const refreshExpiresIn = localStorage.getItem('refreshExpiresIn');

//             // Проверяем, истек ли refresh token
//             if (refreshExpiresIn) {
//                 const refreshExpirationTime = new Date(refreshExpiresIn).getTime();
//                 const currentTime = Date.now();

//                 if (currentTime >= refreshExpirationTime) {
//                     const authStore = useAuthStore();
//                     authStore.logout();
//                     return Promise.reject(new Error('Оба токена истекли. Пользователь вышел из системы.'));
//                 }
//             }

//             try {
//                 const newToken = await refreshAccessToken();
//                 originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                 return api(originalRequest); // Повторяем оригинальный запрос
//             } catch (refreshError) {
//                 console.error('Ошибка обновления токена:', refreshError);

//                 const authStore = useAuthStore();
//                 authStore.logout(); // Если обновление не удалось, тоже выполняем выход

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );