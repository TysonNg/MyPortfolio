<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#051932">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Tyson</strong>
    </div>
  </v-footer>
</template>
<script setup>
  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]
</script>

<style lang="scss" scoped>
  .v-footer {
    background-color: #051932;
    color: white;
    font-size: 0.8rem;
    letter-spacing: 0.2rem;
  }
</style>