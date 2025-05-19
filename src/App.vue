<script setup>
import Header from '@/components/header/Header.vue'
// import Footer from '@/components/footer/Footer.vue'
</script>

<template>
  <v-app>
    <Header />
    <router-view />
    <!-- <Footer /> -->
  </v-app>
</template>

<style lang="scss">
#app {
  .v-application {
    background-color: #051932;
  }
}
</style>
