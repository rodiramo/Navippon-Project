<script>
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'Login',
    components: { LoginForm },
}
</script>

<template>
    <section class="hero-login">
    <h1 class="mb-4 text-3xl">Log In</h1>
    </section>
    <LoginForm />
</template>