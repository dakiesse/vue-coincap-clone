import { onMounted, Ref, ref, watch } from 'vue'
import _orderBy from 'lodash-es/orderBy'
import { CryptoAsset } from '../types/asset'
import Api from '../api'

export const useAssets = (limit: Ref<number>) => {
  const allAssets = ref<CryptoAsset[]>([])
  const filteredAssets = ref<CryptoAsset[]>([])

  watch(allAssets, (ref) => {
    filteredAssets.value = ref.slice(0, limit.value)
  })

  // APIs
  const fetchAssets = async () => {
    const { data } = await Api.assets({ limit: 2000 })

    allAssets.value = normalizeModels(data)
  }

  const sort = (key: keyof CryptoAsset, order: 'asc' | 'desc', limit: number): void => {
    allAssets.value = _orderBy(allAssets.value, [key], [order]).slice(0, limit)
  }

  const getIds = () => {
    return filteredAssets.value.map(({ id }) => id).join(',')
  }

  // lifecycle hooks
  onMounted(() => {
    fetchAssets()

    // maybe someday later
    // setInterval(fetchAssets, 10000)
  })

  return {
    allAssets,
    filteredAssets,
    fetchAssets,
    sort,
    getIds,
  }
}

export const normalizeModels = (models: CryptoAsset[]): CryptoAsset[] => {
  return models.map((model) => {
    const properties = ['rank', 'priceUsd', 'marketCapUsd', 'volumeUsd24Hr', 'changePercent24Hr'] as const

    for (const key of properties) {
      model[key] = Number(model[key])
    }

    return model
  })
}
