<script>
export default {
    name: 'App',
}
</script>

<template>
    <header>
        <p class="text-xl">Navippon</p>

        <nav>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about-us">About Us</router-link>
                </li>
                <li>
                    <router-link to="/activities">Activities</router-link>
                </li>
                <li>
                    <router-link to="/packages">Packages</router-link>
                </li>
                <li>
                    <router-link to="/chat">Chat</router-link>
                </li>
               
            </ul>
        </nav>
    </header>
    <div class="container p-4 m-auto">
        <router-view></router-view>
    </div>
</template>