// Маршруты отвечающие за аутентифицированный вход в систему
import AuthView from '../views/AuthView.vue';
import SigninForm from '../components/auth/SigninForm.vue';
import SignupForm from '../components/auth/SignupForm.vue';
import SignupCodeForm from '../components/auth/SignupCodeForm.vue';
import NotFound404 from '@/views/NotFound404';


export default [
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        redirect: { name: 'signin' },
        meta: { requiredAuth: false },
        children: [
            {
                // Форма для авторизации
                path:'sign-in',
                name:'signin',
                component: SigninForm,
                meta: { requiredAuth: false },
            },
            {
                // Форма для регистрации
                path:'sign-up',
                name:'signup',
                component: SignupForm,
                meta: { requiredAuth: false },
            },
            {
                // Форма для подтверждения E-mail
                path:'sign-up-code',
                name:'signupCode',
                component: SignupCodeForm,
                meta: { requiredAuth: false },
            },
        ]
    },
    
    // not found 404
    {
        path: '/auth/:notMatched(.*)*',
        component: NotFound404,
    }
]
