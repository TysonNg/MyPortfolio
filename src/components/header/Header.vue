<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const drawer = ref(false);
const activeSection = ref('home');
const lenis = inject('lenis', null);

const navItems = [
    { label: 'HOME', to: '/#home', id: 'home' },
    { label: 'ABOUT ME', to: '/#about', id: 'about' },
    { label: 'EXPERIENCE', to: '/#experience', id: 'experience' },
    { label: 'PROJECTS', to: '/#projects', id: 'projects' },
    { label: 'CONTACT', to: '/#contact', id: 'contact' },
];

const updateScrollAndActive = () => {
    isScrolled.value = window.scrollY > 30;

    // Check if scrolled near bottom of page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        activeSection.value = 'contact';
        return;
    }

    const sectionIds = ['contact', 'projects', 'experience', 'about', 'home'];
    const offset = 180;

    for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= offset) {
                activeSection.value = id;
                return;
            }
        }
    }
    activeSection.value = 'home';
};

watch(() => route.hash, (newHash) => {
    if (newHash) {
        const id = newHash.replace('#', '');
        if (navItems.some(item => item.id === id)) {
            activeSection.value = id;
        }
    }
});

onMounted(() => {
    if (route.hash) {
        const id = route.hash.replace('#', '');
        if (navItems.some(item => item.id === id)) {
            activeSection.value = id;
        }
    }
    updateScrollAndActive();
    window.addEventListener('scroll', updateScrollAndActive, { passive: true });
    if (lenis && lenis.on) {
        lenis.on('scroll', updateScrollAndActive);
    }
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollAndActive);
    if (lenis && lenis.off) {
        lenis.off('scroll', updateScrollAndActive);
    }
});

const closeDrawer = () => {
    drawer.value = false;
};
</script>

