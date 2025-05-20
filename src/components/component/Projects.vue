<template>
    <div>
        <ul class="fade-in d-flex flex-row ga-3 mt-10">
            <li :width="392" :height="367" v-for="(project, index) in projects" :key="index"
                class="project-item d-flex flex-column ga-3 rounded-lg shadow-2">
                <img :src="project.image" alt="Project Image" :width="364" :height="350"
                    class="project-image rounded-lg">

                <div class="d-flex justify-between align-center w-100">
                    <div class="d-flex flex-column align-start">
                        <p class="project-title ">{{ project.title }}</p>
                        <p class="project-description">{{ project.description }}</p>
                    </div>
                    <v-spacer />
                    <v-btn color="primary" class="rounded-pill" icon>
                        <v-icon size="20">mdi-arrow-right</v-icon>
                    </v-btn>

                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
interface Project {
    title: string;
    description: string;
    image: string;
}

const projects: Project[] = [
    {
        title: 'Ecomerce Website',
        description: 'Description of project 1',
        image: 'https://janna-react.vercel.app/images/popup-project-2.jpg'
    },
    {
        title: 'MiniSocial Website',
        description: 'Description of project 2',
        image: 'https://janna-react.vercel.app/images/popup-project-2.jpg'
    },
    {
        title: 'Project 3',
        description: 'Description of project 3',
        image: 'https://janna-react.vercel.app/images/popup-project-2.jpg'
    }
]
</script>

<style lang="scss" scoped>

.project-item {
    background-color: white;
    padding: 1rem;
    color: black;

    .project-title{
        font-weight: 600;
        font-size: 1.1rem;
    }
    .project-description{
        font-size: 0.8rem;
        color: #959494;
    }
}

ul {
    list-style: none;
    overflow-x: auto;
}
</style>