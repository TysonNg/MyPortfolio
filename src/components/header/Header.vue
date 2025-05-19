<script setup>
import { ref } from 'vue'
</script>

<template>
    <v-container fluid class="header ">
        <v-row class="align-center">
            <v-col cols="5" class="grid-header d-flex justify-start align-start text-h3 text-white">
                TYSON
            </v-col>

            <v-col cols="5" class="grid-menu d-flex justify-end ga-10">
                <router-link to="/home" class="custom-btn">HOME</router-link>
                <router-link to="/about" class="custom-btn">ABOUT ME</router-link>
                <router-link to="/projects" class="custom-btn">PROJECTS</router-link>
                <router-link to="/contact" class="custom-btn">CONTACT</router-link>
            </v-col>

            <v-col cols="2" class="d-flex justify-end ">
                <v-btn rounded="xl" class="talk-btn grid-item d-flex align-center pa-6">Let's
                    talk</v-btn>
            </v-col>
        </v-row>
    </v-container>



</template>

<style lang="scss" scoped>
.header {
    width: 100%;
    max-width: 1320px;
    .grid-menu {
        width: 100%;

        .custom-btn {
            position: relative;
            border: none;
            box-shadow: none;
            color: white;
            font-weight: 600;
            background-color: transparent;
            padding-bottom: 4px;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                width: 0;
                background-color: white;
                transition: width 0.3s ease;
            }

            &.router-link-active::after,
            &.router-link-exact-active::after {
                width: 100%;
            }
        }


    }

    .talk-btn {
        color: white;
        font-weight: 600;
        background-color: #2556c0;
        border: solid 0.1px transparent;
        &:hover {
            background-color: black;
            border-color: white
        }
    }
}
</style>
