<template>
  <tr class="container bold" :class="highlightClass" @click="isCollapsed = !isCollapsed">
    <td class="center aligned">{{ payload.rank }}</td>

    <td colspan="2">
      <div class="info">
        <img v-if="iconLink" v-bind:src="iconLink" v-bind:alt="payload.name" width="30" height="30">

        <div>
          <div>{{ payload.name }}</div>
          <div>{{ payload.symbol.toUpperCase() }}</div>
        </div>
      </div>
    </td>

    <td class="right aligned">
      <value-formatter as="price">{{ payload.priceUsd }}</value-formatter>
    </td>

    <td class="right aligned">
      <value-formatter as="price-commarize">{{ payload.marketCapUsd }}</value-formatter>
    </td>

    <td class="right aligned">
      <value-formatter as="price-commarize">{{ payload.volumeUsd24Hr }}</value-formatter>
    </td>

    <td class="right aligned" :class="0 > payload.changePercent24Hr ? 'red' : 'green'">
      <value-formatter as="percentage">{{ payload.changePercent24Hr }}</value-formatter>
    </td>
  </tr>

  <tr v-if="isCollapsed">
    <td colspan="7">
      <div v-if="isChartLoading" class="ui segment loading">
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">Loading</div>
        </div>
      </div>

      <chart v-else :data="chartableCandles"></chart>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, PropType, ref, watch } from 'vue'
import Chart from './Chart.vue'
import { useCacheableAssetIcon } from '../composables/useCacheableAssetIcon'
import { useCandles } from '../composables/useCandles'
import { CryptoAsset } from '../types/asset'

export default defineComponent({
  name: 'AssetRow',

  components: {
    'chart': Chart
  },

  props: {
    payload: {
      type: Object as PropType<CryptoAsset>
    }
  },

  setup (props) {
    const highlightClass = ref<string>('')
    const iconLink = ref<string>('')
    const isCollapsed = ref<boolean>(false)
    const isChartLoading = ref<boolean>(false)

    const { chartableCandles, fetchCandles } = useCandles(props.payload.id)

    // fetch icon
    onMounted(async () => {
      iconLink.value = await useCacheableAssetIcon(props.payload.symbol.toLowerCase())
    })

    // reset highlight
    onUpdated(() => {
      if (highlightClass.value) {
        setTimeout(() => highlightClass.value = '', 1500)
      }
    })

    // set highlight when price is updated
    watch(() => props.payload.priceUsd, (nextPrice, prevPrice) => {
      highlightClass.value = prevPrice > nextPrice ? 'negative' : 'positive'
    })

    watch(isCollapsed, async (ref) => {
      if (ref) {
        isChartLoading.value = true
        await fetchCandles()
        isChartLoading.value = false
      }
    })

    return {
      highlightClass,
      iconLink,
      isCollapsed,
      isChartLoading,

      chartableCandles,
      fetchCandles
    }
  }
})
</script>

<style scoped>
.container {
  cursor: pointer;
}

.loading {
  height: 375px;
}

.info {
  display: flex;
  align-items: center;
}

.info > img {
  margin-right: 20px;
}

.green {
  color: #2c662d;
}

.red {
  color: #9f3a38;
}
</style>
