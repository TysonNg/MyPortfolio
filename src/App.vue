<script setup>
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
import Lenis from '@/lib/lenis/Lenis.vue'
</script>

<template>
  <v-app>
    <Lenis>
      <div class="layout">
        <Header />
        <main class="main">
          <router-view />
        </main>
        <Footer />
      </div>

    </Lenis>

  </v-app>
</template>

<style lang="scss">
#app {
  .v-application {
    background-color: #051932;

    .layout{
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .main{
      flex: 1;
    }
  }


}
</style>
