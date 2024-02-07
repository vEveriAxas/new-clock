// Маршруты относящиеся к профилю пользователя
import MainView from '../views/MainView.vue';
import profileInfoComp from '../components/profile/profileInfo/profileInfoComp.vue';
import profileChangeComp from '../components/profile/profileChange/profileChangeComp.vue';
import NotFound404 from '@/views/NotFound404';

export default [
    {
        path: '/profile',
        name: 'profile',
        component: MainView,
        redirect: { name: 'info' },
        meta: { requiredAuth: true },
        children: [
            {
                // Маршрут общей информации пользователя
                path: 'info',
                name: 'info',
                component: profileInfoComp,
                meta: { requiredAuth: true },
            },
            {
                // Маршрут для изменения информации пользователя
                path: 'change',
                name: 'change',
                component: profileChangeComp,
                meta: { requiredAuth: true },
            },
        ]       

    },
    // not found 404
    {
        path: '/profile/:notMatched(.*)*',
        component: NotFound404,
    }
]