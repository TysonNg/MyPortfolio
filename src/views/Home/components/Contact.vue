<script setup lang="ts">
import ContactForm from '@/components/forms/ContactForm.vue'
</script>

<template>
    <v-container fluid class="text-white">
        <div class="d-flex flex-column align-start ga-3">
            <span class="text-title fade-in-textLeft text-h4 mb-10" style="font-weight: 600;">CONTACT ME</span>
            <div class="container d-flex flex-column w-100  position-relative">
                <div class="pt-10" style="background-color: #6168ae29">
                    <v-row>
                        <v-col cols="4"></v-col>
                        <v-col cols="8">
                            <div class="top-container fade-in-textRight d-flex flex-column ga-3">
                                <span class="text-subTitle text-h4" style="font-weight: 600;">Let's Connect With Me</span>
                                <span class="text-subTitle">Always available for freelancing if the right project comes
                                    along,
                                    <br />
                                    Feel
                                    free to contact me.</span>
                            </div>
                        </v-col>
                    </v-row>
                </div>


                <div class=" d-flex pl-10 pb-10" style="background-color: #002f5a;">
                    <div class="contact-container fade-in-textBottom  d-flex flex-column justify-end ga-3" style="text-align: start;">
                        <div>
                            <p class="title">AN E-MAIL</p>
                            <p class="body">nhatnguyenminh1507@gmail.com</p>
                        </div>
                        <div>
                            <p class="title">PHONE NUMBER</p>
                            <p class="body">+84 917788048</p>
                        </div>
                        <div class="d-flex ga-2">
                            <v-btn color="primary" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn style="background-color: #f26798;" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn color="primary" href="https://www.linkedin.com/in/tysonng" target="_blank" tag="a" class="rounded-circle" size="40" icon>
                                <v-icon size="20">mdi-linkedin</v-icon>
                            </v-btn>
                            <v-btn class="rounded-circle" href="https://github.com/TysonNg" target="_blank" tag="a" size="40" style="background-color: #f26798;" icon>
                                <v-icon size="20">mdi-github</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <ContactForm />
                </div>

                <div class="position-absolute" style="top:4rem; left: 1rem;">
                    <img src="@/assets/avatar4.jpg" class="rounded-xl" :height="400" alt="avatar">
                </div>
            </div>
        </div>

    </v-container>
</template>

<style lang="scss" scoped>
.v-container{
    margin:2rem auto;
}
.container {
    border: solid 1px #002f5a;;

    .top-container {
        text-align: start;
        padding: 2rem;
    }

    .contact-container {
        .title {
            letter-spacing: 0.2rem;
            font-size: 0.8rem;
            color: #e0e0e0;
        }

        .body {
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
        }
    }

}
</style>