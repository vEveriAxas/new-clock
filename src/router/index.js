import { createRouter, createWebHistory } from "vue-router";
import DefaultView from "../views/DefaultView.vue";
import authRoutes from './auth';
import profileRoutes from './profile';
import clocksRoutes from './clocks';
import usersRoutes from './users';
import NotFound404 from '@/views/NotFound404';
import useAuthStore from "@/store/auth";
// import MainView from "../views/MainView.vue";

const routes = [
    {
        path: "/",
        name: "default",
        component: DefaultView,
        redirect: { name: "auth" },
        meta: { requiredAuth: false },
    },
    ...authRoutes,
    ...profileRoutes,
    ...clocksRoutes,
    ...usersRoutes,

    // not found 404
    {
        path: '/:notMatched(.*)*',
        name: 'notFound',
        component: NotFound404,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// отключил защиту маршрутов
// if(Date === null) {// Защита маршрутов требующих авторизации
// }
router.beforeEach((to, from, next) => {
    const store = useAuthStore();
    const tokenLength = store.getAccessToken().length;
    if(tokenLength && tokenLength > 0) {
        // если токен доступа найден и маршрут требует авторизации то навигация продолжается
        if(to.meta.requiredAuth === true) {
            next();
        } else {
            if(to.name === 'notFound' || to.name === 'default') {
                if(to.name !== 'default') {
                    next({name: 'clocks'});
                }
            }
            else router.go(-1);
        }
    } else {
        // если токен доступа НЕ найден и маршрут требует авторизации то редирект на страницу AUTH
        // Через страницу Default (она редиректит на auth)
        if(to.meta.requiredAuth === true) {
            next({name: 'default'});
        } else {
            next();
        }
    }
});

export default router;
