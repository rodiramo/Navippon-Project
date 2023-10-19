<script>
import { subscribeToAuth, logout } from './services/auth.js';

export default {
    name: 'App',
    data() {
        return {
            isMobileMenuOpen: false,
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        handleLogout() {
            logout()
          1      .then(user => {
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
  
      <header>
    <nav class="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link to="/" class="flex items-center">
      <img src="/public/logo-white.png" class="h-8 mr-3" alt="Logo Navippon">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Navippon</span>
    </router-link>

<template v-if="user.id === null">
    <!-- Links for non-authenticated users -->
    
        <router-link to="/log-in" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</router-link>
   
    
        <router-link to="/register" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</router-link>
   
</template>
<template v-else>
    <!-- Links for authenticated users -->


        <router-link to="/" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</router-link>
        
        <router-link to="/about-us" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover-bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover-text-red-500 dark:hover:bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700">About</router-link>
   
        <router-link to="/chat" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover-bg-transparent md:hover-text-red-700 md:p-0 dark:text-white md:dark:hover-text-red-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700">Chat</router-link>
    
        <router-link to="/profile" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover-bg-transparent md:hover-text-red-700 md:p-0 dark:text-white md:dark:hover-text-red-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700">My Profile</router-link>
   
        <router-link to="/packages" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover-bg-transparent md:hover-text-red-700 md:p-0 dark:text-white md:dark:hover-text-red-500 dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700">Packages</router-link>
    
        <form action="" @submit.prevent="handleLogout">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
                <b>{{ user.email }}</b> (Log Out)
            </button>
        </form>
  
</template>

  </div>
</nav>


</header>

    <main class="container py-3 mt-5">
     <router-view></router-view>
    </main>
 
    <footer class="footer">

        <p>Tp 1 Clientes Web Mobile &copy; 2023</p>

    </footer>


</template>