<template>
    <v-container fluid class="header-wrapper" :class="{ scrolled: isScrolled }">
        <header class="header">
            <div class="d-flex align-center justify-space-between w-100">
                <!-- Logo -->
                <router-link class="logo-link d-flex align-center ga-2" to="/">
                    <v-avatar size="36" class="logo-avatar">
                        <img style="object-fit: cover; width: 100%; height: 100%;" src="@/assets/avatar.png" alt="Tyson Logo">
                    </v-avatar>
                    <span class="logo-text font-mono">TYSON<span class="cursor-blink">_</span></span>
                </router-link>

                <!-- Desktop Menu -->
                <nav class="desktop-menu d-none d-md-flex align-center ga-8">
                    <router-link
                        v-for="item in navItems"
                        :key="item.to"
                        :to="item.to"
                        class="nav-link"
                        :class="{ active: activeSection === item.id }"
                    >
                        {{ item.label }}
                    </router-link>
                </nav>

                <!-- Desktop CTA -->
                <div class="desktop-actions d-none d-md-flex align-center ga-3">
                    <a href="/cv.pdf" download="Tyson_CV.pdf" target="_blank" class="cv-link">
                        <v-btn variant="outlined" rounded="sm" class="cv-btn text-capitalize px-4" size="small">
                            <v-icon size="16" start>mdi-file-download-outline</v-icon>
                            CV
                        </v-btn>
                    </a>
                    <router-link to="/#contact" class="custom-btn">
                        <v-btn rounded="sm" class="talk-btn text-capitalize px-4" size="small">
                            Let's talk
                        </v-btn>
                    </router-link>
                </div>

                <!-- Mobile Hamburger Button -->
                <div class="mobile-toggle d-flex d-md-none align-center">
                    <v-btn
                        icon
                        variant="text"
                        color="white"
                        size="large"
                        aria-label="Toggle navigation menu"
                        @click="drawer = !drawer"
                    >
                        <v-icon size="28">{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
                    </v-btn>
                </div>
            </div>
        </header>
    </v-container>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        class="mobile-drawer"
        width="300"
    >
        <div class="drawer-content d-flex flex-column h-100 pa-6">
            <div class="d-flex align-center justify-space-between pb-6 border-bottom">
                <div class="d-flex align-center ga-2">
                    <v-avatar size="36" class="logo-avatar" rounded="sm">
                        <img style="object-fit: cover; width: 100%; height: 100%;" src="@/assets/icon.png" alt="Tyson">
                    </v-avatar>
                    <span class="logo-text">TYSON</span>
                </div>
                <v-btn icon variant="text" size="small" color="white" @click="closeDrawer">
                    <v-icon size="24">mdi-close</v-icon>
                </v-btn>
            </div>

            <div class="drawer-links d-flex flex-column ga-5 py-6">
                <router-link
                    v-for="item in navItems"
                    :key="item.to"
                    :to="item.to"
                    class="drawer-link"
                    :class="{ active: activeSection === item.id }"
                    @click="closeDrawer"
                >
                    {{ item.label }}
                </router-link>
            </div>

            <v-divider class="my-3" color="rgba(255,255,255,0.1)"></v-divider>

            <div class="drawer-actions d-flex flex-column ga-3 pt-2">
                <a href="/cv.pdf" download="Tyson_CV.pdf" target="_blank" class="w-100" @click="closeDrawer">
                    <v-btn
                        variant="outlined"
                        rounded="sm"
                        block
                        class="cv-btn text-capitalize"
                    >
                        <v-icon start size="18">mdi-file-download-outline</v-icon>
                        Download CV
                    </v-btn>
                </a>
                <router-link to="/#contact" class="w-100" @click="closeDrawer">
                    <v-btn
                        rounded="sm"
                        block
                        class="talk-btn text-capitalize"
                    >
                        Let's talk
                    </v-btn>
                </router-link>
            </div>

            <div class="mt-auto pt-6 d-flex justify-center ga-3">
                <v-btn
                    href="https://github.com/TysonNg"
                    target="_blank"
                    icon
                    size="small"
                    variant="outlined"
                    rounded="sm"
                    class="monochrome-icon-btn"
                >
                    <v-icon size="18">mdi-github</v-icon>
                </v-btn>
                <v-btn
                    href="https://www.linkedin.com/in/tysonng"
                    target="_blank"
                    icon
                    size="small"
                    variant="outlined"
                    rounded="sm"
                    class="monochrome-icon-btn"
                >
                    <v-icon size="18">mdi-linkedin</v-icon>
                </v-btn>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    background-color: rgba(8, 9, 12, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
    padding: 0.85rem 1.5rem;

    &.scrolled {
        background-color: rgba(8, 9, 12, 0.95);
        border-bottom-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
        padding: 0.65rem 1.5rem;
    }
}

.header {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;

    .logo-link {
        text-decoration: none;
        color: white;

        .logo-avatar {
            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .logo-text {
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.12rem;
            color: #ffffff;

            .cursor-blink {
                display: inline-block;
                color: #ffffff;
                animation: blink 1s step-end infinite;
            }
        }
    }

    .desktop-menu {
        .nav-link {
            text-decoration: none;
            color: rgba(255, 255, 255, 0.65);
            font-size: 0.85rem;
            font-weight: 500;
            letter-spacing: 0.08rem;
            white-space: nowrap;
            position: relative;
            transition: color 0.2s ease;
            padding: 0.25rem 0;

            &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 1.5px;
                background-color: #ffffff;
                transition: width 0.2s ease;
            }

            &:hover {
                color: #ffffff;

                &::after {
                    width: 100%;
                }
            }

            &.active {
                color: #ffffff;
                font-weight: 600;

                &::after {
                    width: 100%;
                    background-color: #60a5fa;
                    box-shadow: 0 0 10px rgba(96, 165, 250, 0.8);
                }
            }
        }
    }

    .cv-btn {
        color: #f4f5f8 !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: 4px !important;
        background: transparent !important;
        font-weight: 500;
        letter-spacing: 0.02em;
        transition: all 0.2s ease;

        &:hover {
            border-color: rgba(255, 255, 255, 0.6) !important;
            background: rgba(255, 255, 255, 0.06) !important;
        }
    }

    .talk-btn {
        color: #08090c !important;
        font-weight: 600 !important;
        background: #ffffff !important;
        border-radius: 4px !important;
        letter-spacing: -0.01em;
        border: 1px solid rgba(255, 255, 255, 0.9) !important;
        transition: all 0.2s ease;

        &:hover {
            background: #e2e8f0 !important;
            box-shadow: 0 2px 12px rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }
    }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.mobile-drawer {
    background: rgba(10, 12, 16, 0.98) !important;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    color: white;

    .logo-text {
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
    }

    .border-bottom {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .drawer-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.08rem;
        padding: 0.5rem 0;
        transition: color 0.2s ease, padding-left 0.2s ease;

        &:hover {
            color: #ffffff;
            padding-left: 0.5rem;
        }

        &.active {
            color: #60a5fa;
            font-weight: 700;
            padding-left: 0.75rem;
            border-left: 2px solid #60a5fa;
        }
    }

    .cv-btn {
        color: #ffffff !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        background: transparent !important;
    }

    .talk-btn {
        color: #08090c !important;
        font-weight: 600;
        background: #ffffff !important;
    }

    .monochrome-icon-btn {
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        color: #ffffff !important;

        &:hover {
            background: rgba(255, 255, 255, 0.1) !important;
        }
    }
}
</style>
