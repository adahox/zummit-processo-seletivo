<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: ""
    }
});
</script>

<template>
    <header class="bg-orange-400 py-5 pl-4 text-white font-bold font-sans shadow-sm shadow-black">
        {{ title.toUpperCase() }}
    </header>
</template>