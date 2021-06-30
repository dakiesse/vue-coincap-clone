<template>
  <div class="container" :ref="(node) => containerRef = node"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { dispose, init } from 'klinecharts'

export default defineComponent({
  name: 'Chart',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const containerRef = ref<HTMLDivElement>()

    onMounted(() => {
      const chart = init(containerRef.value)

      chart.applyNewData(props.data)
    })

    onUnmounted(() => {
      dispose(containerRef.value)
    })

    return {
      containerRef
    }
  }
})
</script>

<style scoped>
.container {
  height: 400px;
}
</style>
