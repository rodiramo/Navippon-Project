<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';

export default {
    name: 'LoginForm',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            processingLogin: false,
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        handleLogin() {
            if(this.processingLogin) return;

            console.log("Logging in with the data: ", this.form);

            this.processingLogin = true;
            
            login({
                ...this.form,
            })
                .then(user => {
                    this.processingLogin = false;
                    this.$router.push({path: '/profile'});
                });
        }
    }
}
</script>

<template>
    <form class="form-login"
        action="#"
        @submit.prevent="handleLogin"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email"
                id="email"
                :disabled="processingLogin"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Password</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                :disabled="processingLogin"
                v-model="form.password"
            />
        </div>
        <BaseButton
            :loading="processingLogin"
        >Log In</BaseButton>
    </form>
</template>