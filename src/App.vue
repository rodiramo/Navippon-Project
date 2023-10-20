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
        toggleMobileMenu(open) {
        this.isMobileMenuOpen = open !== undefined ? open : !this.isMobileMenuOpen;
    },
        handleLogout() {
            logout()
            .then(user => {
                this.$router.push({path: '/log-in'});
            });
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
      <nav class="bg-black dark:bg-gray-900 fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-600" >
        <div class="max-w-screen-xl flex flex-wrap flex-column items-center justify-between mx-auto p-4">
          <div class="nav-object">
            <router-link to="/" class="flex items-center">
            <img src="/public/logo-white.png" class="h-8 mr-3" alt="Logo Navippon" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Navippon</span>
          </router-link>
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
          <ul class="mobile-menu" :class="{ 'open': isMobileMenuOpen } ">
            <li>
              <router-link to="/"  @click="toggleMobileMenu(false)" class="block py-2 pl-3 pr-4 text-white rounded md:hover-text-red-700 md:p-0 dark:text-white ">Home</router-link>
            </li>
            <li>
              <router-link to="/about-us"  @click="toggleMobileMenu(false)" class="block py-2 pl-3 pr-4 text-white rounded md:hover-text-red-700 md:p-0 dark:text-white ">About</router-link>
            </li>
            <template v-if="user.id === null">
                        <!-- Links for non-authenticated users -->
                        <li>
                            <router-link to="/log-in"  @click="toggleMobileMenu(false)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">Log In</router-link>
                        </li>
                        <li>
                        <router-link to="/register"  @click="toggleMobileMenu(false)" class="text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md-mr-0 dark-bg-red-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800">Register</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <!-- Links for authenticated users -->
                        <li>
                        <router-link to="/chat" @click="toggleMobileMenu(false)"  class="block py-2 pl-3 pr-4 text-white rounded md-hover-text-red-700 md-p-0 dark-text-white md-dark-hover-text-red-500 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700">Chat</router-link>
                        </li>
                        <li>
                        <router-link to="/packages"  @click="toggleMobileMenu(false)" class="block py-2 pl-3 pr-4 text-white rounded  md-hover-text-red-700 md-p-0 dark-text-white md-dark-hover-text-red-500 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700">Packages</router-link>
                        </li>
                        <li>
                        <router-link to="/profile"  @click="toggleMobileMenu(false)" class="block py-2 pl-3 pr-4 text-white rounded  md-hover-text-red-700 md-p-0 dark-text-white md-dark-hover-text-red-500 dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700">My Profile</router-link>
                        </li>
                        <form action="" @submit.prevent="handleLogout">
                            <button type="submit" class="text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md-mr-0 dark-bg-red-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800">
                                <b>{{ user.email }}</b> (Log Out)
                            </button>
                        </form>
                    </template>
          </ul>
        </div>
      </nav>
    </header>



    <main>
        <router-view></router-view>
    </main>

    <footer>
       <div class="bg-black bg-black shadow w-full mx-auto p-4 md:py-8">
        <div class="sm:flex  sm:items-center sm:justify-between">
            <router-link to="/" class="flex items-center mb-4 sm:mb-0">
                <img src="/public/logo-white.png" class="h-8 mr-3" alt="Navippon logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Navippon</span>
            </router-link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark-text-gray-400">
                <li>
                    <router-link to="/"  class="mr-4 hover-underline md-mr-6">Home</router-link>
                </li>
                <li>
                    <router-link to="/about-us" class="mr-4 hover-underline md-mr-6">About</router-link>
                </li>
            </ul>
        </div>
        <div>
        <hr class="my-6 border-gray-200 sm-mx-auto dark-border-gray-700 lg-my-8" />
        <span class="block text-sm text-gray-500 sm-text-center dark-text-gray-400">© 2023 <router-link to="/" class="hover-underline">Navippon™</router-link>. All Rights Reserved.</span>
        </div>
    </div>
    </footer>

</template>
