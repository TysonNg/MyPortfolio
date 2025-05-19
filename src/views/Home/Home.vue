<script setup>
import { ref, onMounted } from 'vue'
import About from '@/views/Home/components/About.vue'
import Projects from '@/views/Home/components/Projects.vue'
import BaseBtn from '@/components/buttons/BaseButton.vue'
import Writer from 't-writer.js'
import Contact from '@/views/Home/components/Contact.vue'

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
    <section>
        <v-container fluid>
            <v-row>
                <v-col cols="6" class="left-container">
                    <div id="left-item_name" class="left-item text-h7 rounded-lg">
                        NGUYEN MINH NHAT
                    </div>
                    <div id="left-item_title" class="left-item text-h2">
                        HEY! I&apos;M TYSON
                    </div>
                    <div id="left-item_subTitle" class="left-item text-h3">
                        I&apos;M A <span  ref="target"></span>
                    </div>

                    <div id="left-item_description" class="left-item text-h7">
                        I am a web developer with a passion for creating beautiful and functional websites. I have
                        experience in HTML, CSS, JavaScript, and various frameworks. I am always eager to learn new
                        technologies and improve my skills.
                    </div>

                    <div class="d-flex ga-5">
                        <BaseBtn />
                        <div class="d-flex ga-2">
                            <v-btn color="primary" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn  class="rounded-circle" size="40" style="background-color: #f26798;" icon>
                                <v-icon size="20">mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn color="primary" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-linkedin</v-icon>
                            </v-btn>
                            <v-btn class="rounded-circle" size="40" style="background-color: #f26798;" icon>
                                <v-icon size="20">mdi-github</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6">
                    <img src="@/assets/avatar.jpg" alt="avatar">
                </v-col>
            </v-row>
        </v-container>
    </section>

    <div class="break d-flex justify-center align-center">
        <span class="text-h4 text-white">More About Me</span>
    </div>

    <section class="position-relative">
        <About />
    </section>

    <div class="projects-section position-relative">
        <section>
            <Projects />
        </section>
    </div>

    <section>
        <Contact />
    </section>

</template>

<style lang="scss" scoped>
section {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
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
}

.projects-section {
    background-color: #03294b;
    max-width: 100%;
}
</style>