<script setup>
import { ref, onMounted } from 'vue'
import About from '@/views/Home/components/About.vue'
import Projects from '@/views/Home/components/Projects.vue'
import BaseBtn from '@/components/buttons/BaseButton.vue'
import Writer from 't-writer.js'
import Contact from '@/views/Home/components/Contact.vue'
import { Vue3Lottie } from 'vue3-lottie'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import animationData2 from '@/assets/phaohoa.json'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
    const targetsFromBottom = document.querySelectorAll('.fade-in-textBottom');
    const targetsFromLeft = document.querySelectorAll('.fade-in-textLeft');
    const targetsFromRight = document.querySelectorAll('.fade-in-textRight');

    const targetsFadeIn = document.querySelectorAll('.fade-in');
    const targets = document.querySelectorAll('.fade-in-text');
    targetsFadeIn.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 0,
            y: 0,
            duration: 2,
        });
    });
    targetsFromBottom.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 2,
        });
    });
    targets.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                scrub: true,
            },
            opacity: 0,
            y: 100,
            duration: 2,
        });
    });
    targetsFromLeft.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 0,
            x: -50,
            duration: 2,
        });
    });
    targetsFromRight.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
            },
            opacity: 0,
            x: 50,
            duration: 1,
        });
    });
})

const target = ref(null)
onMounted(() => {
    const writer = new Writer(target.value, {
        loop: true,
        typeColor: '#0788ff',
        cursorColor: '#0788ff',
    })

    writer
        .type('WEBSITE DEVELOPER.')
        .rest(1200)
        .clear()
        .start()
})

</script>

<template>
    <section id="home">
        <v-container fluid>
            <v-row>
                <v-col cols="6" class="left-container fade-in-textBottom">
                    <div id="left-item_name" class="left-item text-h7 rounded-lg">
                        NGUYEN MINH NHAT
                    </div>
                    <div id="left-item_title" class="left-item text-h2">
                        HEY! I&apos;M TYSON
                    </div>
                    <div id="left-item_subTitle" class="left-item text-h3">
                        I&apos;M A <span ref="target"></span>
                    </div>

                    <div id="left-item_description" class="left-item text-h7">
                        I am a web developer with a passion for creating beautiful and functional websites. I have
                        experience in HTML, CSS, JavaScript, and various frameworks. I am always eager to learn new
                        technologies and improve my skills.
                    </div>

                    <div class="d-flex ga-5">
                        <BaseBtn content="Get in touch" size="large" url="#" />
                        <div class="d-flex ga-2">
                            <v-btn color="primary" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn class="rounded-circle" size="40" style="background-color: #f26798;" icon>
                                <v-icon size="20">mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn color="primary" class="rounded-circle" href="https://www.linkedin.com/in/tysonng"
                                target="_blank" tag="a" size="40" icon>
                                <v-icon size="20">mdi-linkedin</v-icon>
                            </v-btn>
                            <v-btn class="rounded-circle" href="https://github.com/TysonNg" target="_blank" tag="a"
                                size="40" style="background-color: #f26798;" icon>
                                <v-icon size="20">mdi-github</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6" class="position-relative">
                    <div id="animate1">
                        <Vue3Lottie :animation-data="animationData2" :height="300" :width="300" />
                    </div>
                    <div id="animate2">
                        <Vue3Lottie :animation-data="animationData2" :height="300" :width="300" />
                    </div>
                    <img src="@/assets/avatar.png" alt="avatar" style="position: relative;z-index: 0;">
                
                </v-col>
            </v-row>
        </v-container>
    </section>

    <div class="break">
        <div class="container">
            <span class="fade-in text-h4 text-white"><v-icon icon="mdi-nodejs"></v-icon>NodeJs</span>
            <span class="fade-in text-h4 text-white"><v-icon icon="mdi-react"></v-icon> React</span>
            <span class="fade-in text-h4 text-white"><v-icon icon="mdi-database"></v-icon>SQL</span>
            <span class="fade-in text-h4 text-white"><v-icon icon="mdi-vuejs"></v-icon>Vue</span>
            <span class="fade-in text-h4 text-white"><v-icon icon="mdi-search-web"></v-icon>ElasticSearch</span>
        </div>

    </div>

    <section id="about" class="position-relative ">
        <About />
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
section {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
}

#animate2 {
    position: absolute;
    top: 5rem;
    right: -2rem;
    z-index: 0;
}

#animate1 {
    position: absolute;
    top: 13rem;
    left: -2rem;
    z-index: 0;
}


.left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: start;
    color: white;

    .left-item_btn {
        color: white;
        font-weight: 600;
        background-color: #2556c0;
        border: solid 1px transparent;

        &:hover {
            background-color: black;
            border-color: white
        }
    }

    #left-item_name {
        background-color: rgb(40, 48, 143);
        padding: 5px 15px;
        letter-spacing: 0.2rem;
        font-weight: 600;

    }

    #left-item_title {
        text-wrap-mode: nowrap;
    }

    #left-item_subTitle {
        color: #0788ff;
        text-align: start;
        text-wrap-mode: nowrap;

    }

    #left-item_description {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        text-align: start;
    }


}

.break {
    width: 100%;
    height: 120px;
    background-color: #03294b;
    margin: 2rem auto;

    .container {
        width: 100%;
        height: 100%;
        max-width: 1320px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.projects-section {
    background-color: #03294b;
    max-width: 100%;
}
</style>