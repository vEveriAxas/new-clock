<template>
    <!-- Поле поиска пользователя -->
    <v-card 
    class="pa-2 pl-0 pr-0 d-flex align-center justify-space-between w-100" 
    color="background" 
    elevation="0" 
    rounded="0"
    >
    <!-- Блок выделен под фильтрацию и поиск пользователя в списке -->
        <div style="width: 400px;">
            <!-- Поле поиска по пользователям -->
            <v-text-field 
            class="bg-white" 
            prepend-inner-icon="mdi-magnify" 
            single-line="" 
            density="compact" 
            color="primary" 
            hide-details="" 
            placeholder="Поиск по пользователям">
            </v-text-field>
        </div>
        <!-- Кнопка фильтрации (ЧТО ОНА ДЕЛАЕТ???) -->
        <div class="d-flex align-center justify-end w-100">
            <v-btn flat="" icon="mdi-filter-outline"></v-btn>

            <!-- Кнопка СОЗДАТЬ (Отображает диалоговое окно для создания нового пользователя)  -->
            <userCreateComp @update-users-list="async() => await fetchUsersList()"/>
        </div>
    </v-card>

    <v-card class="rounded-lg">
        <!-- Таблица всех пользователей сервиса -->
        <v-table class="users-list__table text-none" rounded="0" density="compact" fixed-header>

            <!-- Поле заголовков -->
            <thead class="bg-white" color=""  >
                <tr>
                    <th class="text-left" style="width: 20px">ID</th>
                    <th class="text-left">Пользователь</th>
                    <th class="text-left">Телефон</th>
                    <th class="text-left">Тариф</th>
                    <th class="text-left">Регистрация</th>
                    <th class="text-left">Статус</th>
                    <th class="text-right"></th>
                </tr>
            </thead>

            <!-- Тело таблицы -->
            <tbody class="bg-white">
                <!-- Поля элементов таблицы -->
                <tr 
                v-for="item in users" 
                :key="item.name" 
                class="pointer" 
                >

                    <!-- поле: ID -->
                    <td>{{ item.id }}</td>

                    <!-- поле: Пользователь (fullName, email) -->
                    <td>
                        <div 
                        class="d-flex align-center"
                        style="cursor: pointer;"
                        @click="selectUser(item.id)"
                        >
                            <img 
                            class="users-list__user-avatar" 
                            src="../../assets/base/empty-user.svg" 
                            alt="user-avatar"
                            >
                            <div class="ml-4">
                                <div class="font-weight-bold">
                                    {{ item.full_name }}
                                </div>
                                <div class="text-grey">
                                    {{ item.email }}
                                </div>
                            </div>
                        </div>
                    </td>

                    <!-- поле: Телефон -->
                    <td>
                        {{ item.tel }}
                    </td>

                    <!-- поле: Тариф -->
                    <td>
                        <span>{{ item?.tarif?.name ?? "Бесплатный" }}</span>
                    </td>

                    <!-- поле: Дата регистрации -->
                    <td>
                        {{ new Date(item.created * 1000).toLocaleString() }}
                    </td>

                    <!-- поле: Статус подписки -->
                    <td>
                        <span class="bg-red pa-2 pl-4 pr-4 rounded-xl">
                            null
                        </span>
                        <!-- <span class="bg-green pa-2 pl-4 pr-4 rounded-xl" v-show="item.status_id == 0">
                            Пользуется
                        </span>
                        <span class="bg-yellow pa-2 pl-4 pr-4 rounded-xl" v-show="item.status_id == 1">
                            В ожидании
                        </span>
                        <span class="bg-red pa-2 pl-4 pr-4 rounded-xl" v-show="item.status_id == 2">
                            Не пользуется
                        </span> -->
                    </td>

                    <!-- поле: Взаимодействия с записью пользователем -->
                    <td class="text-right">
                        <div class="d-flex justify-end">
                            <!-- редактирование пользователя -->
                            <v-btn icon="mdi-pen" size="small" elevation="0" flat=""
                                @click="selectUser(item.id)"></v-btn>
                            <!-- удаление пользователя -->

                            <!-- Диалоговое окно для подтверждения удаления аккаунта пользователя -->
                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-delete" size="small" flat="" v-bind="props"></v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card 
                                    title="Вы уверены, что хотите удалить аккаунт?"
                                    style="
                                        display: flex;
                                        align-items: center;
                                        padding: 10px;
                                    "
                                    >
                                        <!-- Блок кнопок -->
                                        <v-card-actions style="
                                            width: 50%;
                                            display: flex;
                                            justify-content: space-evenly;
                                            margin-top: 20px;
                                            ">
                                            <!-- ДА -->
                                            <v-btn
                                            color="red"
                                            text="Да"
                                            variant="outlined"
                                            density="comfortable"
                                            @click="() => deleteSelectUser(item.id)"
                                            ></v-btn>
                                            
                                            <!-- НЕТ -->
                                            <v-btn
                                            color="var(--text-primary)"
                                            text="Нет"
                                            variant="outlined"
                                            density="comfortable"
                                            @click="isActive.value = false"
                                            ></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <!-- Пагинация -->
        <v-card rounded="0" class="bg-white w-100 d-flex align-center">
            <v-pagination density="compact" v-model="page" :length="pageTotal.total" :total-visible="7"
                @update:modelValue="updateDataUsers(page)"></v-pagination>
        </v-card>
    </v-card>
</template>
<script setup>
import userCreateComp from './userCreateComp.vue';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getUsersCP, deleteUserCP } from "@/api/users";
import useUsersStore from '@/store/users';

const router = useRouter()
const store = useUsersStore();

const users = ref([]);
const page = ref(1);
const pageTotal = ref(1);


// При загрузке компонента получаем список пользователей
onMounted(async() => {
    await fetchUsersList();
});

// Функция для получения списка пользователей
async function fetchUsersList() {
    try {
        users.value = [...await excludeMeFromAdmins(), ...await getUsersCP(false)];

    } catch (err) {
        throw new Error(`components/usersListComp:fetchUsersList => ${err}`);
    }
}

// Удаление выбранного пользователя
async function deleteSelectUser(userID) {
    try {
        deleteUserCP(userID).then(async() => {
            // Снова получаем список пользователей для его обновления
            users.value = await getUsersCP();
        })
    } catch (err) {
        throw new Error(`components/usersListComp:deleteSelectUser => ${err}`);
    }
}

// Вспомогательная функция для получения списка админов 
async function excludeMeFromAdmins(){
    try {
        let me = await store.getUserAndCache(); // Получаем пользователя с localStorage или с сервера если нет в localStorage
        if(me) {
            return [...await getUsersCP(true)].filter(user => {
                return me.id !== user.id;
            });
        }
    } catch (err) {
        throw new Error(`components/usersListComp:excludeMeFromAdmins => ${err}`);
    }
}

function updateDataUsers(page) {
    console.log(page);
}
function selectUser(id) {
    router.push({ name: 'selectUser', params: {id} })
}
</script>

<style scoped>
.users-list__table {
    max-height: 80vh !important;
}
.users-list__user-avatar {
    width: 40px;
    height: 40px;
    margin: 5px 0;
}

</style>