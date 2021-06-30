import { ref } from 'vue'
import { Candle } from '../types/candle'
import Api from '../api'

type ChartableCandles = Candle & { timestamp: number }

export const useCandles = (baseId: string) => {
  const candles = ref<Candle[]>([])
  const chartableCandles = ref<(ChartableCandles[])>([])

  const fetchCandles = async () => {
    const { data } = await Api.candles({ exchange: 'poloniex', interval: 'h1', baseId, quoteId: 'tether' })

    candles.value = data
    chartableCandles.value = chartable(data)
  }

  return {
    candles,
    chartableCandles,
    fetchCandles
  }
}

const chartable = (candles: Candle[]): ChartableCandles[] => {
  return candles.map((candle) => {
    (candle as ChartableCandles).timestamp = candle.period

    return candle as ChartableCandles
  })
}
