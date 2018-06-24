import * as PIXI from 'pixi.js'

export class Game {
  public readonly app: PIXI.Application

  constructor(container: HTMLDivElement, width: number, height: number, property?: object) {
    const prop = Object.assign({ width, height, autoStart: false }, property)
    this.app = new PIXI.Application(prop)
    container.appendChild(this.app.view)

    this.init()
  }

  public start(): void {
    this.app.start()
  }

  public stop(): void {
    this.app.stop()
  }

  public resume(): void {
    this.app.start()
  }

  private init(): void {
    // pass
  }
}
