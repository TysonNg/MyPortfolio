<!-- components/Lenis.vue -->
<script setup>
import { onMounted, onBeforeUnmount, provide, nextTick } from 'vue'
import Lenis from '@studio-freight/lenis'
import { useRouter } from 'vue-router'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smooth: true,
})

const router = useRouter()

provide('lenis', lenis)

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

onMounted(() => {
  requestAnimationFrame(raf)
  if (router) {
    router.afterEach(async (to) => {
      if (to.hash) {
        await nextTick()
        const el = document.querySelector(to.hash)
        if (el) {
          const elementRect = el.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const elementTop = elementRect.top + scrollTop
          const offset = 80 // offset for fixed header

          lenis.scrollTo(elementTop - offset, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          })
        }
      } else {
        await nextTick()
        lenis.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
      }
    })
  }
})

onBeforeUnmount(() => {
  lenis.destroy()
})
</script>

<template>
  <slot />
</template>