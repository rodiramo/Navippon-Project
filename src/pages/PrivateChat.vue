<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { getUserProfileById } from '../services/user';
import { sendPrivateChatMessage, 
         subscribeToPrivateChat } from '../services/private-chat';
import { subscribeToAuth } from '../services/auth';
import { formatDate } from '../helpers/date.js';

export default {
    name: 'PrivateChat',
    components: { BaseLoader, BaseLabel, BaseButton },
    data() {
        return {
            loadingMessages: true,
            messages: [],
            loadingProfile: true,
            userProfile: {
                id: null,
                email: null,
            },
            newMessage: {
                message: '',
            },
            userAuth: {
                id: null,
                email: null,
            },
            authUnsubscribe: () => {},
            chatUnsubscribe: () => {},
        };
    },
    methods: {
        handleMessage() {
            sendPrivateChatMessage({
                sender: this.userAuth.id,
                receiver: this.userProfile.id,
                message: this.newMessage.message,
            });
            this.newMessage.message = '';
        },

        dateToString(date) {
            return formatDate(date);
        }
    },
    async mounted() {
        this.loadingProfile = true;
        this.userProfile = await getUserProfileById(this.$route.params.id);
        this.authUnsubscribe = subscribeToAuth(user => this.userAuth = user);
        this.loadingProfile = false;
        
        this.loadingMessages = true;
        this.chatUnsubscribe = await subscribeToPrivateChat(
            {user1: this.userProfile.id, user2: this.userAuth.id}, 
            newMessages => this.messages = newMessages
        );
        this.loadingMessages = false;
    },
    unmounted() {
        this.authUnsubscribe();
    }
}
</script>

<template>
    <template v-if="!loadingProfile">
       <div class="container-sendmsg">
        <section class="hero-login">
        <h1 class="mb-4 text-3xl">Private Chat with {{ userProfile.name }}</h1>
        </section>
        <section
            class="flex flex-col  bg-white message-container container min-h-[300px] p-4 border mb-4"
        >
            <h2 class="sr-only">Messages</h2>
            
            <BaseLoader v-if="loadingMessages" />
            <template   v-else>
                <div 
                    v-for="message in messages"
                    class="max-w-[66%] p-2 rounded mb-2"
                    :class="{
                        'self-start': message.userId !== userAuth.id,
                        'bg-blue-300': message.userId !== userAuth.id,
                        'self-end': message.userId === userAuth.id,
                        'bg-slate-300': message.userId === userAuth.id,
                    }"
                >
                    <div>{{ message.message }}</div>
                    <div class="text-right">{{ dateToString(message.created_at) || 'Sending...' }}</div>
                </div>
            </template>
        </section>

        <section class="container container-sendmsg">
            <h2 class="sr-only container">Send Message</h2>
            <form 
                action="#"
                class="flex gap-2"
                @submit.prevent="handleMessage"
            >
                <BaseLabel
                    for="message"
                    class="sr-only"
                >Message</BaseLabel>
                <textarea 
                    class="w-11/12 py-1.5 mb-4"
                    id="message"
                    v-model="newMessage.message"
                ></textarea>
                <BaseButton>Send</BaseButton>
            </form>
        </section>
        </div>
    </template>
    <template v-else>
        <BaseLoader />
    </template>
</template>