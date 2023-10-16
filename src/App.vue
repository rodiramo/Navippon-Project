<script>
import { subscribeToAuth, logout } from './services/auth.js';

export default {
    name: 'App',
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout() {
            logout()
                .then(user => {
                   //redirect
                    this.$router.push({path: '/log-in'});
                });;
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = {
                ...newUserData,
            }
        });
    }
}
</script>

<template>
    <header class="flex gap-8 items-center p-4 bg-slate-100">
      

        <nav>
            <div><img src="/public/logo-white.png" alt="Navippon Logo"> <p class="text-xl">Navippon</p></div>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about-us">About Us</router-link>
                </li>

                <li>
                    <router-link to="/prices">Prices</router-link>
                </li>
                <li>
                    <router-link to="/packages">Packages</router-link>
                </li>
                <template v-if="user.id === null">
                    <li>
                        <router-link to="/log-in">Log In</router-link>
                    </li>
                    <li>
                        <router-link to="/register">Register</router-link>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/chat">Chat</router-link>
                    </li>
                    <li>
                        <router-link to="/profile">My Profile</router-link>
                    </li>
                    <li>
                        <form 
                            action=""
                            @submit.prevent="handleLogout"
                        >
                            <button type="submit"><b>{{ user.email }}</b> (Log Out)</button>
                        </form>
                    </li>
                </template>


            </ul>
        </nav>
    </header>
    <main class="container h-full p-4 m-auto">
     <router-view></router-view>
    </main>
   <footer class="flex justify-center items-center h-[100px] bg-slate-700 text-white">
        <p>Navippon &copy; 2023</p>
    </footer>
</template>