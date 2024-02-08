import { defineStore } from "pinia";
import { getUser } from '@/api/users';
import useAuthStore from "./auth";

const useUsersStore = defineStore("usersStore", () => {
    const authStore = useAuthStore(); // Заимствуем Store для работы с авторизацией

    async function getUserAndCache() {
        try {
            // Сначала получаем данные пользователя с localStorage если они там есть
            const userHashed = localStorage.getItem('user');
            if(userHashed) {
                return authStore.decryptObject(userHashed, authStore.key);
            } else {
                // Получаем данные пользователя из БД если они не найдены в localStorage
                const userFromDB = await getUser();
                // Записываем хешированный объект данных пользователя в localStorage
                localStorage.setItem('user', authStore.encryptObject(userFromDB, authStore.key));
                return userFromDB; // возвращаем данные пользователя
            }
        } catch (err) {
            console.log(err);
            throw new Error(`store/users:getUserAndCache => ${err}`);
        }
    }

    return {
        // STATE

        // ACTIONS
        getUserAndCache,
    }
});


export default useUsersStore;