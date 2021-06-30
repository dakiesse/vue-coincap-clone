export interface CryptoAsset {
  // example: bitcoin
  id: string
  // example: 1
  rank: string | number
  // example: BTC
  symbol: string
  // example: Bitcoin
  name: string
  // example: 17193925.0000000000000000
  supply: string
  // example: 21000000.0000000000000000
  maxSupply: string | number
  // example: 119150835874.4699281625807300
  marketCapUsd: string | number
  // example: 2927959461.1750323310959460
  volumeUsd24Hr: string | number
  // example: 6929.8217756835584756
  priceUsd: string | number
  // example: -0.8101417214350335
  changePercent24Hr: string | number
  // example: 7175.0663247679233209
  vwap24Hr: string | number
}
