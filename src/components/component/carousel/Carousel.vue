<template>
    <v-carousel class="carousel" hide-delimiters style="height: 700px;">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item" cover></v-carousel-item>
    </v-carousel>
</template>
<script setup lang="ts">
defineProps<{ items: string[] }>();
</script>

<style lang="scss" >
.carousel {
     .v-btn {
        background-color: rgba(0, 0, 0, 0.5); 
        color: white; 
        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
    .v-window__container {
        img {
            object-fit: cover;
        }
    }
}
</style>