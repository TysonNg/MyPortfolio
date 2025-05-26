<script setup lang="ts">
import ListProjects from '@/components/component/Projects.vue'


</script>

<template>
    <v-container fluid >
        <div class="d-flex flex-column align-start text-white ga-3">
            <span class="text-title text-h8 fade-in-textLeft">MY EXPERIRENCES</span>
            <span class="text-subTitle text-h4">PERSONAL PROJECTS</span>    
            <ListProjects />
        
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.v-container {
    width: 100%;
    max-width: 1320px;
    margin: 5rem auto;
    .text-title {
        font-weight: 600;
        background-color: rgb(40, 48, 143);
        padding: 5px 15px;
        letter-spacing: 0.2rem;
    }

    .text-subTitle {
        font-weight: 600;
    }

}
</style>