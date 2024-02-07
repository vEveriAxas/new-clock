import axios from "axios";
import useErrorStore from "@/store/error";
import {
    host,
    // paramsImg
} from "./index";
// import useAuthStore from '@/store/auth';
// import router from '@/router/';

// ======================================================   CLIENT   =======================================================


//  Получение пользователя с БД
async function getUser() {
    const store = useErrorStore();
    try {
        const response = await axios.get(
            host + "/api/users/me/", {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            },
        );
        const { data: { data } } = response;
        const userData = {};
        userData.id = data.id;
        userData.created = data.created;
        userData.email = data.email;
        userData.fullName = data.full_name;
        userData.tel = data.tel;
        userData.lastActivity = data.last_activity;
        userData.isSuperuser = data.is_superuser;
        return userData;
    } catch (err) {
        console.log(err);
        const {response: { status }} = err;
        throw new Error(`api/users:getUser => ${store.checkErrorStatus(status)}`);
    }
}

// Создание нового пользователя в БД
async function createUser(code, password, email) {
    try {
        const response = await axios.post(
            host + "/api/sign-up/email-password/",
            {
                code,
                password,
                email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            },
        );
        // Получаем токен доступа и объект данных пользователя
        const { data: { data: { token } } } = response;  // token
        const { data: { data: { user } } } = response;  // user
        return { token, user };
    } catch (err) {
        throw new Error(`api/cp/users:createUser => ${err}`);
    }
}

// Редактирование данных пользователя
async function changeUserData(email, tel, fullName, password) {
    try {
        const response = await axios.put(
            host + "/api/users/me/",
            {
                email,
                tel,
                full_name: fullName,
                password,
            },
            {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                }
            },
        );
        // Получаем токен доступа и объект данных пользователя
        console.log(response);
        const { data: { data } } = response;  // user
        return data;
    } catch (err) {
        throw new Error(`api/cp/users:changeUserData => ${err}`);
    }
}

// Удаление пользователя
async function deleteUser() {
    const storeError = useErrorStore()
    try {
        const response = await axios.delete(
            host + "/api/users/me/", {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            },
        );
        console.log(response);
    } catch (err) {
        console.log(err);
        const {response: { status }} = err;
        throw new Error(`api/users:deleteUser => ${storeError.checkErrorStatus(status)}`);
    }
} 

// Проверить на существование пользователя
async function existUser(email) {
    try {
        const response = await axios.get(
            host + "/api/users/exists/", {
            params: {
                email,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        },
        );
        const { data: { data: { exists } } } = response;
        return exists;
    } catch (err) {
        throw new Error(`api/cp/users:existUser => ${err}`);
    }
}


// =======================================================    CP    =======================================================

// ======================================================   Пользователи   =======================================================

// Создать пользователя  (POST => /api/cp/users/)
async function createUserCP(email, tel, fullName, password, isSuperuser) {
    try {
        const response = await axios.post(
            host + '/api/cp/users/', {
                email: email,
                tel: tel,
                full_name: fullName,
                password: password,
                is_active: true,
                is_superuser: isSuperuser,
            },
        {
            headers: {
                'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                'Content-Type': "application/json",
            }
        },
        );
        const { data: { data } } = response;
        const userData = {};
        userData.id = data.id;
        userData.created = data.created;
        userData.email = data.email;
        userData.fullName = data.full_name;
        userData.tel = data.tel;
        userData.lastActivity = data.last_activity;
        userData.isSuperuser = data.is_superuser;
        return userData;
        // console.log(response);  // code для подтверждения E-mail
    } catch (err) {
        console.log(err);
        throw new Error(`api/cp/users:createUserCP => ${err}`);
    }
}

// Получить всех пользователей  (GET => /api/cp/users/)
async function getUsersCP(isAdmin, page) {
    try {
        const response = await axios.get(
            host + "/api/cp/users/", {
            params: {
                is_active: true,
                is_superuser: (isAdmin === true) ? true : false,
                page: (page)? page : 1,
            },
            headers: {
                'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        const { data: { data } } = response;  // users
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(`api/cp/users:getUsersCP => ${err}`);
    }
}

// Изменить данные любого пользователя  (PUT => /api/cp/users/${userID})
async function changeUserDataCP(userID, email, tel, fullName, password, isSuperuser) {
    try {
        const response = await axios.put(
            host + `/api/cp/users/${userID}`, {
                email: email,
                tel: tel,
                full_name: fullName,
                password: password,
                is_superuser: isSuperuser,
                is_active: true,  // ???
            },
        {
            headers: {
                'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                'Content-Type': "application/json",
            }
        },
        );
        const { data: { data } } = response;
        const userData = {};
        userData.id = data.id;
        userData.created = data.created;
        userData.email = data.email;
        userData.fullName = data.full_name;
        userData.tel = data.tel;
        userData.lastActivity = data.last_activity;
        userData.isSuperuser = data.is_superuser;
        return userData;
        // console.log(response);  // code для подтверждения E-mail
    } catch (err) {
        console.log(err);
        throw new Error(`api/cp/users:changeUserDataCP => ${err}`);
    }
}

//  Получение пользователя с БД по ID    (GET => /api/cp/users/${userID})
async function getUserByIdCP(userID) {
    const store = useErrorStore();
    try {
        const response = await axios.get(
            host + `/api/cp/users/${userID}`, {
                headers: {
                    'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            },
        );
        const { data: { data } } = response;
        const userData = {};
        userData.id = data.id;
        userData.created = data.created;
        userData.email = data.email;
        userData.fullName = data.full_name;
        userData.tel = data.tel;
        userData.lastActivity = data.last_activity;
        userData.isSuperuser = data.is_superuser;
        return userData;
    } catch (err) {
        // Обработка ошибок
        console.log(err);
        const {response: { status }} = err;
        throw new Error(`api/users:getUserByIdCP => ${store.checkErrorStatus(status)}`);
    }
}

// Удаление пользователя по индентификатору    (DELETE => /api/cp/users/${userID})
async function deleteUserCP(userID) {
    try {
        const response = await axios.delete(
            host + `/api/cp/users/${userID}`, {
            headers: {
                'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        console.log(response);
        // return data;
    } catch (err) {
        console.log(err);
        throw new Error(`api/cp/users:deleteUserCP => ${err}`);
    }
}

// ======================================================   Профиль   =======================================================

// Получить текущего пользователя    (GET => /api/cp/users/me)
async function getCurrentAdminCP() {
    try {
        const response = await axios.get(
            host + "/api/cp/users/me", {
            headers: {
                'Authorization': "Bearer" + " " + localStorage.getItem("access_token"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        const { data: { data } } = response; // current user
        const userData = {};
        userData.id = data.id;
        userData.created = data.created;
        userData.email = data.email;
        userData.fullName = data.full_name;
        userData.tel = data.tel;
        userData.lastActivity = data.last_activity;
        userData.isSuperuser = data.is_superuser;
        return userData;
    } catch (err) {
        console.log(err);
        throw new Error(`api/cp/users:getCurrentUserCP => ${err}`);
    }
}


export {
    // === Client ===
    getUser,
    createUser,
    changeUserData,
    deleteUser,
    existUser,

    // === CP ===
    createUserCP,
    getUsersCP,
    changeUserDataCP,
    getUserByIdCP,
    deleteUserCP,
    getCurrentAdminCP,
}