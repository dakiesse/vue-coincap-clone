import { ref } from 'vue'

const cache: Record<string, string> = {}
const fallbackIcon = `https://coincap.io/static/logo_mark.png`

export const useCacheableAssetIcon = async (symbol: string): Promise<string> => {
  const linkRef = ref<string>()

  if (cache[symbol]) {
    return linkRef.value = cache[symbol]
  }

  const link = await new Promise<string>((resolve) => {
    const image = new Image
    image.src = `https://assets.coincap.io/assets/icons/${symbol}@2x.png`

    image.addEventListener('load', () => resolve(image.src))
    image.addEventListener('error', () => resolve(fallbackIcon))
  })

  return linkRef.value = cache[symbol] = link
}
