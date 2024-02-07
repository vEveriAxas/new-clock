import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
import { ref } from "vue";

const useAuthStore = defineStore("authStore", () => {

    // ============================================== STATE ==============================================
    let user = null;  // Получаем либо с LocalStorage либо null
    let isAuth = false;
    const key = 'b9c120d4-0d94-40ba-a955-cfef98eff5ab';
    let code = ref(null);  // код для подтверждения E-mail

    //============================================== ACTIONS ===============================================

    // Функция для шифрования объекта
    function encryptObject(object, key) {
        try {
            const jsonString = JSON.stringify(object);
            const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
            return encrypted;
        } catch (err) {
            throw new Error('store/auth:encryptObject', err);
        }
    }
    // Функция для расшифровки объекта
    function decryptObject(encrypted, key) {
        try {
            const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
            const object = JSON.parse(decrypted);
            return object;
        } catch (err) {
            throw new Error('store/auth:decryptObject', err);
        }
    }
    // Заполняем данные пользователя в store при его получении из сервера
    function fillUserStore(userData) {
        try {
            user = {
                id: userData.id,
                email: userData.email,
                tel: userData.tel,
                fullName: userData.full_name,
                created: userData.created,
                lastActivity: userData.last_activity,
                isSuperuser: userData.is_superuser,
            }
            // Хешируем объект пользователя по алгоритму AES 
            return localStorage.setItem("user", encryptObject(user, key));
        } catch (err) {
            throw new Error('store/auth:fillUserStore', err);
        }
    }

    // Получение токена доступа из localStorage
    function getAccessToken() {
        try {
            const accessToken = localStorage.getItem("access_token");
            if(accessToken && accessToken.length) {
                return accessToken;
            }
            return "";
        } catch (err) {
            throw new Error('store/auth:getAccessToken', err);
        }
    }

    // Удаление токена доступа из localStorage
    function deleteAccessToken() {
        try {
            localStorage.removeItem("access_token");
        } catch (err) {
            throw new Error('store/auth:deleteAccessToken', err);

        }
    }

    // Установка токена доступа в localStorage
    function setAccessToken(token) {
        try {
            localStorage.setItem("access_token", token);
        } catch (err) {
            throw new Error('store/auth:setAccessToken', err);
        }
    }

    // Проверка существования данных пользователя в localStorage
    function exitsUser() {
        try {
            const userLocalStorage = localStorage.getItem('user');  // user хранится в localStorage захешированным по AES
            if (typeof userLocalStorage === 'string' && !!userLocalStorage.length) {  // на данный момент user - захешированная строка AES
                user = decryptObject(userLocalStorage, 'salt');  // Записываем расшифрованный объект пользователя в store
                return true;
            } else return false;
        } catch (err) {
            throw new Error('store/auth:exitsUser', err);
        }
    }

    // Проверка ключа isAuth в localStorage
    function existIsAuth() {
        try {
            const isAuthLocalStorage = localStorage.getItem('isAuth');
            if (!!isAuthLocalStorage && isAuthLocalStorage === 'true') {
                isAuth = isAuthLocalStorage;
                return true
            } else return false;
        } catch (err) {
            throw new Error('store/auth:existIsAuth', err);
        }
    }
    //============================================== END ACTIONS ===============================================

    return {
        // STATE
        user,
        isAuth,
        code,
        key,

        // ACTIONS
        fillUserStore,
        encryptObject,
        decryptObject,
        getAccessToken,
        setAccessToken,
        deleteAccessToken,
        exitsUser,
        existIsAuth,
    };
});

export default useAuthStore;
