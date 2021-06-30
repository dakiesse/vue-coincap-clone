<template>
  <button :ref="(node) => buttonRef = node">read more</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ReadMore',

  emits: ['detected'],

  setup (props, { emit }) {
    const buttonRef = ref<HTMLTableElement>()

    onMounted(() => {
      const options = { threshold: 0 }
      const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              emit('detected')
            }
          },
          options
      )

      observer.observe(buttonRef.value)
    })

    return { buttonRef }
  },
})
</script>
