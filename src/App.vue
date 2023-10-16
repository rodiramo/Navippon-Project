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
  
      <header>
<nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <router-link to="/" class="flex items-center">
      <img src="/public/logo-white.png" class="h-8 mr-3" alt="Logo Navippon">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Navippon</span>
  </router-link>
  <div class="flex md:order-2">
      
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

        <li>
          <router-link to="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</router-link>
        </li>
        <li>
          <router-link to="/about-us" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</router-link>
        </li>
        <li>
          <router-link to="/packages" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Packages</router-link>
        </li>
        <li>
          <router-link to="/prices" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</router-link>
        </li>
    
    </ul>
    <template v-if="user.id === null">
        <li>  
            <router-link to="/log-in" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</router-link>
        </li>
        <li>
        <router-link to="/register"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</router-link>
        </li>
    </template>
    <template v-else>
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">User Name</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">user email</span>
             <ul>
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
                </ul>
            </div>
        </div>
                  
    </template>
  </div>
  </div>
</nav>

</header>

    


    <main class="container h-full p-4 m-auto">
     <router-view></router-view>
    </main>
 
<footer class="bg-white shadow dark:bg-gray-900 ">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <router-link to="/" class="flex items-center mb-4 sm:mb-0">
                <img src="/public/logo-white.png" class="h-8 mr-3" alt="Navippon logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Navippon</span>
            </router-link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <router-link to="/" class="hover:underline md:mr-6 ">Home</router-link>
                </li>
                <li>
                    <router-link to="/about-us" class="mr-4 hover:underline md:mr-6 ">About</router-link>
                </li>
                <li>
                    <router-link to="/prices" class="mr-4 hover:underline">Pricing</router-link>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <router-link to="/" class="hover:underline">Navippon™</router-link>. All Rights Reserved.</span>
    </div>
</footer>


</template>