<template>
    <div>
        <ul class="fade-in d-flex flex-row ga-3 mt-10">
            <li :width="392" :height="367" v-for="(project, index) in projects" :key="index"
                class="project-item d-flex flex-column ga-3 rounded-lg shadow-2">
                <div class="position-relative img-container"
                    @click="modalStore.openModal(); modalStore.setSelectedProject(project)">
                    <img :src="project.thumb" alt="Project Image" :width="364" :height="300"
                        class="project-image rounded-lg ">
                    <div class="img-overlay position-absolute"></div>
                </div>

                <div class="d-flex justify-between align-center w-100">
                    <div class="d-flex flex-column align-start">
                        <p class="project-title ">{{ project.title }}</p>
                        <p class="project-description">{{ project.descriptionTitle }}</p>
                    </div>
                    <v-spacer />
                    <v-btn color="primary" @click="modalStore.openModal(); modalStore.setSelectedProject(project)"
                        class="rounded-pill" icon>
                        <v-icon size="20">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
            </li>
        </ul>
        <ProjectModal v-if="modalStore.open" :title="modalStore.selectedProject?.title"
            :descriptions="modalStore.selectedProject?.descriptions" :image="modalStore.selectedProject?.thumb"
            :details="modalStore.selectedProject?.details" :slug="modalStore.selectedProject?.slug" />
    </div>
</template>

<script setup lang="ts">
import { Details } from '@/components/modals/ProjectModal.vue';
import { useModalStore } from '@/stores/ModalStore';
import ProjectModal from '../modals/ProjectModal.vue';
import projectJson from '@/data/data.json';
const modalStore = useModalStore()


export interface Project {
    title: string;
    descriptionTitle: string;
    descriptions: string;
    slug: string;
    thumb: string;
    imgs: string[];
    reponsibilities: string[];
    details: Details
}


const projectsMap = new Map(Object.entries(projectJson))

const projects: Project[] = Array.from(projectsMap.values())
</script>

<style lang="scss" scoped>
.project-item {
    background-color: white;
    padding: 1rem;
    color: black;

    .project-title {
        font-weight: 600;
        font-size: 1.1rem;
    }

    .project-description {
        font-size: 0.8rem;
        color: #959494;
    }

    .img-container {
        overflow: hidden;
        position: relative;

        .project-image {
            transition: transform 0.3s ease;
        }

        &:hover .project-image {
            transform: scale(1.05);
        }

        .img-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;

            &:hover {
                opacity: 1;
            }
        }
    }

}

ul {
    list-style: none;
    overflow-x: auto;
}
</style>