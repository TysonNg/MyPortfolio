<script setup>
import BaseBtn from '@/components/buttons/BaseButton.vue'
</script>

<template>
    <v-container fluid class="about-section-container px-4 px-md-12 py-12 py-md-16">
        <v-row class="container" align="center">
            <!-- Left Portrait Image -->
            <v-col cols="12" md="5" class="image-col">
                <div class="image-container position-relative">
                    <div class="portrait-card">
                        <img id="image" class="w-100 h-auto rounded-sm" src="@/assets/avatar5.jpg" alt="About Tyson">
                        <div class="portrait-badge font-mono d-flex align-center ga-2 px-3 py-2">
                            <v-icon size="16" color="#94a3b8">mdi-school-outline</v-icon>
                            <span>UIT · VNU-HCM</span>
                        </div>
                    </div>
                </div>
            </v-col>

            <!-- Right Content -->
            <v-col cols="12" md="7" class="about-container d-flex flex-column justify-center ga-4 ga-md-5">
                <h2 class="text-title">
                    Building Robust Web Systems With Precision &amp; Craft.
                </h2>

                <div class="text-description">
                    <p>
                        I am a web developer graduated from the <strong>University of Information Technology (UIT)</strong>, Vietnam National University HCM. My focus spans scalable full-stack architecture and high-performance web systems, with hands-on experience in Vue 3, TypeScript, Node.js, and SQL databases.
                    </p>
                    <p class="mt-2">
                        I value code quality, maintainability, and clean user experience. Constantly learning new technologies and exploring modern development patterns to deliver high-impact digital products.
                    </p>

                    <div class="github-tag font-mono d-inline-flex align-center ga-2 mt-3 px-3 py-1 rounded-sm">
                        <v-icon size="16">mdi-github</v-icon>
                        <a href="https://github.com/TysonNg" target="_blank" class="github-link">github.com/TysonNg</a>
                    </div>
                </div>

                <!-- Bento Stats -->
                <div class="box-container mt-2">
                    <div class="box-item">
                        <span class="num font-mono">5+</span>
                        <span class="label font-mono">PROJECTS BUILT</span>
                    </div>
                    <div class="box-item">
                        <span class="num font-mono">2+</span>
                        <span class="label font-mono">YEARS EXPERIENCE</span>
                    </div>
                    <div class="box-item">
                        <span class="num font-mono">3.0</span>
                        <span class="label font-mono">CS GPA (UIT)</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex flex-wrap align-center ga-3 mt-4">
                    <BaseBtn content="Get in touch" size="large" url="/#contact"/>
                    <a href="/cv.pdf" download="Tyson_CV.pdf" target="_blank" class="text-decoration-none">
                        <v-btn
                            variant="outlined"
                            size="large"
                            class="cv-btn rounded-sm text-capitalize font-weight-bold"
                        >
                            <v-icon start size="18">mdi-file-download-outline</v-icon>
                            Download CV
                        </v-btn>
                    </a>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.about-section-container {
    overflow: hidden;
    position: relative;
    border-top: 1px solid var(--color-border-subtle);
}

.container {
    margin: 1rem auto;
    max-width: 1320px;

    .image-col {
        display: flex;
        justify-content: center;
    }

    .image-container {
        width: 100%;
        max-width: 440px;

        .portrait-card {
            position: relative;
            background: var(--color-surface-card);
            border: 1px solid var(--color-border-default);
            border-radius: 6px;
            padding: 8px;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
            transition: border-color 0.3s ease;

            &:hover {
                border-color: var(--color-border-hover);
            }

            #image {
                border-radius: 4px;
                display: block;
                filter: grayscale(15%);
                transition: filter 0.3s ease;

                &:hover {
                    filter: grayscale(0%);
                }
            }

            .portrait-badge {
                position: absolute;
                bottom: 18px;
                left: 18px;
                background: rgba(8, 9, 12, 0.9);
                backdrop-filter: blur(8px);
                border: 1px solid var(--color-border-default);
                border-radius: 4px;
                font-size: 0.75rem;
                color: #e2e8f0;
                letter-spacing: 0.05em;
            }
        }
    }

    .about-container {
        text-align: start;

        .text-title {
            font-weight: 700;
            font-size: clamp(1.6rem, 3.5vw, 2.3rem) !important;
            line-height: 1.25;
            letter-spacing: -0.02em;
            color: #ffffff;
        }

        .text-description {
            font-size: clamp(0.9rem, 1.6vw, 1rem);
            line-height: 1.7;
            color: var(--color-fg-muted);
            text-align: start;

            strong {
                color: #ffffff;
            }

            .github-tag {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid var(--color-border-subtle);
                border-radius: 4px;
                font-size: 0.8rem;
                color: var(--color-fg-muted);

                .github-link {
                    color: #ffffff;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        .box-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.85rem;
            width: 100%;
            max-width: 520px;

            .box-item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                border: 1px solid var(--color-border-subtle);
                border-radius: 4px;
                padding: 1rem 1.1rem;
                background-color: var(--color-surface-card);
                transition: transform 0.2s ease, border-color 0.2s ease;

                &:hover {
                    transform: translateY(-2px);
                    border-color: var(--color-border-hover);
                }

                .num {
                    font-weight: 700;
                    font-size: clamp(1.25rem, 2.5vw, 1.6rem);
                    color: #ffffff;
                    line-height: 1;
                    margin-bottom: 0.35rem;
                }

                .label {
                    font-size: 0.68rem;
                    color: var(--color-fg-subtle);
                    letter-spacing: 0.05em;
                }
            }
        }

        .cv-btn {
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #ffffff !important;
            background: transparent !important;
            border-radius: 4px !important;
            transition: all 0.2s ease;

            &:hover {
                border-color: rgba(255, 255, 255, 0.7) !important;
                background: rgba(255, 255, 255, 0.06) !important;
                transform: translateY(-1px);
            }
        }
    }
}
</style>