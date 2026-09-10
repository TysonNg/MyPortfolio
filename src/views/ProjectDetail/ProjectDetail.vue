<script setup lang="ts">
import { useRoute } from 'vue-router';
import projectJson from '@/data/data.json';
import { computed, ref, onMounted, watch, inject } from 'vue';
import Carousel from '@/components/component/carousel/Carousel.vue';
import ImageLightbox from '@/components/modals/ImageLightbox.vue';

const route = useRoute();
const lenis = inject<any>('lenis', null);

const scrollToTop = () => {
    window.scrollTo(0, 0);
    if (lenis) {
        lenis.scrollTo(0, { immediate: true });
    }
};

onMounted(() => {
    scrollToTop();
});

watch(() => route.params.slug, () => {
    scrollToTop();
});
const stringMap = new Map<string, string>([
    [`datmonngon-platform`, `DatMonNgon is an all-in-one restaurant operating system and customer ordering ecosystem designed for modern F&B businesses. On the consumer side, customers can scan table QR codes or order online with categorized digital menus, promotional voucher redemption, and order tracking. On the operational side, store managers and service staff handle table layouts, take orders, and manage bills through an interactive real-time POS grid, while kitchen teams receive instant order tickets via a dedicated Kitchen Display System (KDS) powered by Socket.IO. The platform features robust analytics tracking revenue trends, average order values, and loyalty memberships, supported by PostgreSQL and Redis caching for high concurrency.`],
    [`ecommerce-website`, `E-Shop is a full-featured e-commerce platform engineered to deliver a seamless shopping experience for tech and electronics consumers. Built with Next.js (App Router) and Tailwind CSS on the frontend, and supported by a robust RESTful API backend with database indexing and caching, the platform allows shoppers to explore catalog categories, search with instant suggestions, apply multi-attribute filters (pricing, ratings), manage persistent cart items with coupon vouchers, and complete streamlined multi-payment checkouts.`],
    [`minisocial-website`,`MiniSocial is an engaging full-stack social platform developed to deliver real-time social connectivity and fluid user experiences. Built with Next.js on the frontend and a scalable Nest.js microservices architecture on the backend, the platform enables members to publish rich multimedia posts, engage in nested discussion threads, follow other users, and communicate via instantaneous two-way chat powered by Socket.IO. High-speed user discovery and content queries are accelerated through Elasticsearch indexing, with Redis managing distributed session states and active presence detection.`],
    [`thean-security-website`, `The An Security (baovethean.com) is a high-impact corporate website developed to showcase comprehensive physical security and asset protection services in Vietnam. Built with custom WordPress and Elementor architecture, the site delivers high search visibility through targeted on-page SEO. The platform features an intuitive security service catalog (building guarding, industrial warehouses, construction sites, VIP protection, event security), client credentials, interactive social hotlines (Zalo, phone), and an automated consultation inquiry funnel for swift security deployment.`],
[`baovethanhdat-website`,`A professional website for a security services company that provides comprehensive information about security solutions, personnel protection, corporate guarding, and client inquiry forms.`],
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
            descriptions_detail: project.value.descriptions_detail,
            slug: project.value.slug,
            thumb: project.value.thumb,
            details: project.value.details,
            imgs: project.value.imgs,
            responsibilities: project.value.responsibilities
        }
    }
    return null
})

// Lightbox state
const isLightboxOpen = ref(false);
const lightboxImages = ref<string[]>([]);
const lightboxInitialIndex = ref(0);

const openScreenshotsLightbox = (index: number) => {
    if (projectDetails.value?.imgs && projectDetails.value.imgs.length > 0) {
        lightboxImages.value = projectDetails.value.imgs;
        lightboxInitialIndex.value = index;
        isLightboxOpen.value = true;
    }
};

const openThumbLightbox = () => {
    if (projectDetails.value?.thumb) {
        lightboxImages.value = [projectDetails.value.thumb];
        lightboxInitialIndex.value = 0;
        isLightboxOpen.value = true;
    }
};

</script>

