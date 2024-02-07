import axios from "axios";
import {
    host,
    // paramsImg
} from "./index";
import useAuthStore from '@/store/auth';
import router from '@/router/';

// Авторизация по email и password
async function login(email, password) {
    try {
        const response = await axios.post(
            host + "/api/cp/sign-in/email-password",
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            },
        );
        
        // Полученная data имеет поля user и token
        const { data: { data: { token } } } = response;  // token
        const { data: { data: { user } } } = response;  // user
        // Фиксация авторизации в сторе Auth и запись пользователя в localStorage
        const store = useAuthStore();
        store.fillUserStore(user);  // также записывает пользователя в localStorage
        localStorage.setItem('isAuth', true);
        store.isAuth = true;
        // Установка токена доступа в localStorage
        store.setAccessToken(token);
        // Переходим на страницу с проектами
        router.push({ name: 'clocks' });
    } catch (err) {
        throw new Error("api/auth:login", err);
    }
}

// Отправить код на почту по email
async function sendCodeOnEmail(email) {
    try {
        const response = await axios.post(
            host + "/api/cp/verification-codes/email/",
            {
                email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            },
        );
        const { data: { data: { code } } } = response;  // code для подтверждения E-mail
        return code;
    } catch (err) {
        throw new Error("api/auth:sendCodeOnEmail", err);
    }
}

// Вход для пользователей по email и пароль
async function loginEmailPassword(email, password) {
    try {
        const response = await axios.post(
            host + "/api/sign-in/email-password/",
            {
                email,
                password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            },
        );
        // Полученная data имеет поля user и token
        const { data: { data: { token } } } = response;  // token
        const { data: { data: { user } } } = response;  // user
        console.log(token, user);
    } catch (err) {
        throw new Error("api/auth:sendCodeOnEmail", err);
    }
}


export {
    login,
    sendCodeOnEmail,
    loginEmailPassword,
};
