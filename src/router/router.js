import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Packages from '../pages/Packages.vue';
import Prices from '../pages/Prices.vue';
import UserProfile from '../pages/UserProfile.vue';
import PrivateChat from '../pages/PrivateChat.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth';

const routes = [
    { path: '/',                    component: Home, },
    { path: '/about-us',       component: About, },
    { path: '/prices',       component: Prices, },
    { path: '/packages',       component: Packages, },
    { path: '/chat',                component: Chat,     meta: {requiresAuth: true}, },
    { path: '/profile',              component: UserProfile, meta: {requiresAuth: true}, },
    { path: '/user/:id/',        component: UserProfile, meta: {requiresAuth: true}, },
    { path: '/user/:id/chat',    component: PrivateChat, meta: {requiresAuth: true}, },
    { path: '/log-in',      component: Login, },
    { path: '/register',            component: Register, },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
}

subscribeToAuth(newUser => {
    user = {...newUser}
});

router.beforeEach((to, from) => {
    if(
        user.id === null &&
        to.meta?.requiresAuth
    ) {
        return {path: '/log-in'}
    }
});

export default router;