<template>
    <v-card class="profile-info" rounded="lg">

        <v-card-item class="profile-info__information">
            <!-- ФИО и аватарка пользователя -->
            <v-card-item class="information__block">
                <img v-if="true" class="profile-card__image avatar-stab" src="../../../assets/base/empty-user.svg" alt="avatar-stab"  />
                <v-divider></v-divider>
                <v-card-title class="information__title">{{ firstName }}</v-card-title>
                <v-card-title class="information__title">{{ lastName }}</v-card-title>
                <v-card-title class="information__title">{{ surName }}</v-card-title>
                <v-divider></v-divider>
            </v-card-item>

            <!-- Форма просмотра/изменения данных пользователя -->
            <v-form>
                <!-- ИМЯ -->
                <v-responsive class="form__field">
                    <v-text-field 
                    label="Имя"
                    type="input"
                    v-model="firstName"
                    ></v-text-field>
                </v-responsive>

                <!-- ФАМИЛИЯ -->
                <v-responsive class="form__field">
                    <v-text-field 
                    label="Фамилия" 
                    type="input"
                    v-model="lastName"
                    ></v-text-field>
                </v-responsive>

                <!-- ОТЧЕСТВО -->
                <v-responsive class="form__field">
                    <v-text-field 
                    label="Отчество" 
                    type="input"
                    v-model="surName"
                    ></v-text-field>
                </v-responsive>

                <!-- E-MAIL -->
                <v-responsive class="form__field">
                    <v-text-field 
                    label="E-mail" 
                    type="input"
                    v-model="userData.email"
                    ></v-text-field>
                </v-responsive>

                <!-- ПОДПИСКА / ПРОДЛЕНИЕ -->
                <v-sheet class="form__subscription">
                    <div>
                        <v-card-title class="form__subscription--title text-body-1">Подписка:</v-card-title >
                        <v-card-subtitle class="form__subscription--date">До 01.09.2024</v-card-subtitle>
                    </div>
                    <div>
                        <v-chip color="var(--text-primary)" elevation="2">Активна</v-chip>
                    </div>
                </v-sheet>

                <!-- <v-divider></v-divider> -->

                <v-sheet class="form__subscription">
                </v-sheet>

                <!-- Кнопка СОХРАНИТЬ -->
                <v-btn 
                class="form__btn-confirm" 
                color="var(--text-primary)" 
                block variant="flat"
                >Сохранить</v-btn>
            </v-form>
        </v-card-item>

        <!-- Статистика -->
        <v-card-item class="profile-info__statistic">
            <v-card-title class="statistic__title">Статистика</v-card-title>
            <v-divider></v-divider>

            <!-- Доступно к выводу средств -->
            <div class="statistic__available-dividend">
                <p class="statistic__subtitle">
                    Доступно к выводу средств:
                </p>
                <p class="statistic__subtitle">
                    599$
                </p>
                <v-btn 
                :loading="isLoadGetMoney"
                @click="load"
                class="statistic__get-money"
                variant="flat" 
                color="var(--text-primary)" 
                style="color: white;"
                size="small"
                >Вывести</v-btn>
            </div>
            <v-divider></v-divider>
            
        </v-card-item>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useUsersStore from '@/store/users';

const userStore = useUsersStore();

const userData = ref({
    email: null,
    tel: null,
    fullName: null,
    id: null,
    created: null,
    lastActivity: null,
    isSuperuser: null,
});

const isLoadGetMoney = ref(false);

const firstName = ref('');
const lastName = ref('');
const surName = ref('');

onMounted(async () => {
    // Получение пользователя их БД или из localStorage
    userData.value = await userStore.getUserAndCache();
    splitFullName()
});

// Разбиение fullName на имя фамилия и отчество
function splitFullName() {
    firstName.value = userData.value.fullName.split(' ')[0];
    lastName.value = userData.value.fullName.split(' ')[1];
    surName.value = userData.value.fullName.split(' ')[2];
}

function load( ) {
    isLoadGetMoney.value = true;
    setTimeout(() => {
        isLoadGetMoney.value = false;
    }, 3000);
}

</script>

<style scoped>
.profile-info {
    display: flex;
    width: 100%;
    height: max-content;
    background-color: var(--background);
}

.profile-info__information {
    width: 35%;
    border-right: 1px solid rgba(0, 0, 0, 0.2);

}
.information__block {
    display: flex;
    align-items: center;
    justify-content: center;
}
.information__title {
    display: flex;
    justify-content: center;
}
.form__field {
    padding: 5px 16px;
}
.form__subscription {
    padding: 0 8px 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form__subscription--title {
    color: var(--text-descr);
}
.form__subscription--date {
    font-weight: bolder;
}
.form__btn-confirm {
    margin: 16px 0;
    color: white;
}
.profile-info__statistic {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 65%;
}
.statistic__title {
    display: flex;
    justify-content: center;
    width: 800px;
}
.statistic__available-dividend {
    width: 100%;
    display: flex; 
    justify-content: space-between;
    padding: 16px 48px;
    align-items: center;
}
.statistic__subtitle {
    color: var(--text-descr);
    font-weight: bolder;
}
.statistic__subtitle + .statistic__subtitle {
    margin: 0 auto 0 30px;
}
.statistic__get-money {
    font-family: "Nunito Sans", sans-serif;

}

.avatar-stab {
    width: 152px;
}
</style>