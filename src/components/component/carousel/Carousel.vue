<template>
    <v-carousel class="carousel rounded-sm overflow-hidden" hide-delimiters>
        <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item"
            cover
            class="clickable-slide"
            @click="onSlideClick(i)"
        >
            <div class="carousel-zoom-badge">
                <v-icon size="15" class="mr-1">mdi-arrow-expand</v-icon>
                <span>Click to expand</span>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script setup lang="ts">
defineProps<{ items: string[] }>();

const emit = defineEmits<{
    (e: 'image-click', index: number): void;
}>();

const onSlideClick = (index: number) => {
    emit('image-click', index);
};
</script>

<style lang="scss">
.carousel {
    height: clamp(240px, 45vw, 520px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    position: relative;

    .clickable-slide {
        cursor: zoom-in;
        position: relative;

        &:hover {
            .carousel-zoom-badge {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    .carousel-zoom-badge {
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: inline-flex;
        align-items: center;
        background: rgba(15, 23, 42, 0.85);
        color: #f1f5f9;
        font-size: 0.8rem;
        font-weight: 500;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        opacity: 0;
        transform: translateY(6px);
        transition: all 0.25s ease;
        pointer-events: none;
    }

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