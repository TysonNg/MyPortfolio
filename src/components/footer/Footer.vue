<template>
  <v-footer class="text-center d-flex flex-column ga-3 py-8" color="#08090c">
    <div class="d-flex ga-3 align-center">
      <v-btn
        v-for="item in socialLinks"
        :key="item.icon"
        :icon="item.icon"
        :href="item.url"
        target="_blank"
        tag="a"
        density="comfortable"
        variant="outlined"
        rounded="sm"
        class="footer-social-btn"
        size="small"
        :aria-label="item.label"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="1" width="40" color="rgba(255, 255, 255, 0.15)"></v-divider>

    <div class="footer-copy font-mono">
      © {{ new Date().getFullYear() }} <span class="text-white font-weight-bold">Nguyen Minh Nhat (Tyson)</span>. All rights reserved.
    </div>
  </v-footer>
</template>

<script setup>
const socialLinks = [
  { icon: 'mdi-github', url: 'https://github.com/TysonNg', label: 'GitHub' },
  { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/tysonng', label: 'LinkedIn' },
  { icon: 'mdi-facebook', url: 'https://facebook.com', label: 'Facebook' },
]
</script>

<style lang="scss" scoped>
.v-footer {
  background-color: var(--color-canvas-default) !important;
  color: var(--color-fg-muted);
  font-size: 0.8rem;
  border-top: 1px solid var(--color-border-subtle);

  .footer-social-btn {
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    color: var(--color-fg-muted) !important;
    border-radius: 4px !important;
    transition: all 0.2s ease;

    &:hover {
      color: #ffffff !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
      background: rgba(255, 255, 255, 0.08) !important;
    }
  }

  .footer-copy {
    color: var(--color-fg-subtle);
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }
}
</style>