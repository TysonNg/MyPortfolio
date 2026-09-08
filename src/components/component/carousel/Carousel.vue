<template>
    <v-carousel class="carousel rounded-sm overflow-hidden" hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item" cover></v-carousel-item>
    </v-carousel>
</template>
<script setup lang="ts">
defineProps<{ items: string[] }>();
</script>

<style lang="scss">
.carousel {
    height: clamp(240px, 45vw, 520px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

    .v-btn {
        background-color: rgba(0, 0, 0, 0.6); 
        color: white; 
        border-radius: 4px !important;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    .v-window__container {
        img {
            object-fit: cover;
        }
    }
}
</style>