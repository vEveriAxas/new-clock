import { defineStore } from "pinia";
import { computed } from "vue"; 

const useErrorStore = defineStore("errorStore", () => {
    const checkErrorStatus = computed(() => {
        return (status) => {
            if(status === 400) {
                return 'Переданы невалидные данные';
            }
            if(status === 401) {
                return 'Ошибка авторизации';
            }
            if(status === 403) { 
                return 'Отказано в доступе';
            }
            if(status === 404) { 
                return 'Ресурс не найден';
            }
            if(status === 422) { 
                return 'Переданы некорректные данные';
            }
            if(status === 500) { 
                return 'Ошибка сервера';
            }

        }
    })
    return {
        // GETTERS
        checkErrorStatus,
    }
});


export default useErrorStore;