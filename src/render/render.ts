import * as PIXI from 'pixi.js'
export class Render {
  protected readonly ticker: PIXI.ticker.Ticker

  constructor(app: PIXI.Application) {
    this.ticker = app.ticker
  }

  // todo: provide a function to set speed and directions...

  public addTicker(loop: (delta: number) => void) {
    this.ticker.add(loop)
  }

}
