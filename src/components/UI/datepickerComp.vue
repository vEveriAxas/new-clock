<template>
    <v-sheet class="d-flex justify-space-between">
        <v-select v-model="date" class="mr-2 w-50" density="default" bg-color="reverse_background" name="patronymic"
            :items="days" variant="outlined" @update:modelValue="editValue('date', date)"></v-select>
        <v-select class="mr-2 w-50" density="default" bg-color="reverse_background" name="patronymic" :items="months"
            v-model="month" item-title="name" item-value="id" variant="outlined"
            @update:modelValue="editValue('months', month)"></v-select>
        <v-select v-model="year" class="mr-2 w-50" density="default" bg-color="reverse_background" name="patronymic"
            :items="years" variant="outlined" @update:modelValue="editValue('year', year)"></v-select>
    </v-sheet>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
import moment from "moment";
// const emit = defineEmits(["update"]);
const props = defineProps({
    assignObject: {
        type: Object,
        default: () => ({}),
    },
    default: {
        type: Number,
        default: 1672572648,
    },
});
const dateValue = ref(moment());
const daysInMonth = ref(dateValue.value.daysInMonth());
const months = [
    { name: "Январь", id: 0 },
    { name: "Февраль", id: 1 },
    { name: "Март", id: 2 },
    { name: "Апрель", id: 3 },
    { name: "Май", id: 4 },
    { name: "Июнь", id: 5 },
    { name: "Июль", id: 6 },
    { name: "Август", id: 7 },
    { name: "Сентябрь", id: 8 },
    { name: "Октябрь", id: 9 },
    { name: "Ноябрь", id: 10 },
    { name: "Декабрь", id: 11 },
];

const startingYear = new Date(0).getFullYear();
const numberofYears = new Date().getFullYear() - new Date(0).getFullYear() + 1;

const years = ref([]);
const days = ref([]);

const getYears = () => {
    years.value = [];
    for (let i = 0; i < numberofYears; i++) {
        years.value.push(startingYear + i);
    }
    years.value.reverse();
};

const getDays = () => {
    days.value = [];
    for (let i = 1; i < daysInMonth.value + 1; i++) {
        days.value.push(i);
    }
};

const editValue = (unit, evt) => {
    dateValue.value.set(unit, evt);
    daysInMonth.value = dateValue.value.daysInMonth();
    updateElements();
    /* assignObject = dateValue; */
    // props.assignObject.birthdate = dateValue.value._d / 1000;
    /* console.log(props.assignObject.birthdate); */
    /*  emit("update", dateValue, props.assignObject); */
    return dateValue;
};

const month = ref(null);
const date = ref(days.value[0]);
const year = ref(null);

const updateElements = () => {
    // month.value gives us the <select>
    getYears();
    getDays();
    month.value = dateValue.value.month();
    date.value = dateValue.value.date();
    year.value = dateValue.value.format("YYYY");
};

watch(() => {
    dateValue.value._d = new Date(props.default * 1000);
    month.value = dateValue.value.month();
    date.value = dateValue.value.date();
    year.value = dateValue.value.format("YYYY");
});

onMounted(() => {
    updateElements();
    getYears();
    getDays();
});
</script>