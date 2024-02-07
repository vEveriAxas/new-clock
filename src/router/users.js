// Маршруты относящиеся к получению пользователей
import MainView from '../views/MainView.vue';
import usersListComp from '../components/users/usersListComp.vue';
import userProfileComp from '../components/users/userProfileComp.vue';
import NotFound404 from '../views/NotFound404.vue';


export default [
    {
        path: '/users',
        name: 'users',
        component: MainView,
        redirect: { name: 'usersList' },
        meta: { requiredAuth: true },
        children: [
            {
                // Маршрут для просмотра списка пользователей
                path:'',
                name:'usersList',
                component: usersListComp,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для отрисовки выбранного пользователя
                path:'select-user/:id(\\d+)',  // Для параметра id валидны только числа
                name:'selectUser',
                component: userProfileComp,
                meta: { requiredAuth: true },
            },
        ]
            
    },
    // not found 404
    {
        path: '/users/:notMatched(.*)*',
        component: NotFound404,
    }
]