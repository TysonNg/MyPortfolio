<script setup lang="ts">
defineProps<{
    content: string;
    size: string;
    url: string;
}>()
</script>

<template>
    <router-link :to="url" class="text-decoration-none">
        <v-btn class="base-btn rounded-sm text-capitalize font-weight-bold" :size="size">
            <span>{{ content }}</span>
            <v-icon size="18" class="ml-1">mdi-arrow-right</v-icon>
        </v-btn>
    </router-link>
</template>

<style lang="scss" scoped>
.base-btn {
    color: #08090c !important;
    background: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 4px !important;
    font-weight: 600 !important;
    letter-spacing: -0.01em;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
        background: #e2e8f0 !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
    }
}
</style>