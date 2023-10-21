<script>
import BaseLoader from '../components/BaseLoader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { BaseLoader },
    data() {
        return {
            loadingProfile: true,
            userProfile: {
                id: null,
                email: null,
                name: null,
                interests: null,
                role: null,
            }
        };
    },
    async mounted() {
        this.loadingProfile = true;
        this.userProfile = await getUserProfileById(this.$route.params.id);
        this.loadingProfile = false;
    },
}
</script>

<template>
    <template v-if="!loadingProfile" class="d-flex justify-content-center">
        
        <section class="hero-login">
        <h1 class="mb-4 h1"> {{ userProfile.name }}'s Profile</h1>
        </section>
        <div class="d-flex justify-content-center">
         <dl>
         <dt>Email</dt>
         <dd>{{userProfile.email}}</dd>
         <dt>Interests</dt>
         <dd>{{userProfile.interests}}</dd>
         <dt>Role</dt>
         <dd>{{userProfile.role}}</dd>
        </dl>   
        <router-link
            class="btn mx-4"
            :to="`/user/${userProfile.id}/chat`"
        >Start Private Chat</router-link>
        </div>
    </template>
    <template v-else>
        <BaseLoader />
    </template>
</template>