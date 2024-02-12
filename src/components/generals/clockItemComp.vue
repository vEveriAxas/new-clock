<template>
    <v-card class="clock" rounded="lg">

        <!-- Верхняя часть карточки проекта -->
        <v-card-item class="item-header">
            <!-- Элемент показывает количество просмотров карточки -->
            <div class="item-header__views">
                <v-icon 
                color="var(--fill-icon-gray)" 
                icon="mdi-eye" 
                size="x-small"
                ></v-icon>
                <v-card-subtitle class="item-header__views-amount">
                    142
                </v-card-subtitle>
            </div>
        </v-card-item>

        <!-- Картинка проекта -->
        <v-card-item class="pt-0">
            <v-img 
            aspect-ratio="1" 
            cover 
            :src="'https://cdn.vuetifyjs.com/images/parallax/material.jpg'">
                <!-- Кружок загрузки -->
                <template v-slot:placeholder>
                    <v-row 
                    class="fill-height ma-0" 
                    align="center" 
                    justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-card-item>

        <!-- Автора проекта -->
        <v-card-item class="clock-item__container">
            <v-card-text class="clock-item">
                <v-card-subtitle class="pa-0">
                    Автор:
                </v-card-subtitle>
                <v-card-subtitle class="clock-item__value pa-0">
                    <strong>{{ props.clockData?.user.fullName }}</strong>
                </v-card-subtitle>
            </v-card-text>
        </v-card-item>

        <v-divider class="mx-3"></v-divider>
        
        <!-- Название проекта -->
        <v-card-item class="clock-item__container">
            <v-card-text class="clock-item">
                <v-card-subtitle class="pa-0">
                    Название:
                </v-card-subtitle>
                <v-card-subtitle class="clock-item__value pa-0">
                    <strong>{{ props.clockData?.name }}</strong>
                </v-card-subtitle>
            </v-card-text>
        </v-card-item>

        <v-divider class="mx-3"></v-divider>
        
        <!-- Стоимость проекта -->
        <v-card-item class="clock-item__container">
            <v-card-text class="clock-item">
                <v-card-subtitle class="pa-0">
                    Стоимость:
                </v-card-subtitle>
                <v-card-subtitle class="clock-item__value pa-0">
                    <strong>{{ computedPriceMask }}</strong>
                </v-card-subtitle>
            </v-card-text>
        </v-card-item>

        <v-divider class="mx-3"></v-divider>
        
        <!-- Дата публикации -->
        <v-card-item class="clock-item__container">
            <v-card-text class="clock-item">
                <v-card-subtitle class="pa-0">
                    Дата публикации:
                </v-card-subtitle>
                <v-card-subtitle class="clock-item__value pa-0">
                    <strong>{{ computedCreationData }}</strong>
                </v-card-subtitle>
            </v-card-text>
        </v-card-item>

        <!-- Блок Действий с проектом -->
        <v-card-actions class="clock__actions px-4 py-0">
            <v-spacer></v-spacer>
        
            <!-- Кнопка Редактировать проект -->
            <v-btn 
            class="d-flex align-center justify-center pa-3"
            v-if="isShowBuy"
            style="color: white;"
            prepend-icon="mdi-currency-usd"
            rounded="lg"
            variant="flat"
            color="var(--text-primary)"
            text="Купить"
            ></v-btn>
        
            <!-- Кнопка Редактировать проект -->
            <v-btn 
            v-else
            class="d-flex align-center justify-center pa-3"
            @click="router.push({name: 'createClock'})"
            style="color: white;"
            prepend-icon="mdi-pen"
            rounded="lg"
            variant="flat"
            color="var(--text-primary)"
            text="Изменить"
            ></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import momentCofig from '@/plugins/momentConfig';
import generalUseStore from '@/store/general';
import useUsersStore  from '@/store/users';
import { ref, defineProps, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const generalStore = generalUseStore();
const usersStore = useUsersStore();
const router = useRouter();

const props = defineProps({
    clockData: {
        type: Object,
        required: true,
    }
});

const isShowBuy = ref(false);

onMounted(async() => {
    const me = await usersStore.getUserAndCache();
    if(props.clockData?.user.id !== me.id) {
        isShowBuy.value = true;
    }
});

const computedCreationData = computed(() => {
    return momentCofig(props.clockData?.created * 1000).format('DD.MM.YYYY');
});

const computedPriceMask = computed(() => {
    return generalStore.formatCurrency(props.clockData?.price);
});

</script>

<style scoped>
.item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px 0 16px;
    cursor: default;
}
.item-header__views {
    display: flex;
    align-items: center;
}
.item-header__views-amount {
    font-size: 11px;
    padding: 0 0 0 2px !important;
}
.clock-item__container {
    padding: 8px 16px 0 16px !important;
    cursor: default;
}
.clock-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0 !important;
}
.clock-item__value {
    text-overflow: ellipsis;
    max-width: 50%;
}
.clock__actions {
    height: 20px !important;
}
</style>