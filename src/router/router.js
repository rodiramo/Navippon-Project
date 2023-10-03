import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Chat from '../pages/Chat.vue';
import Activities from '../pages/Activities.vue';
import Packages from '../pages/Packages.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

// route list
const routes = [
    { path: '/',                component: Home, },
    { path: '/about-us',   component: About, },
    { path: '/chat',            component: Chat, },
    { path: '/activities',            component: Activities, },
    { path: '/packages',            component: Packages, },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;