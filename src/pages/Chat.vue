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
      <section class="hero hero-home">
            
            <h1><span>Chat</span></h1>

            <p>Chat with other users</p>
           
        </section>
    <section class="flex flex-col min-h-[300px] p-4 border mb-4">
        <h2 class="h2">Messages</h2>
        <div class="message-container mx-3 my-3 border rounded border-dark">
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
                    class="max-w-[66%] p-2 rounded mb-2"
                >
                    <div>
                        <div>{{ dateToString(message.created_at) || 'Sending...' }}</div>
                        <b>User:</b> 
                        <router-link 
                            class="ml-1 text-blue-600 underline"
                            :to="`/user/${message.userId}`"
                        >{{ message.user }}</router-link>
                    </div>
                    <div><b>Message:</b> {{ message.message }}</div>
                </div>
            </template>
        </div>

        <form  
            class=""
            @submit.prevent="sendMessage"
        >
            <div class="mb-3">
                <span class="block text-primary">User</span><p>{{ user.email }}</p>
            </div>
            <div class="example-container">
                <div class="example-row mb-4">
                    <div class="example-content-main">
                        <BaseLabel for="message">Message</BaseLabel>
                    </div>
                    <div class="example-content-dark mb-3">
                        <textarea class="w-full py-1.5 px-2 rounded border border   border-primary-400 rounded"
                        id="message"
                        v-model="newMessage.message"
                    >   </textarea>
                    </div>
                </div>
            </div>
            
          
            <BaseButton />
         
        </form>
    </section>
</template>