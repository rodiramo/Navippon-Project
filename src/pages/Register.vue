<script>
import { register } from '../services/auth.js';
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            register({
                ...this.form,
            })
                .then(user => {
                    this.$router.push({path: '/profile'});
                });
        }
    }
}
</script>

<template>
    <h1 class="mb-4 text-3xl">Register</h1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email"
                id="email"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Password</BaseLabel>
            <BaseInput 
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton>Create</BaseButton>
    
    </form>
</template>