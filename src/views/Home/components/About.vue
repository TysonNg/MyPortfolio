<script setup>
import BaseBtn from '@/components/buttons/BaseButton.vue'
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@/assets/animate.json'
</script>

<template>
    <v-container  fluid>
        <v-row class="container">
            <v-col cols="6">
                <div class="image-container position-relative">
                    <img id="image" class="w-100 h-auto rounded-lg" src="@/assets/avatar5.jpg" alt="avatar">
                    <div id="animate_1">
                        <Vue3Lottie :animation-data="animationData" :height="300" :width="300" />
                    </div>
                </div>
            </v-col>
            <v-col cols="6" class="about-container fade-in-text d-flex flex-column justify-center text-white ga-5">
                <div class="text-about rounded-lg">ABOUT ME</div>
                <div class="text-title text-h4 w-auto">
                    I AM AVAILABLE FOR <span class="text-span">WEBSITE DEVELOPE</span> PROJECTS
                </div>

                <div class="text-description">
                    I am a web developer with a passion for creating dynamic and responsive websites. I have experience
                    in HTML, CSS, JavaScript, and various frameworks. I am graduated from the University of Information Technology, Vietnam National University HCM. I am always eager to learn new technologies, stay updated with industry trends, and continuously improve my craft. My goal is to create impactful digital experiences and contribute to meaningful products.
                    <span class="d-flex ga-2 mt-1">
                        <strong>My Github:</strong>
                        <a href="https://github.com/TysonNg">https://github.com/TysonNg</a>
                    </span>
                </div>

                <div class="box-container d-flex ga-5">
                    <div class="box-item">
                        <span class="num">3+</span>
                        <span>Projects</span>
                    </div>
                    <div class="box-item">
                        <span class="num">1+</span>
                        <span>Years Experience</span>
                    </div>
                    <div class="box-item">
                        <span class="num">3.0</span>
                        <span>GPA</span>
                    </div>
                </div>

                <div class="mt-10">
                    <BaseBtn content="Get in touch" size="large" url="#"/>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <div id="animate_2">
        <Vue3Lottie :animation-data="animationData" :height="300" :width="400" />
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin: 2rem auto;

    #image {
        border: solid 1.5px rgb(177, 171, 171);
        position: relative;
        z-index: 1;
    }

    .image-container {
        position: relative;
    }

    .about-container {
        text-align: start;

        .text-about {
            width: fit-content;
            background-color: rgb(40, 48, 143);
            padding: 5px 15px;
            letter-spacing: 0.2rem;

        }

        .text-title {
            font-weight: 600;

            .text-span {
                color: #0788ff;
            }
        }

        .text-description {
            font-size: 0.8rem;
            color: #c4c4c4;
            text-align: start;
        }

        .box-container>.box-item {
            display: flex;
            flex-direction: column;
            border: solid 1px #858586;
            border-radius: 1rem;
            padding: 1rem;
            font-size: 0.8rem;
            background-color: #0f273d;

            .num {
                font-weight: 600;
                font-size: 1.2rem;
            }
        }
    }
}

#animate_1 {
    bottom: 0rem;
    left: -10rem;
    position: absolute;
    z-index: 0;
    pointer-events: none;
}

#animate_2 {
    top: 2rem;
    right: -15rem;
    position: absolute;
    z-index: 0;
    pointer-events: none;
}
</style>