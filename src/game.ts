/// <reference path="./util/import.d.ts" />
import * as PIXI from 'pixi.js'
import loader from './util/loader'
import { Player } from './component'
import { Render } from './render/render'
import { Ground } from './render/display/ground'
import { Dialog } from './dialog'
import dbLoader from './database/loader'
import axios from 'axios'

export class Game {
  public readonly app: PIXI.Application
  public player: Player
  public ground: Ground
  public renderer: Render

  constructor(container: HTMLDivElement, width: number, height: number, property?: object) {
    const prop = Object.assign({ width, height, autoStart: false }, property)
    this.app = new PIXI.Application(prop)
    this.app.stage = new PIXI.display.Stage()
    container.appendChild(this.app.view)

    this.renderer = new Render(this.app)
    this.player = new Player(this.renderer)
    this.ground = new Ground(this.renderer)
  }

  public start() {
    this.init().then(() => {
      this.app.start()
    })
  }

  public stop(): void {
    this.app.stop()
  }

  public resume(): void {
    this.app.start()
  }

  private async init() {
    this.app.stage = new PIXI.display.Stage()
    const stage = this.app.stage as any
    stage.group.enableSort = true

    const dialog = new Dialog()
    this.app.stage.addChild(dialog)
  }

  private async initOld() {
    // const v = new Veb3()
    // await v.createNewMahouShoujo()

    this.app.stage = new PIXI.display.Stage()
    const stage = this.app.stage as any
    stage.group.enableSort = true

    const m1 = require('@/asset/image/m1.png')
    const m2 = require('@/asset/image/m2.png')
    const m3 = '/static/assets/kuro-sprite.png'
    const m3Json = (await axios.get('/static/assets/kuro-sprite.json')).data
    console.log(m3Json)

    const rpgResources = await dbLoader.loadRPGMaker('/static/assets/rpg-maker-mv')
    console.log(rpgResources)

    const containerA = new PIXI.Container()
    const containerB = new PIXI.Container()
    const groupA = new PIXI.display.Group(2, true)
    const groupB = new PIXI.display.Group(2, true)
    console.log(groupA, groupB)

    const sprites = await loader.load([m1, m2])

    // load sprite from object
    const aaa = new Image()
    aaa.src = m3
    const kuroSprites = new PIXI.BaseTexture(aaa, undefined, 1)
    const spritesheet = new PIXI.Spritesheet(kuroSprites, m3Json)
    spritesheet.parse((textures) => {
      // console.log('parsed textures', textures)
    })

    const sp3s = []
    // for (let i = 0; i < 11; i++) {
    //   console.log(PIXI.loader.resources['KURO-D-1.png'])
    // }


    const graphicsA = new PIXI.Graphics()
    graphicsA.lineStyle(2, 0xFF00FF, 1)
    graphicsA.beginFill(0xFF00BB, 0.25)
    graphicsA.drawRoundedRect(0, 0, 800, 600, 15)
    graphicsA.endFill()

    const graphicsB = new PIXI.Graphics()
    graphicsB.lineStyle(2, 0xFFFF00, 1)
    graphicsB.beginFill(0xFFBB00, 0.25)
    graphicsB.drawRoundedRect(0, 0, 800, 600, 15)
    graphicsB.endFill()

    containerA.addChild(graphicsA)
    containerB.addChild(graphicsB)

    // containerA.position.set(60, 60)

    this.app.stage.addChild(containerA)
    this.app.stage.addChild(containerB)

    const LayerA = new PIXI.display.Layer(groupA)
    const LayerB = new PIXI.display.Layer(groupB)
    LayerA.group.enableSort = true
    LayerB.group.enableSort = true
    this.app.stage.addChild(LayerA)
    this.app.stage.addChild(LayerB)
  }
}
