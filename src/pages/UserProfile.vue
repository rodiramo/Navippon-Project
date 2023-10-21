<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { subscribeToAuth, editUser } from '../services/auth';
import { getUserProfileById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { BaseButton, BaseLoader },
    data() {
        return {
            userProfile: {
                id: null,
                email: null,
                name: null,
                interests: null,
                role: null,
            },
            loadingUser: true,
            authUnsubscribe: () => {},

            editing: false,
            editData: {
                name: '',
                interests: '', 
                email: '',           },
            processingEdit: false,
        };
    },
    methods: {
        handleShowEdit() {
            this.editing = true;
            this.editData = {
                name: this.userProfile.name, 
            }
        },

        handleHideEdit() {
            this.editing = false;
        },

        async handleEdit() {
            this.processingEdit = true;
            await editUser({
                ...this.editData,
            });
            this.processingEdit = false;
        },
    },    
    async mounted() {
    this.loadingProfile = true;
    const userId = this.$route.params.id;
    console.log('User ID:', userId); 
    this.userProfile = await getUserProfileById(userId);
    console.log('User Profile:', this.userProfile); 
    this.loadingProfile = false;

    this.authUnsubscribe = subscribeToAuth(newUser => {
        this.user = newUser;
        this.loadingUser = false;
    });
},

  
    unmounted() {
        this.authUnsubscribe();
    },

}
</script>

<!-- Your template section remains unchanged -->
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
        <form action="#" class="mb-4 form-profile" @submit.prevent="handleEdit">
           <h3 class="text-center h3">Change Profile Name</h3> 
          <div class="mb-2 ">
            <label for="name">User Name:</label>
            <input id="name" :disabled="processingEdit" v-model="editData.name" />
           
          </div>
          <BaseButton :loading="processingEdit">Update Data</BaseButton>
        </form>
        <hr class="mb-4">
      </template>
      <template v-else>
        <BaseLoader></BaseLoader>
      </template>
    
    </template>