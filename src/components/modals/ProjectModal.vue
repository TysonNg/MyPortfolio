<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
import { onBeforeRouteLeave } from 'vue-router';
import BaseButton from '../buttons/BaseButton.vue';
const modalStore = useModalStore()

export interface Details {
    type: string,
    language: string,
    frameWork: string,
    liveUrl: string,
}

defineProps<{
    title?: string
    descriptions?: string
    image?: string
    slug: string
    details?: Details
}>()

onBeforeRouteLeave(() => {
    modalStore.closeModal();
});
</script>

<template>
    <teleport to="body">
        <div class="modal-overlay" @click="modalStore.closeModal()"></div>
        <div class="modal-container rounded-sm" v-if="modalStore.open">
            <v-btn
                icon
                size="small"
                variant="text"
                color="white"
                @click="modalStore.closeModal()"
                class="close-btn rounded-sm"
                aria-label="Close modal"
            >
                <v-icon size="24">mdi-close</v-icon>
            </v-btn>

            <div class="modal-content">
                <div class="project-image-box rounded-sm">
                    <img :src="image" :alt="title" class="project-img" />
                </div>

                <div class="project-details d-flex flex-column justify-space-between">
                    <div>
                        <h3 class="modal-title">{{ title }}</h3>
                        <p class="project-description">{{ descriptions }}</p>

                        <div class="details-list d-flex flex-column ga-2">
                            <div class="detail-row">
                                <span class="label">Type:</span>
                                <span class="val">{{ details?.type }}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Language:</span>
                                <span class="val">{{ details?.language }}</span>
                            </div>
                            <div class="detail-row">
                                <span class="label">Framework:</span>
                                <span class="val">{{ details?.frameWork }}</span>
                            </div>
                            <div class="detail-row" v-if="details?.liveUrl">
                                <span class="label">Live URL:</span>
                                <a :href="details?.liveUrl" target="_blank" class="val live-link">
                                    {{ details?.liveUrl }}
                                    <v-icon size="14" class="ml-1">mdi-open-in-new</v-icon>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="modal-actions pt-6" @click="modalStore.closeModal()">
                        <BaseButton content="View Full Project" size="default" :url="'/' + slug"/>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(5, 7, 10, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 9998;
}

.modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: #0e1117;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
    padding: clamp(1.2rem, 3vw, 2.5rem);
    width: min(1000px, 92vw);
    max-height: 88vh;
    overflow-y: auto;
    z-index: 9999;

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 4px;

        &:hover {
            background: rgba(255, 255, 255, 0.18);
        }
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        @media (min-width: 860px) {
            flex-direction: row;
            gap: 2.5rem;
        }

        .project-image-box {
            background-color: #08090c;
            width: 100%;
            max-height: 380px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 4px;

            @media (min-width: 860px) {
                width: 50%;
                min-height: 320px;
            }

            .project-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
        }

        .project-details {
            width: 100%;
            text-align: left;

            @media (min-width: 860px) {
                width: 50%;
            }

            .modal-title {
                font-size: clamp(1.3rem, 3vw, 1.8rem);
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 0.75rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                letter-spacing: -0.01em;
            }

            .project-description {
                color: #94a3b8;
                font-size: 0.9rem;
                line-height: 1.65;
                margin-bottom: 1.25rem;
            }

            .details-list {
                background: rgba(255, 255, 255, 0.03);
                padding: 1rem;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.08);

                .detail-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    font-size: 0.85rem;

                    .label {
                        font-weight: 600;
                        color: #64748b;
                        min-width: 90px;
                        font-family: var(--font-mono);
                    }

                    .val {
                        color: #ffffff;
                        font-weight: 500;
                        word-break: break-all;
                    }

                    .live-link {
                        color: #ffffff;
                        display: inline-flex;
                        align-items: center;
                        text-decoration: underline;

                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }
}
</style>
