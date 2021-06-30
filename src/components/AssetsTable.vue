<template>
  <table class="ui sortable column small table fixed" :class="$props.class">
    <thead>
      <tr>
        <th class="sorted center aligned" :class="setClass('rank')" colspan="1" @click="sort('rank')">Rank</th>
        <th class="sorted" :class="setClass('name')" colspan="2" @click="sort('name')">Name</th>
        <th class="sorted right aligned" :class="setClass('priceUsd')" colspan="1" @click="sort('priceUsd')">Price
        </th>
        <th class="sorted right aligned" :class="setClass('marketCapUsd')" colspan="1" @click="sort('marketCapUsd')">
          Market Cap
        </th>
        <th class="sorted right aligned" :class="setClass('volumeUsd24Hr')" colspan="1"
            @click="sort('volumeUsd24Hr')">
          Volume (24Hr)
        </th>
        <th class="sorted right aligned" :class="setClass('changePercent24Hr')" colspan="1"
            @click="sort('changePercent24Hr')">Change
          (24Hr)
        </th>
      </tr>
    </thead>

    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AssetRow from './AssetRow.vue'
import { CryptoAsset } from '../types/asset'
import { SortingTable } from '../types/misc'

export default defineComponent({
  name: 'AssetsTable',

  emits: ['sort', 'needMore'],

  components: {
    'asset-row': AssetRow
  },

  props: {
    class: {
      type: String,
    }
  },

  data: () => ({
    property: 'rank' as keyof CryptoAsset,
    direction: DEFAULT_SORTING as SortingTable,
  }),

  methods: {
    setClass (property: keyof CryptoAsset): string {
      return this.property === property ? this.direction : ''
    },

    sort (property: keyof CryptoAsset): void {
      if (this.property === property) {
        this.direction = invertSort(this.direction)
      } else {
        this.property = property
        this.direction = DEFAULT_SORTING
      }

      this.$emit('sort', this.property, this.direction)
    }
  }
})

const DEFAULT_SORTING = 'ascending'

const invertSort = (currentSort: SortingTable): SortingTable => {
  return currentSort === 'ascending' ? 'descending' : 'ascending'
}
</script>

<style scoped>
.fixed {
  table-layout: fixed
}
</style>