<template>
    <div class="project-detail-page text-white px-4 px-md-12 py-8" v-if="projectDetails">
        <div class="header-nav mb-6">
            <router-link to="/#projects" class="text-decoration-none">
                <v-btn variant="outlined" rounded="sm" class="text-capitalize back-btn font-weight-bold">
                    <v-icon start size="18">mdi-arrow-left</v-icon>
                    Back to Projects
                </v-btn>
            </router-link>
        </div>

        <h1 class="project-page-title mb-8">{{ projectDetails.title }}</h1>
        
        <div class="project-content">
            <!-- Hero Card: Image + Tech Details -->
            <div class="overview-container rounded-sm pa-6 pa-md-8">
                <div class="overview-image-box zoomable" @click="openThumbLightbox" title="Click to enlarge">
                    <img :src="projectDetails.thumb" :alt="projectDetails.title" class="project-main-img rounded-sm" />
                    <div class="thumb-zoom-badge">
                        <v-icon size="15" class="mr-1">mdi-arrow-expand</v-icon>
                        <span>Click to expand</span>
                    </div>
                </div>
                <div class="info-container">
                    <h2 class="subtitle">{{ projectDetails.descriptionTitle }}</h2>
                    <p class="description">{{ projectDetails.descriptions }}</p>

                    <div class="tech-card rounded-sm pa-4 mt-4">
                        <ul class="tech-details">
                            <li><span class="label font-mono">Type:</span> <span class="val">{{ projectDetails.details.type }}</span></li>
                            <li><span class="label font-mono">Language:</span> <span class="val">{{ projectDetails.details.language }}</span></li>
                            <li><span class="label font-mono">Framework:</span> <span class="val">{{ projectDetails.details.frameWork }}</span></li>
                            <li v-if="projectDetails.details.liveUrl">
                                <span class="label font-mono">Live URL:</span>
                                <a class="live-link font-mono" :href="projectDetails.details.liveUrl" target="_blank">
                                    {{ projectDetails.details.liveUrl }}
                                    <v-icon size="14" class="ml-1">mdi-open-in-new</v-icon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Deep Dive Details -->
            <div class="details-section mt-10 rounded-sm pa-6 pa-md-8">
                <h2 class="section-title mb-6 font-mono">PROJECT BREAKDOWN</h2>
                <div class="d-flex flex-column ga-8">
                    <div class="detail-block">
                        <h3 class="block-title">1. Project Overview</h3>
                        <p class="block-text mt-2">
                            {{ projectDetails.descriptions_detail || stringMap.get(projectDetails.slug) }}
                        </p>
                    </div>

                    <div class="detail-block">
                        <h3 class="block-title">2. Key Responsibilities</h3>
                        <ul class="responsibilities-list mt-2">
                            <li v-for="(item, index) in projectDetails.responsibilities" :key="index">
                                <v-icon size="16" color="#94a3b8" class="mr-2">mdi-check-circle-outline</v-icon>
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="detail-block" v-if="projectDetails.imgs && projectDetails.imgs.length">
                        <h3 class="block-title mb-4">3. Project Screenshots</h3>
                        <Carousel :items="projectDetails.imgs" @image-click="openScreenshotsLightbox" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Lightbox Modal -->
        <ImageLightbox
            v-model="isLightboxOpen"
            :images="lightboxImages"
            :initial-index="lightboxInitialIndex"
        />
    </div>
    <div v-else class="not-found text-center py-16">
        <h2>Project not found!</h2>
        <router-link to="/#projects" class="mt-4 d-inline-block">
            <v-btn color="primary">Return Home</v-btn>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
.project-detail-page {
    max-width: 1320px;
    margin: 0 auto;
    color: #f1f5f9;
}

.header-nav {
    display: flex;
    justify-content: flex-start;

    .back-btn {
        background-color: rgba(7, 136, 255, 0.15);
        border: 1px solid rgba(7, 136, 255, 0.3);
        transition: all 0.2s ease;

        &:hover {
            background-color: rgba(7, 136, 255, 0.3);
            transform: translateX(-3px);
        }
    }
}

.project-page-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    text-align: left;
    color: #ffffff;
    letter-spacing: -0.02em;
}

.project-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
}

.overview-container {
    background-color: var(--color-surface-card);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (min-width: 960px) {
        flex-direction: row;
        align-items: flex-start;
    }

    .overview-image-box {
        width: 100%;
        max-width: 580px;
        position: relative;

        &.zoomable {
            cursor: zoom-in;

            .project-main-img {
                transition: all 0.25s ease;
            }

            &:hover {
                .project-main-img {
                    filter: brightness(1.06);
                    border-color: rgba(255, 255, 255, 0.25);
                }

                .thumb-zoom-badge {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

        .thumb-zoom-badge {
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

        .project-main-img {
            width: 100%;
            height: auto;
            max-height: 380px;
            object-fit: cover;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            display: block;
        }
    }

    .info-container {
        width: 100%;
        text-align: left;

        .subtitle {
            font-size: clamp(1.4rem, 3vw, 1.8rem);
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.75rem;
            letter-spacing: -0.01em;
        }

        .description {
            font-size: 0.95rem;
            line-height: 1.65;
            color: var(--color-fg-muted);
            margin-bottom: 1rem;
        }

        .tech-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--color-border-subtle);
            border-radius: 4px;

            .tech-details {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 0.6rem;
                font-size: 0.9rem;

                li {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;

                    .label {
                        font-weight: 600;
                        color: #64748b;
                        min-width: 90px;
                    }

                    .val {
                        color: #ffffff;
                    }

                    .live-link {
                        color: #ffffff;
                        text-decoration: underline;
                        display: inline-flex;
                        align-items: center;

                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }
}

.details-section {
    background-color: var(--color-surface-card);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
    text-align: left;

    .section-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ffffff;
        border-bottom: 1px solid var(--color-border-subtle);
        padding-bottom: 0.75rem;
        letter-spacing: 0.05em;
    }

    .block-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #ffffff;
    }

    .block-text {
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--color-fg-muted);
    }

    .responsibilities-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        li {
            display: flex;
            align-items: flex-start;
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--color-fg-muted);
        }
    }
}

.back-btn {
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
    background: transparent !important;
    border-radius: 4px !important;
    transition: all 0.2s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.6) !important;
        background: rgba(255, 255, 255, 0.08) !important;
    }
}
</style>
