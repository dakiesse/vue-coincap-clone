export interface UniversalBody<T> {
  data: T
  timestamp: string
}

export interface AssetsQuery {
  // search by asset id (bitcoin) or symbol (BTC)
  search?: string
  // query with multiple ids=bitcoin,ethereum,monero
  ids?: string,
  // max limit of 2000
  limit?: number
  offset?: number
}

export interface CandlesQuery {
  // exchange id | for example: poloniex
  exchange: string
  // candle interval
  interval: 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h2' | 'h4' | 'h8' | 'h12' | 'd1' | 'w1'
  // for example: ethereum
  baseId: string
  // for example: bitcoin
  quoteId: string
  // UNIX time in milliseconds. omiting will return the most recent candles | for example: 1528410925604
  start?: number
  // UNIX time in milliseconds. omiting will return the most recent candles | for example: 1528410925604
  end?: number
}
