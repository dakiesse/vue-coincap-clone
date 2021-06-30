<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValueFormatter',

  props: {
    as: {
      type: String,
      required: true
    }
  },

  render () {
    if (this.$props.as === 'price') {
      const price = parseFloat(this.$slots.default()[0].children)
      const fraction = 1 > price ? 8 : 2

      return '$' + price.toFixed(fraction)
    }

    if (this.$props.as === 'price-commarize') {
      const price = parseFloat(this.$slots.default()[0].children)

      return '$' + commarize(price)
    }

    if (this.$props.as === 'percentage') {
      const percentage = parseFloat(this.$slots.default()[0].children)

      return percentage.toFixed(2) + '%'
    }
  }
})

const commarize = (num: number): string => {
  const units = ['m', 'b', 't', 'q']
  const unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
  const r = unit % 3
  const x = Math.abs(Number(num)) / Number('1.0e+' + (unit - r)).toFixed(2)

  return x.toFixed(2) + units[Math.floor(unit / 3) - 2]
}
</script>
