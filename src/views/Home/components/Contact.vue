<script setup lang="ts">
import { ref } from 'vue'
import ContactForm from '@/components/forms/ContactForm.vue'

const copiedField = ref<string | null>(null)

const copyToClipboard = async (text: string, field: string) => {
    try {
        await navigator.clipboard.writeText(text)
        copiedField.value = field
        setTimeout(() => {
            copiedField.value = null
        }, 2000)
    } catch (e) {
        console.error('Failed to copy:', e)
    }
}
</script>

<template>
    <v-container fluid class="contact-section px-4 px-md-12">
        <div class="d-flex flex-column align-start">
            <div class="contact-card w-100 rounded-sm overflow-hidden">
                <!-- Header Banner -->
                <div class="card-header pa-6 pa-md-8">
                    <h2 class="sub-title">Let's Connect &amp; Collaborate</h2>
                    <p class="sub-desc mt-2">
                        Open for full-time engineering roles, high-impact freelance projects, and tech collaborations.<br />
                        Drop a message or reach out via direct channels.
                    </p>
                </div>

                <!-- Main Content Body -->
                <v-row no-gutters class="card-body">
                    <!-- Left Contact Info & Avatar -->
                    <v-col cols="12" md="5" class="info-column pa-6 pa-md-8 d-flex flex-column justify-space-between">
                        <div class="avatar-box mb-6 d-flex align-center ga-4">
                            <img src="@/assets/avatar4.jpg" class="contact-avatar rounded-sm" alt="Tyson Contact">
                            <div>
                                <h3 class="name-text">Nguyen Minh Nhat</h3>
                                <span class="role-text font-mono">Full-Stack Engineer</span>
                            </div>
                        </div>

                        <div class="contact-details d-flex flex-column ga-5">
                            <div class="detail-item">
                                <div class="d-flex align-center justify-space-between">
                                    <span class="detail-label font-mono">DIRECT EMAIL</span>
                                    <span v-if="copiedField === 'email'" class="copied-badge font-mono">Copied!</span>
                                </div>
                                <div class="d-flex align-center justify-space-between mt-1">
                                    <a href="mailto:nhatnguyenminh1507@gmail.com" class="detail-val">nhatnguyenminh1507@gmail.com</a>
                                    <v-btn
                                        icon
                                        size="small"
                                        variant="text"
                                        class="copy-btn rounded-sm"
                                        aria-label="Copy email"
                                        @click="copyToClipboard('nhatnguyenminh1507@gmail.com', 'email')"
                                    >
                                        <v-icon size="16">{{ copiedField === 'email' ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                                    </v-btn>
                                </div>
                            </div>

                            <div class="detail-item">
                                <div class="d-flex align-center justify-space-between">
                                    <span class="detail-label font-mono">PHONE / ZALO</span>
                                    <span v-if="copiedField === 'phone'" class="copied-badge font-mono">Copied!</span>
                                </div>
                                <div class="d-flex align-center justify-space-between mt-1">
                                    <a href="tel:+84917788048" class="detail-val">+84 917 788 048</a>
                                    <v-btn
                                        icon
                                        size="small"
                                        variant="text"
                                        class="copy-btn rounded-sm"
                                        aria-label="Copy phone"
                                        @click="copyToClipboard('+84917788048', 'phone')"
                                    >
                                        <v-icon size="16">{{ copiedField === 'phone' ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            
                            <!-- Social Links (Monochrome) -->
                            <div class="social-links pt-3 d-flex align-center ga-3">
                                <v-btn
                                    class="social-btn rounded-sm"
                                    size="38"
                                    icon
                                    variant="outlined"
                                    href="https://github.com/TysonNg"
                                    target="_blank"
                                    tag="a"
                                    aria-label="GitHub"
                                >
                                    <v-icon size="18">mdi-github</v-icon>
                                </v-btn>
                                <v-btn
                                    class="social-btn rounded-sm"
                                    size="38"
                                    icon
                                    variant="outlined"
                                    href="https://www.linkedin.com/in/tysonng"
                                    target="_blank"
                                    tag="a"
                                    aria-label="LinkedIn"
                                >
                                    <v-icon size="18">mdi-linkedin</v-icon>
                                </v-btn>
                                <v-btn
                                    class="social-btn rounded-sm"
                                    size="38"
                                    icon
                                    variant="outlined"
                                    href="https://facebook.com"
                                    target="_blank"
                                    tag="a"
                                    aria-label="Facebook"
                                >
                                    <v-icon size="18">mdi-facebook</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>

                    <!-- Right Form -->
                    <v-col cols="12" md="7" class="form-column">
                        <ContactForm />
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.contact-section {
    max-width: 1320px;
    margin: 2rem auto;
}

.contact-card {
    border: 1px solid var(--color-border-default);
    background-color: var(--color-surface-card);
    border-radius: 6px;
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);

    .card-header {
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid var(--color-border-subtle);
        text-align: left;

        .sub-title {
            font-size: clamp(1.4rem, 3.5vw, 2.2rem);
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
        }

        .sub-desc {
            color: var(--color-fg-muted);
            font-size: 0.92rem;
            line-height: 1.6;
        }
    }

    .card-body {
        .info-column {
            border-bottom: 1px solid var(--color-border-subtle);
            text-align: left;

            @media (min-width: 960px) {
                border-bottom: none;
                border-right: 1px solid var(--color-border-subtle);
            }

            .avatar-box {
                .contact-avatar {
                    width: 68px;
                    height: 68px;
                    object-fit: cover;
                    border: 1px solid var(--color-border-default);
                    border-radius: 4px;
                }

                .name-text {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .role-text {
                    font-size: 0.8rem;
                    color: var(--color-fg-muted);
                }
            }

            .contact-details {
                .detail-item {
                    border-bottom: 1px solid var(--color-border-subtle);
                    padding-bottom: 0.75rem;

                    .detail-label {
                        font-size: 0.7rem;
                        letter-spacing: 0.08em;
                        color: var(--color-fg-subtle);
                        font-weight: 600;
                    }

                    .copied-badge {
                        font-size: 0.7rem;
                        color: #4ade80;
                        background: rgba(34, 197, 94, 0.1);
                        border: 1px solid rgba(34, 197, 94, 0.3);
                        padding: 1px 6px;
                        border-radius: 4px;
                    }

                    .detail-val {
                        color: #ffffff;
                        font-size: 0.95rem;
                        font-weight: 500;
                        text-decoration: none;
                        word-break: break-all;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .copy-btn {
                        color: var(--color-fg-subtle);

                        &:hover {
                            color: #ffffff;
                            background: rgba(255, 255, 255, 0.08);
                        }
                    }
                }

                .social-btn {
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                    color: rgba(255, 255, 255, 0.7) !important;
                    background: transparent !important;
                    border-radius: 4px !important;
                    transition: all 0.2s ease;

                    &:hover {
                        color: #ffffff !important;
                        border-color: rgba(255, 255, 255, 0.6) !important;
                        background: rgba(255, 255, 255, 0.08) !important;
                        transform: translateY(-2px);
                    }
                }
            }
        }

        .form-column {
            background-color: var(--color-surface-card);
            display: flex;
            align-items: center;
        }
    }
}
</style>