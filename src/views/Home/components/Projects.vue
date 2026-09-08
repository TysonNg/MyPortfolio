<script setup lang="ts">
import ListProjects from '@/components/component/Projects.vue'
</script>

<template>
    <v-container fluid class="px-4 px-md-12">
        <div class="d-flex flex-column align-start text-white ga-3">
            <span class="section-tag font-mono">03 // PORTFOLIO</span>
            <h2 class="section-title">FEATURED PROJECTS</h2>    
            <ListProjects />
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.v-container {
    width: 100%;
    max-width: 1320px;
    margin: 2rem auto;

    @media (min-width: 960px) {
        margin: 3.5rem auto;
    }

    .section-tag {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--color-border-default);
        padding: 4px 12px;
        letter-spacing: 0.12rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--color-fg-muted);
        border-radius: 4px;
    }

    .section-title {
        font-weight: 700;
        font-size: clamp(1.6rem, 4vw, 2.4rem);
        letter-spacing: -0.02em;
        color: #ffffff;
    }
}
</style>