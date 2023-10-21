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
                name: '',
                interests: '',
                password: '',
                role: 'user',
            },
        }
    },
    methods: {
        handleSubmit() {
            console.log('Form submitted');
            register({
                ...this.form,
            })
                .then(user => {
                    this.$router.push({path: '/user/' + user.id});
                });
        }
    }
}
</script>

<template>
    <section class="hero-login">
    <h1 class="mb-4 text-3xl">Register</h1>
    </section>
    <form class="container mb-5"
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
            <BaseLabel for="interest">Name</BaseLabel>
            <BaseInput
                type="text"
                id="name"
                v-model="form.name"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="interests">Interests</BaseLabel>
            <BaseInput
                type="text"
                id="interests"
                v-model="form.interests"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Password* <span>(min. 6 characters)</span></BaseLabel>
            <BaseInput 
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton>Register</BaseButton>
    
    </form>
</template>