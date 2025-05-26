<script setup lang="ts">
import { useRoute } from 'vue-router';
import projectJson from '@/data/data.json';
import { computed } from 'vue';
import Carousel from '@/components/component/carousel/Carousel.vue';
const route = useRoute();
const stringMap = new Map<string, string>([
    [`ecommerce-website`, `During my learning journey, I developed an e-commerce website project to simulate a modern online shopping experience. The website was built using ReactJS for the frontend and NestJS for the backend, with PostgreSQL as the database and Redis for caching to enhance performance.`],
    [`minisocial-website`,`A social media website inspired by Facebook and Instagram with features like
creating posts, nested comments, 24-hour stories, messaging, and notifications`],
[`baovethanhdat-website`,`A website for a construction company that provides information about the company, its services, and projects. It includes a contact form for inquiries.`],
])

const slug = route.params.slug as string;

const projectsMap = new Map(Object.entries(projectJson));

const project = computed(() => projectsMap.get(slug));

const projectDetails = computed(() => {
    if (project.value) {
        return {
            title: project.value.title,
            descriptionTitle: project.value.descriptionTitle,
            descriptions: project.value.descriptions,
            slug: project.value.slug,
            thumb: project.value.thumb,
            details: project.value.details,
            imgs: project.value.imgs,
            reponsibilities: project.value.reponsibilities
        }
    }
    return null
})

</script>

<template>
    <div class="project-detail-page text-white" v-if="projectDetails">
        <h1 class="title mb-10">PROJECT</h1>
        <div class="project-content d-flex ga-10">
            <div class="container">
                <img :src="projectDetails.thumb" :alt="projectDetails.title" width="600" height="400" />
                <div class="info-container">
                    <h2 class="subtitle">{{ projectDetails.descriptionTitle }}</h2>
                    <p class="description">{{ projectDetails.descriptions }}</p>

                    <ul class="tech-details">
                        <li><strong>Type:</strong> {{ projectDetails.details.type }}</li>
                        <li><strong>Language:</strong> {{ projectDetails.details.language }}</li>
                        <li><strong>Framework:</strong> {{ projectDetails.details.frameWork }}</li>
                        <li>
                            <strong>Live URL:</strong>
                            <a class="ml-3" :href="projectDetails.details.liveUrl" target="_blank">
                                {{ projectDetails.details.liveUrl }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-10">
                <h1 class="title mb-10">DETAILS</h1>
                <div class="d-flex flex-column ga-10">
                    <div class="d-flex flex-column ga-5 text-start">
                        <strong>1. Descriptions:</strong>
                        <div class="text-start">
                            - {{ stringMap.get(projectDetails.slug) }}
                        </div>
                    </div>
                    <div class="d-flex flex-column ga-5 text-start">
                        <strong>2. Responsibilities:</strong>
                        <ul style="list-style: none;">
                            <li class="text-start" v-for="(item, index) in projectDetails.reponsibilities" :key="index">
                                - {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column ga-5">
                        <strong class="text-start">3. Some Images:</strong>
                        <Carousel :items="projectDetails.imgs" />
                    </div>
                </div>

            </div>
        </div>

    </div>
    <div v-else class="not-found">
        <p>Project not found!</p>
    </div>
</template>

<style scoped>
.project-detail-page {
    padding: 2rem;
    color: #333;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.project-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
}

.container {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

.container img {

    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-container {
    max-width: 600px;
    text-align: start;
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.tech-details {
    list-style: none;
    padding: 0;
    font-size: 0.95rem;
}

.tech-details li {
    margin-bottom: 0.5rem;
}

.listImages-container {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    display: grid;
    place-self: center;
    grid-template-columns: auto auto;
    gap: 1rem;
    margin-top: 2rem;
}
</style>
