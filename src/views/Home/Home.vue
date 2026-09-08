<script setup>
import { onMounted } from 'vue'
import About from '@/views/Home/components/About.vue'
import Experience from '@/views/Home/components/Experience.vue'
import Projects from '@/views/Home/components/Projects.vue'
import BaseBtn from '@/components/buttons/BaseButton.vue'
import Contact from '@/views/Home/components/Contact.vue'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
    const targetsFromBottom = document.querySelectorAll('.fade-in-textBottom');
    const targetsFadeIn = document.querySelectorAll('.fade-in');

    targetsFadeIn.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            },
            opacity: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
        });
    });

    targetsFromBottom.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
        });
    });
})
</script>

<template>
    <section id="home" class="hero-section">
        <v-container fluid class="px-4 px-md-12 py-8 py-md-14">
            <v-row align="center" justify="center">
                <!-- Left Content -->
                <v-col cols="12" md="6" class="left-container fade-in-textBottom">
                    <!-- Status Badge -->
                    <div class="status-badge d-inline-flex align-center ga-2 px-3 py-1 rounded-sm">
                        <span class="status-dot"></span>
                        <span class="status-text font-mono">AVAILABLE FOR OPPORTUNITIES</span>
                    </div>

                    <!-- Main Name & Title -->
                    <h1 class="hero-title">
                        NGUYEN MINH NHAT
                    </h1>
                    <div class="hero-role font-mono">
                        &gt; Full-Stack Engineer
                    </div>

                    <!-- Authentic Elevator Pitch -->
                    <p class="hero-description">
                        Hi, I'm Tyson. I craft robust, scalable web applications with clean architecture and polished user interfaces. Specializing in Vue 3, TypeScript, Node.js, and modern distributed web systems.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="hero-actions d-flex flex-wrap align-center ga-4 pt-3">
                        <BaseBtn content="Get in touch" size="large" url="/#contact" />
                        <a href="/cv.pdf" download="Tyson_CV.pdf" target="_blank" class="text-decoration-none">
                            <v-btn
                                variant="outlined"
                                size="large"
                                class="cv-hero-btn rounded-sm text-capitalize font-weight-bold"
                            >
                                <v-icon start size="18">mdi-file-download-outline</v-icon>
                                Download CV
                            </v-btn>
                        </a>
                    </div>

                    <!-- Social Links (Monochrome Sharp) -->
                    <div class="d-flex align-center ga-3 pt-4">
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
                </v-col>

                <!-- Right Column: Developer Code Card / macOS Terminal -->
                <v-col cols="12" md="6" class="terminal-col position-relative d-flex justify-center align-center mt-8 mt-md-0">
                    <div class="terminal-window w-100">
                        <!-- Terminal Bar -->
                        <div class="terminal-header d-flex align-center justify-space-between px-4 py-3">
                            <div class="terminal-dots d-flex align-center ga-2">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                            </div>
                            <div class="terminal-tab font-mono d-flex align-center ga-2">
                                <v-icon size="15" color="#94a3b8">mdi-code-braces</v-icon>
                                <span>tyson.config.ts</span>
                            </div>
                            <div class="terminal-meta font-mono text-caption text-disabled d-none d-sm-flex align-center ga-1">
                                <span>TS 5.4</span>
                            </div>
                        </div>

                        <!-- Code Body -->
                        <div class="terminal-body font-mono">
                            <div class="code-line"><span class="line-num">1</span><span class="syn-comment">// Personal Developer Config</span></div>
                            <div class="code-line"><span class="line-num">2</span><span class="syn-keyword">import</span> { <span class="syn-type">SoftwareEngineer</span> } <span class="syn-keyword">from</span> <span class="syn-string">'@tyson/core'</span>;</div>
                            <div class="code-line"><span class="line-num">3</span></div>
                            <div class="code-line"><span class="line-num">4</span><span class="syn-keyword">export const</span> <span class="syn-var">tyson</span>: <span class="syn-type">SoftwareEngineer</span> = {</div>
                            <div class="code-line"><span class="line-num">5</span>  <span class="syn-prop">name</span>: <span class="syn-string">"Nguyen Minh Nhat"</span>,</div>
                            <div class="code-line"><span class="line-num">6</span>  <span class="syn-prop">alias</span>: <span class="syn-string">"Tyson"</span>,</div>
                            <div class="code-line"><span class="line-num">7</span>  <span class="syn-prop">role</span>: <span class="syn-string">"Full-Stack Engineer"</span>,</div>
                            <div class="code-line"><span class="line-num">8</span>  <span class="syn-prop">location</span>: <span class="syn-string">"Ho Chi Minh City, Vietnam"</span>,</div>
                            <div class="code-line"><span class="line-num">9</span>  <span class="syn-prop">coreStack</span>: [</div>
                            <div class="code-line"><span class="line-num">10</span>    <span class="syn-string">"Vue 3"</span>, <span class="syn-string">"TypeScript"</span>, <span class="syn-string">"Node.js"</span>,</div>
                            <div class="code-line"><span class="line-num">11</span>    <span class="syn-string">"PostgreSQL"</span>, <span class="syn-string">"Docker"</span></div>
                            <div class="code-line"><span class="line-num">12</span>  ],</div>
                            <div class="code-line"><span class="line-num">13</span>  <span class="syn-prop">status</span>: <span class="syn-string">"Available for opportunities"</span>,</div>
                            <div class="code-line"><span class="line-num">14</span>  <span class="syn-prop">passion</span>: <span class="syn-string">"Clean code, high-performance web"</span></div>
                            <div class="code-line"><span class="line-num">15</span>};</div>
                        </div>

                        <!-- Terminal Footer -->
                        <div class="terminal-footer d-flex align-center justify-space-between px-4 py-3">
                            <div class="d-flex align-center ga-3">
                                <v-avatar size="30" class="terminal-avatar" rounded="sm">
                                    <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/avatar.png" alt="Tyson">
                                </v-avatar>
                                <div class="d-flex flex-column">
                                    <span class="terminal-user font-mono">tyson@devbox: ~</span>
                                    <span class="terminal-branch font-mono text-caption">git:(<span class="text-white">main</span>)</span>
                                </div>
                            </div>
                            <div class="terminal-tag font-mono">
                                <span>ONLINE</span>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>

    <!-- Infinite Marquee Tech Stack (Clean Monochrome) -->
    <div class="marquee-wrapper">
        <div class="marquee-track">
            <div class="marquee-content">
                <span class="tech-item"><v-icon icon="mdi-nodejs"></v-icon> NodeJs</span>
                <span class="tech-item"><v-icon icon="mdi-react"></v-icon> React</span>
                <span class="tech-item"><v-icon icon="mdi-database"></v-icon> PostgreSQL</span>
                <span class="tech-item"><v-icon icon="mdi-vuejs"></v-icon> Vue.js</span>
                <span class="tech-item"><v-icon icon="mdi-search-web"></v-icon> ElasticSearch</span>
                <span class="tech-item"><v-icon icon="mdi-language-typescript"></v-icon> TypeScript</span>
                <span class="tech-item"><v-icon icon="mdi-docker"></v-icon> Docker</span>
                <span class="tech-item"><v-icon icon="mdi-git"></v-icon> Git</span>
            </div>
            <!-- Duplicate for seamless loop -->
            <div class="marquee-content" aria-hidden="true">
                <span class="tech-item"><v-icon icon="mdi-nodejs"></v-icon> NodeJs</span>
                <span class="tech-item"><v-icon icon="mdi-react"></v-icon> React</span>
                <span class="tech-item"><v-icon icon="mdi-database"></v-icon> PostgreSQL</span>
                <span class="tech-item"><v-icon icon="mdi-vuejs"></v-icon> Vue.js</span>
                <span class="tech-item"><v-icon icon="mdi-search-web"></v-icon> ElasticSearch</span>
                <span class="tech-item"><v-icon icon="mdi-language-typescript"></v-icon> TypeScript</span>
                <span class="tech-item"><v-icon icon="mdi-docker"></v-icon> Docker</span>
                <span class="tech-item"><v-icon icon="mdi-git"></v-icon> Git</span>
            </div>
        </div>
    </div>

    <section id="about" class="position-relative">
        <About />
    </section>

    <section id="experience" class="position-relative">
        <Experience />
    </section>

    <div id="projects" class="projects-section position-relative">
        <section class="py-10">
            <Projects />
        </section>
    </div>

    <section id="contact" class="py-10">
        <Contact />
    </section>
