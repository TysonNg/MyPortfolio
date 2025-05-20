<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})

</script>

<template>
    <v-container fluid :class="{ scrolled: isScrolled }">
        <header class="header">
            <v-row class="align-center">

                <v-col cols="5" style="width: fit-content;"
                    class="grid-header d-flex justify-start align-start text-h3 text-white">
                    <router-link to="/" style="color: white;cursor: pointer;">
                        TYSON
                    </router-link>
                </v-col>

                <v-col cols="5" class="grid-menu d-flex justify-end ga-10">
                    <router-link to="#home" class="custom-btn">HOME</router-link>
                    <router-link to="#about" class="custom-btn">ABOUT ME</router-link>
                    <router-link to="#projects" class="custom-btn">PROJECTS</router-link>
                    <router-link to="#contact" class="custom-btn">CONTACT</router-link>
                </v-col>

                <v-col cols="2" class="d-flex justify-end ">
                    <router-link to="#contact" class="custom-btn">
                        <v-btn rounded="xl" class="talk-btn grid-item d-flex align-center pa-6">Let's
                            talk</v-btn>
                    </router-link>


                </v-col>
            </v-row>
        </header>

    </v-container>



</template>

<style lang="scss" scoped>
.v-container {
    background-color: transparent;
    position: sticky;
    z-index: 2;
    top: 0;
    transition: background-color 0.3s ease;

    &.scrolled {
        background-color: rgb(19, 16, 16);
        transition: background-color 0.3s ease;
    }
}

.header {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;

    .grid-menu {
        width: 100%;

        .custom-btn {
            text-decoration: none;
            border-bottom: none;
            color: white;

            &:hover {
                color: #2556c0;
                border-bottom: solid 1px #2556c0;
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
