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
    <div class="modal-overlay" @click="modalStore.closeModal()"></div>
    <div class="modal-container " v-if="modalStore.open">
        <button @click="modalStore.closeModal()" class="position-absolute close-button top-0 right-0">X</button>

        <div class="modal-content d-flex ga-10 ">
            <div class="project-image">
                <img :src="image" alt="Project Image" :width="657" :height="500" />
            </div>

            <div class="project-details w-100">
                <h4>{{ title }}</h4>
                <div class="modal-body">
                    <p class="project-description">{{ descriptions }}</p>
                    <div class="details">
                        <p><strong>Type:</strong> {{ details?.type }}</p>
                        <p><strong>Language:</strong> {{ details?.language }}</p>
                        <p><strong>Framework:</strong> {{ details?.frameWork }}</p>
                        <p><strong>Live URL:</strong> <a :href="details?.liveUrl" target="_blank">{{ details?.liveUrl
                        }}</a></p>
                    </div>
                </div>
                <div class="project-button">
                    <BaseButton content="Go to detail" size="x-small"  :url="slug"/>
                </div>
            </div>

        </div>
    </div>
</template>


<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
}

.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: black;
    background-color: white;
    padding: 2rem;
    margin: auto auto;
    width: 1200px;
    height: 553px;
    z-index: 10;

   
    .project-image{
        background-color: #eaf1ee;
        height: 100%;
        max-height: 500px;
        img{
            object-fit: contain;
        }
    }
    .project-details {
        text-align: start;

        h4 {
            border-bottom: 1px solid #dee2e6;
            color: #111;
            margin-bottom: 12px;
            padding-bottom: 12px;
        }

        .modal-body {
            .project-description {
                margin-bottom: 1rem;
                color: #959494;

                font-size: 0.8rem;
            }

            .details {
                font-size: 0.8rem;
                color: #959494;
                margin-top: 1rem;
                line-height: 2rem;

                a {
                    color: #959494;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }


        }

        .project-button {
            margin-top: 1rem;
        }
    }
}
</style>
