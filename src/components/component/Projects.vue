<template>
    <div class="projects-wrapper w-100">
        <ul class="fade-in projects-list mt-8">
            <li v-for="(project, index) in projects" :key="index"
                class="project-item d-flex flex-column rounded-sm">
                <div class="position-relative img-container"
                    @click="modalStore.openModal(); modalStore.setSelectedProject(project)">
                    <img :src="project.thumb" :alt="project.title"
                        class="project-image">
                    <div class="img-overlay position-absolute d-flex align-center justify-center">
                        <span class="preview-tag">View Details</span>
                    </div>
                </div>

                <div class="project-info d-flex justify-space-between align-center pa-4">
                    <div class="d-flex flex-column align-start">
                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-description">{{ project.descriptionTitle }}</p>
                    </div>
                    <v-btn
                        variant="outlined"
                        @click="modalStore.openModal(); modalStore.setSelectedProject(project)"
                        class="arrow-btn rounded-sm"
                        icon
                        size="38"
                        aria-label="View project details"
                    >
                        <v-icon size="18">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>

                <!-- Tech Stack Badges -->
                <div class="project-tags d-flex flex-wrap ga-2 px-4 pb-4">
                    <span
                        v-for="tag in getProjectTags(project)"
                        :key="tag"
                        class="tech-tag font-mono"
                    >
                        {{ tag }}
                    </span>
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
    responsibilities: string[];
    details: Details
}

const projectsMap = new Map(Object.entries(projectJson))
const projects: Project[] = Array.from(projectsMap.values())

const getProjectTags = (project: Project): string[] => {
    const tags: string[] = []
    if (project.details?.frameWork) {
        const fws = project.details.frameWork.split(',').map((s: string) => s.trim()).filter(Boolean)
        tags.push(...fws)
    }
    if (project.details?.language) {
        const langs = project.details.language.split(',').map((s: string) => s.trim()).filter(Boolean)
        langs.forEach((lang: string) => {
            if (!tags.includes(lang)) {
                tags.push(lang)
            }
        })
    }
    return tags
}
</script>

<style lang="scss" scoped>
.projects-wrapper {
    width: 100%;
}

.projects-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1.5rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    @media (min-width: 960px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        overflow-x: visible;
        padding-bottom: 0;
    }
}

.project-item {
    background-color: var(--color-surface-card);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    color: white;
    flex: 0 0 min(340px, 85vw);
    scroll-snap-align: start;
    overflow: hidden;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateY(-3px);
        border-color: var(--color-border-hover);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
    }

    .img-container {
        overflow: hidden;
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 220px;
        background-color: var(--color-canvas-default);

        .project-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        &:hover .project-image {
            transform: scale(1.05);
        }

        .img-overlay {
            background: rgba(8, 9, 12, 0.85);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.25s ease;

            .preview-tag {
                color: #08090c;
                background-color: #ffffff;
                padding: 6px 16px;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: 600;
                letter-spacing: 0.03em;
            }

            &:hover {
                opacity: 1;
            }
        }
    }

    .project-info {
        .project-title {
            font-weight: 700;
            font-size: 1.1rem;
            color: #ffffff;
            margin: 0;
            text-align: left;
            letter-spacing: -0.01em;
        }

        .project-description {
            font-size: 0.84rem;
            color: var(--color-fg-muted);
            margin: 0.25rem 0 0 0;
            text-align: left;
        }

        .arrow-btn {
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            color: #ffffff !important;
            border-radius: 4px !important;
            transition: all 0.2s ease;

            &:hover {
                background: #ffffff !important;
                color: #08090c !important;
            }
        }
    }

    .project-tags {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding-top: 0.75rem;

        .tech-tag {
            font-size: 0.72rem;
            padding: 2px 8px;
            background-color: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--color-border-subtle);
            border-radius: 4px;
            color: #94a3b8;
            letter-spacing: 0.02em;
            transition: all 0.2s ease;

            &:hover {
                background-color: rgba(59, 130, 246, 0.12);
                border-color: rgba(59, 130, 246, 0.4);
                color: #93c5fd;
            }
        }
    }
}
</style>