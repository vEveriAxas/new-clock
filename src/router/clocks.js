// Маршруты относящиеся к проектам пользователя (ЧАСОВ)
import MainView from '../views/MainView.vue';
import catalogComp from '../components/catalog/catalogComp.vue';
import clocksList from '../components/clocks/clocksList.vue';
import clocksSelect from '../components/clocks/clocksSelect.vue';
import NotFound404 from '../views/NotFound404.vue';

export default [
    {
        path: '/clocks',
        name: 'clocks',
        component: MainView,
        redirect: { name: 'clocksList' },
        meta: { requiredAuth: true },
        children: [
            {
                // Маршрут для просмотра каталога
                path: 'catalog',
                name: 'catalog',
                component: catalogComp,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для просмотра списка проектов авторизованного пользователя
                path: 'my-clocks',
                name: 'clocksList',
                component: clocksList,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для создания проекта
                path: 'create-clock',
                name: 'createClock',
                component: clocksSelect,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для отрисовки выбранного проекта
                path: 'select-clock/:id(\\d+)', // Для параметра id валидны только числа
                name: 'selectClock',
                component: clocksSelect,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для отрисовки выбранного проекта
                path: 'change-clock/:id(\\d+)', // Для параметра id валидны только числа
                name: 'changeClock',
                component: clocksSelect,
                meta: { requiredAuth: true },
            },
        ]

    },
    // not found 404
    {
        path: '/clocks/:notMatched(.*)*',
        component: NotFound404,
    }
]
