class PriceSocket {
  private _url: string = 'wss://ws.coincap.io/prices?assets='
  private _socket?: WebSocket = undefined

  public connect (assets: string | string[] = 'ALL'): WebSocket {
    if (Array.isArray(assets)) {
      assets = assets.join(',')
    }

    this._socket = new WebSocket(`${this._url}${assets}`)

    return this._socket
  }

  public disconnect (): void {
    this._socket && this._socket.close()
  }

  public onMessage (cb: (data: { [asset: string]: string }) => void): void {
    this._socket && this._socket.addEventListener('message', (e) => {
      cb(JSON.parse(e.data))
    })
  }
}

export default PriceSocket
