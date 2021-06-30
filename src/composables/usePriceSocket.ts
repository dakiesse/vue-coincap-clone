import { onMounted, Ref, ref } from 'vue'
import PriceSocket from '../services/price-socket'
import { delay } from '../misc/delay'
import { CryptoAsset } from '../types/asset'

export const usePriceSocket = (assets: Ref<CryptoAsset[]>, getAssetsIds: () => string) => {
  const socket = ref(new PriceSocket)

  const initialSocket = () => {
    socket.value.connect(getAssetsIds())

    socket.value.onMessage((data) => {
      // update only what it has with the delay for each
      assets.value = assets.value.map((asset) => {
        if (data.hasOwnProperty(asset.id) && stackDelayUpdate.canUpdate(asset.id)) {
          asset.priceUsd = Number(data[asset.id])
          stackDelayUpdate.setDelayUpdate(asset.id)
        }

        return asset
      })
    })
  }

  onMounted(async () => {
    await delay(1000)
    initialSocket()
  })

  return { socket,initialSocket }
}

export namespace stackDelayUpdate {
  const stackDelayUpdate: Record<string, boolean> = {}

  export const canUpdate = (assetId: string): boolean => {
    return stackDelayUpdate[assetId] ?? true
  }

  export const setDelayUpdate = (assetId: string): void => {
    stackDelayUpdate[assetId] = false

    delay(3000).then(() => {
      stackDelayUpdate[assetId] = true
    })
  }
}
