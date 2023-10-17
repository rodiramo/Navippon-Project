<script>
import { chatSaveMessage, 
         chatSubscribeToMessages } from './../services/chat.js';
import { subscribeToAuth } from './../services/auth.js';
import { formatDate } from '../helpers/date.js';
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseLoader from '../components/BaseLoader.vue';

export default {
    name: 'Chat',
    components: { BaseButton, BaseLabel, BaseLoader },
    data() {
        return {
            loadingMessages: true,
            messages: [],
            newMessage: {
                message: '',
            },
            user: {
                id: null,
                email: null,
            },
            authUnsubscribe: () => {},
            chatUnsubscribe: () => {},
        }
    },

    methods: {
        sendMessage() {
            chatSaveMessage({
                userId: this.user.id,
                user: this.user.email,
                message: this.newMessage.message,
            })
                .then(() => {
                    this.newMessage.message = '';
                });
        },

        dateToString(date) {
            return formatDate(date);
        }
    },

    mounted() {
        this.loadingMessages = true;
        this.chatUnsubscribe = chatSubscribeToMessages(messages => {
            this.messages = messages;
            this.loadingMessages = false;
        });
        this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = {...newUser};
        });
    },
    unmounted() {
        this.authUnsubscribe();
        this.chatUnsubscribe();
    }
}
</script>

<template>
    <h1 class="mb-4 text-3xl">Navippon lets you communicate with other users easily 😊</h1>

    <div class="flex justify-between gap-4">
        <div class="w-4/6">
            <template
                v-if="loadingMessages"
            >
                <BaseLoader />
            </template>
            <template
                v-else
            >
                <div 
                    v-for="message in messages"
                    class="mb-2"
                >
                    <div>
                        <b>User:</b> 
                        <router-link 
                            class="ml-1 text-blue-600 underline"
                            :to="`/user/${message.userId}`"
                        >{{ message.user }}</router-link>
                    </div>
                    <div><b>Message:</b> {{ message.message }}</div>
                    <div class="text-right">{{ dateToString(message.created_at) || 'Sending...' }}</div>
                </div>
            </template>
        </div>

        <form 
            class="w-2/6"
            action="#" 
            @submit.prevent="sendMessage"
        >
            <div class="mb-3">
                <span class="block mb-1">User</span>
                <p>{{ user.email }}</p>
            </div>
            <div class="mb-3">
                <BaseLabel for="message">Message</BaseLabel>
                <textarea 
                    class="w-full py-1.5 px-2 border border-gray-400 rounded"
                    id="message"
                    v-model="newMessage.message"
                ></textarea>
            </div>
            <BaseButton />
         
        </form>
    </div>
</template>