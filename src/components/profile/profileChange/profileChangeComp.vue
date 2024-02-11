<template>
    <!-- Контейнер содержит форму для редактирования данных пользователя -->
    <div style="
    height: 100%;
    width: 100%;
    border-top: var(--border);
    border-bottom: var(--border);
    ">
        <v-card 
        class="profile-change__container"
        color="background"
        elevation="0" 
        >
            <!-- Форма для редактирования данных пользователя -->
            <v-card 
            class="profile-change" 
            elevation="0" 
            color="background">
                <!-- Титульный блок (Блок с аватркой пользователя) -->
                <!-- <profileCardComp :data="userData" /> -->
            </v-card>

        </v-card>
    </div>
</template>

<script setup>
// import profileCardComp from "../general/profileCardComp.vue";
// import changePersonalComp from "./changePersonalComp.vue";
// import changeIntrestingComp from "./changeIntrestingComp.vue";
// import changeFamilyComp from "./changeFamilyComp.vue";
// import changeContactsComp from "./changeContactsComp.vue";
// import { profileApi } from "../../api/profileApi";
import {  reactive, onMounted } from "vue";

// const { getUser } = profileApi();
// const tab = ref(null);

const userData = reactive({
    email: null,
    tel: null,
    fullName: null,
    id: null,
    created: null,
    lastActivity: null,
});
onMounted(() => {
    userData.created = 1706600361105;
    userData.lastActivity = 1706600361105;
    userData.email = 'user@example.com';
    userData.fullName = 'John Doe';
    userData.id = 1;
    userData.tel = '+79997214215';
});
// function updateData() {
//     console.log('updateData');
// }

</script>

<style scoped>
.profile-change__container {
    max-height: 100% !important;
    height: max-content;
    display: flex;
    justify-content: center;
    background-color: var(--background);
    /* border: 1px solid black; */
    padding: 8px 0 16px 0;
    overflow: auto !important;

    border-radius: 0;
}
.profile-change__wrapped {
    padding: 0 !important;
    box-shadow: var(--shadow);
    margin-top: 8px;
}

.profile-change {
    height: 100%!important;
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 8px;
}
.profile-change__menu {
    position: sticky;
    top: 0 !important;
    width: 20% !important;
    margin: 0.5rem 0 0 .6rem !important;
}
.menu-tab {
   font-size: 13px !important; 
}
.active-settings-profile__tab {
    color: #415174;
    border: none !important;
}

</style>