<template>
  <div v-if="isLoading" class="ui segment loading">
    <div class="ui active inverted dimmer">
      <div class="ui large text loader">Loading</div>
    </div>
  </div>

  <assets-table v-if="!isLoading" class="table" @sort="sort">
    <asset-row v-for="asset in assets" :key="asset.id" :payload="asset"></asset-row>
  </assets-table>

  <div class="read-more">
    <read-more v-if="!isLoading" @detected="readMoreDetected"></read-more>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AssetsTable from '../components/AssetsTable.vue'
import AssetRow from '../components/AssetRow.vue'
import ReadMore from '../components/ReadMore.vue'
import { useAssets } from '../composables/useAssets'
import { usePriceSocket } from '../composables/usePriceSocket'
import { DEFAULT_LIMIT, LIMIT_STEP } from '../constants'
import { SortingTable } from '../types/misc'
import { CryptoAsset } from '../types/asset'

export default defineComponent({
  name: 'Market',

  components: {
    'assets-table': AssetsTable,
    'asset-row': AssetRow,
    'read-more': ReadMore,
  },

  setup () {
    const limit = ref<number>(DEFAULT_LIMIT)
    const isLoading = ref<boolean>(true)

    const { allAssets, filteredAssets, sort, getIds } = useAssets(limit)
    const { socket, initialSocket } = usePriceSocket(filteredAssets, getIds)

    // once loading
    watch(filteredAssets, () => {
      if (filteredAssets.value.length > 0) {
        isLoading.value = false
      }
    })

    watch(limit, () => {
      filteredAssets.value = allAssets.value.slice(0, limit.value)
    })

    return {
      socket,
      limit,
      isLoading,
      assets: filteredAssets,
      getAssetIds: getIds,
      sortAssets: sort,
      initialSocket
    }
  },

  methods: {
    sort (property: keyof CryptoAsset, order: SortingTable) {
      this.socket.disconnect()
      order = order === 'descending' ? 'desc' : 'asc'

      this.sortAssets(property, order, this.limit)
      // reconnect with news asset ids
      this.initialSocket()
    },

    readMoreDetected () {
      this.limit += LIMIT_STEP
    }
  }
})
</script>

<style scoped>
.loading {
  height: 100%;
}

.table {
  margin-bottom: 50px;
}

.read-more {
  display: flex;
  justify-content: center;
}
</style>
