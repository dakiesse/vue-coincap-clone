import wretch from 'wretch'
import { CryptoAsset } from '../types/asset'
import { Candle } from '../types/candle'
import { AssetsQuery, CandlesQuery, UniversalBody } from '../types/apis'

class Api {
  private static host = 'https://api.coincap.io/v2'

  static assets (query: AssetsQuery): Promise<UniversalBody<CryptoAsset[]>> {
    return wretch(`${Api.host}/assets`).query(query).get().json()
  }

  static candles (query: CandlesQuery): Promise<UniversalBody<Candle[]>> {
    return wretch(`${Api.host}/candles`).query(query).get().json()
  }
}

export default Api
