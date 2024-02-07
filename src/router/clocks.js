// Маршруты относящиеся к проектам пользователя (ЧАСОВ)
import MainView from '../views/MainView.vue';
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
                // Маршрут для просмотра списка проектов
                path: 'my-clocks',
                name: 'clocksList',
                component: clocksList,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для отрисовки выбранного проекта
                path: 'select-clock/:id(\\d+)', // Для параметра id валидны только числа
                name: 'selectClock',
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
