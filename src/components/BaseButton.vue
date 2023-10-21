<script>
import BaseLoader from './BaseLoader.vue';

export default {
    name: 'BaseButton',
    props: {
        color: {
            type: String,
            default: 'red',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        bgColors() {
            switch (this.color) {
                case 'green':
                    return 'bg-green-600 text-white hover:bg-green-500 focus:bg-green-500 active:bg-green-700';
                    break;
                case 'red':
                    return 'bg-red-600 text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-700';
                    break;
                default:
                    return 'bg-red-600 text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-700';
                    break;
            }
        }
    },
    components: { BaseLoader }
}
</script>

<template>
    <button
        type="submit" 
        :class="`transition w-full mb-3 mt-5 w-50 mt-4 p-2 btn rounded ${bgColors}`"
    >
        <slot 
            v-if="!loading"
        >Send</slot>
        <BaseLoader 
            v-else 
        />
    </button>
</template>