</template>

<style lang="scss" scoped>
.hero-section {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    overflow: hidden;
}

section {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
}

.left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.85rem;
    align-items: flex-start;
    color: var(--color-fg-default);

    .status-badge {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: var(--color-fg-muted);
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        border-radius: 4px;

        .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: var(--color-status-live);
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
            display: inline-block;
            animation: pulse-dot 2s infinite ease-in-out;
        }
    }

    .hero-title {
        font-size: clamp(2.4rem, 5.5vw, 4rem);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.03em;
        margin: 0.2rem 0;
        color: #ffffff;
        text-align: left;
    }

    .hero-role {
        font-size: clamp(1.1rem, 2.5vw, 1.45rem);
        font-weight: 500;
        color: var(--color-fg-muted);
        letter-spacing: -0.01em;
        text-align: left;
    }

    .hero-description {
        font-size: clamp(0.95rem, 1.7vw, 1.08rem);
        line-height: 1.65;
        color: var(--color-fg-muted);
        margin: 0.4rem 0;
        text-align: left;
        max-width: 540px;
    }

    .hero-actions {
        width: 100%;

        .cv-hero-btn {
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #ffffff !important;
            background: transparent !important;
            border-radius: 4px !important;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

            &:hover {
                border-color: rgba(255, 255, 255, 0.7) !important;
                background: rgba(255, 255, 255, 0.06) !important;
                transform: translateY(-1px);
            }
        }
    }

    .social-btn {
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        color: rgba(255, 255, 255, 0.7) !important;
        background: transparent !important;
        border-radius: 4px !important;
        transition: all 0.2s ease;

        &:hover {
            color: #ffffff !important;
            border-color: rgba(255, 255, 255, 0.5) !important;
            background: rgba(255, 255, 255, 0.08) !important;
            transform: translateY(-2px);
        }
    }
}

