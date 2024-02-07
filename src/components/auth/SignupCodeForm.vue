<template>
    <!-- Форма подтверждения E-mail -->
    <v-card class="signup-code-form__container">
        <v-form class="text-left" lazy-validation>

            <!-- Заголовок Формы -->
            <v-card-title class="sigup-code-form__title text-h5">
                Добро пожаловать в NewClock!
            </v-card-title>

            <!-- Уведомление того что код подтверждения отправлен на почту -->
            <v-card-text class="pa-0 mt-2 text-text">
                На Ваш адрес электронной почты
                <strong>{{ email }}</strong> выслан код подтверждения. Введите код для 
                того, чтобы подтвердить ваш E-mail
            </v-card-text>

            <!-- Подзаголовок Код подтверждения -->
            <v-card-subtitle class="mb-2 mt-2 pl-0">Код подтверждения почты</v-card-subtitle>
            <!-- Поле ввода E-MAIL -->
            <input-comp 
            v-model="code" @keyEnter="() => handleCode()"
            :value-for-check="store.code"
            :not-matched-text="'Код подтверждения не верный'"
            ></input-comp>
        </v-form>

        <!-- Блок с кнопками действий -->
        <v-sheet class="d-flex justify-end mt-8">
            <v-btn variant="text" @click="router.go(-1)">
                Назад
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="flat" @click="handleCode">
                Продолжить
            </v-btn>
        </v-sheet>
    </v-card>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/store/auth';
import { createUser, changeUserData } from '@/api/users';
const store = useAuthStore();
const router = useRouter();

const code = ref('');
const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');

onMounted(() => {
    // Получение ранее введенного E-mail
    const formDataHashed = localStorage.getItem('formData');
    if(formDataHashed && !!formDataHashed.length) {
        const formData = store.decryptObject(formDataHashed, store.key);
        email.value = formData.email;
        password.value = formData.password;
        firstName.value = formData.firstName;
        lastName.value = formData.lastName;
    }

    // Если кода подтверждения E-mail не существует, то перенаправляем пользоваетля обратно
    if(store.code === null) {
        router.push({ name: 'signup'});
    }

});

// Обработка введенного кода подтверждения
async function handleCode() { 
    if(store.code) {
        if(store.code === code.value) {
            createUser(code.value, password.value, email.value).then(
                // onResolved
                (response) => {
                    // в response приходит { token: '#...', user: {id: ...} }
                    store.setAccessToken(response.token);
                    return response;
                }, 
                // onRejected
                (err) => {
                    throw new Error('SingupCodeForm:createUser', err)
                }
            ).then(async () => {
                // Возвращаем измененный объект данных пользователя
                return await changeUserData(email.value, null, `${firstName.value} ${lastName.value}`, password.value);
            }).then((user) => {
                // Если пользователь успешно создан и изменен (в соответствии с формой регистрации) то 
                // перенаправляем его на маршрут его проектов
                store.fillUserStore(user);
                localStorage.removeItem('formData');
                router.push({name: 'clocks'});
            });
        } else {
            return;
        }
    }
}

</script>

<style scoped>
.signup-code-form__container {
    max-height: calc(100vh - 20px) !important;
    width: 500px !important;
    padding: 38px !important;
    box-shadow: 0px 0px 10px 0px #18707d40 !important;
    border-radius: 18px !important;
    font-family: "Nunito Sans", sans-serif !important;
}
.sigup-code-form__title {
    padding: 0 !important;
    font-weight: bold !important;
    color: var(--text-descr);
}
</style>