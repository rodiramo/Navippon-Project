import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
   
    { path: '/',                component: Home, },
    { path: '/quienes-somos',   component: About, },
    { path: '/chat',            component: Chat, },
    { path: '/iniciar-sesion',  component: Login, },
    { path: '/registro',        component: Register, },
];


const router = createRouter({
    routes,
  
    history: createWebHashHistory(),
});

export default router;