@keyframes pulse-dot {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.4;
        transform: scale(0.85);
    }
}

/* Developer Code Card / macOS Terminal */
.terminal-col {
    .terminal-window {
        max-width: 520px;
        background: #0d1117;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        transition: border-color 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.75);
        }
    }

    .terminal-header {
        background: #161b22;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);

        .terminal-dots {
            .dot {
                width: 11px;
                height: 11px;
                border-radius: 50%;

                &.red { background: #ff5f56; }
                &.yellow { background: #ffbd2e; }
                &.green { background: #27c93f; }
            }
        }

        .terminal-tab {
            font-size: 0.8rem;
            color: #c9d1d9;
            letter-spacing: 0.02em;
        }

        .terminal-meta {
            font-size: 0.72rem;
            color: #6e7681;
        }
    }

    .terminal-body {
        padding: 1.2rem 1.4rem;
        font-size: 0.84rem;
        line-height: 1.7;
        color: #c9d1d9;
        background: #0d1117;
        overflow-x: auto;

        .code-line {
            white-space: pre;

            .line-num {
                display: inline-block;
                width: 2.2rem;
                flex-shrink: 0;
                color: #484f58;
                user-select: none;
                text-align: right;
                padding-right: 0.9rem;
            }
        }

        .syn-keyword { color: #ff7b72; }
        .syn-type { color: #79c0ff; }
        .syn-string { color: #a5d6ff; }
        .syn-prop { color: #d2a8ff; }
        .syn-var { color: #ffa657; }
        .syn-comment { color: #8b949e; font-style: italic; }
    }

    .terminal-footer {
        background: #161b22;
        border-top: 1px solid rgba(255, 255, 255, 0.08);

        .terminal-avatar {
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 4px;
        }

        .terminal-user {
            font-size: 0.75rem;
            color: #c9d1d9;
        }

        .terminal-branch {
            font-size: 0.68rem;
            color: #8b949e;
        }

        .terminal-tag {
            font-size: 0.68rem;
            padding: 3px 8px;
            border-radius: 4px;
            background: rgba(34, 197, 94, 0.12);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #4ade80;
            letter-spacing: 0.05em;
        }
    }
}

/* Infinite Marquee (Clean Monochrome) */
.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    background: var(--color-canvas-subtle);
    border-top: 1px solid var(--color-border-subtle);
    border-bottom: 1px solid var(--color-border-subtle);
    padding: 1.25rem 0;
    margin: 2.5rem 0 3.5rem 0;
    user-select: none;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee-track {
    display: flex;
    width: fit-content;
    animation: marquee 28s linear infinite;

    &:hover {
        animation-play-state: paused;
    }
}

.marquee-content {
    display: flex;
    align-items: center;
    gap: 3.5rem;
    padding-right: 3.5rem;
    flex-shrink: 0;

    .tech-item {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-size: 0.95rem;
        font-family: var(--font-mono);
        color: var(--color-fg-muted);
        white-space: nowrap;
        transition: color 0.2s ease, opacity 0.2s ease;

        .v-icon {
            font-size: 18px;
            color: var(--color-fg-subtle);
            transition: color 0.2s ease;
        }

        &:hover {
            color: #ffffff;

            .v-icon {
                color: #ffffff;
            }
        }
    }
}

@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.projects-section {
    background-color: var(--color-canvas-subtle);
    border-top: 1px solid var(--color-border-subtle);
    border-bottom: 1px solid var(--color-border-subtle);
    max-width: 100%;
}
</style>