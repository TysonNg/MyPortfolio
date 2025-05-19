<script setup>
import { ref } from 'vue'
import BaseBtn from '@/components/buttons/BaseButton.vue'
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '@/assets/animate.json'
</script>

<template>
    <v-container fluid>
        <v-row class="container">
            <v-col cols="6">
                <div class="image-container position-relative">
                    <img id="image" class="w-100 h-auto rounded-lg" src="@/assets/avatar3.jpg" alt="avatar">
                    <div id="animate_1">
                        <Vue3Lottie :animation-data="animationData" :height="300" :width="300" />
                    </div>
                </div>
            </v-col>
            <v-col cols="6" class="about-container d-flex flex-column justify-center text-white ga-5">
                <div class="text-about rounded-lg">ABOUT ME</div>
                <div class="text-title text-h4 w-auto">
                    I AM AVAILABLE FOR <span class="text-span">WEBSITE DEVELOPE</span> PROJECTS
                </div>

                <div class="text-description">
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                    below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by
                    Cicero are also reproduced in their exact original form, accompanied by English versions from the
                    1914 translation by H. Rackham.
                </div>



                <div class="box-container d-flex ga-5">
                    <div class="box-item">
                        <span class="num">280+</span>
                        <span>Google Review</span>
                    </div>
                    <div class="box-item">
                        <span class="num">1+</span>
                        <span>Years Experience</span>
                    </div>
                    <div class="box-item">
                        <span class="num">49+</span>
                        <span>Awward Winning</span>
                    </div>
                </div>

                <div class="mt-10">
                    <BaseBtn />
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