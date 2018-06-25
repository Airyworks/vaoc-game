/// <reference path="./util/import.d.ts" />
import * as PIXI from 'pixi.js'
// import M1 from '@/asset/image/m1.png'
// const M1 = import('@/asset/image/m1.png')
// const M1 = require('@/asset/image/m1.png')
console.log(import('@/asset/image/m1.png'))

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
    this.app.stage = new PIXI.display.Stage()

    // PIXI.loader
    //   .add([
    //     import(),
    //     import('@/asset/image/m2.png')
    //   ])

    // const sp1 = new PIXI.Sprite(PIXI.utils.TextureCache[import('@/asset/image/m1.png')])
    // const sp2 = new PIXI.Sprite(PIXI.utils.TextureCache[import('@/asset/image/m2.png')])

    const containerA = new PIXI.Container()
    this.app.stage.addChild(containerA)
    // containerA.addChild(sp1)
    // sp1.position.set(64, 64)
    // containerA.addChild(sp2)
    // sp1.position.set(0, 0)

    const groupA = new PIXI.display.Group(0, true)
    let i = 0
    groupA.on('sort', (sprite: PIXI.Sprite) => {
      sprite.zOrder = i++
    })

    containerA.position.set(360, 360)

    this.app.stage.addChild(new PIXI.display.Layer(groupA))
  }
}
