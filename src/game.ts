/// <reference path="./util/import.d.ts" />
import * as PIXI from 'pixi.js'
import loader from './util/loader'
import { Player } from './component'
import { Render } from './render/render'
import { Ground } from './render/display/ground'
import { Dialog } from './ui/dialog'
import { DropCard } from './ui/draw'
import { Hello } from './ui/hello'
import { Collection } from './ui/collection'
import { Group } from './util/group'
import dbLoader from './database/loader'
import { Router } from './util/route'
import axios from 'axios'
import scenario from './asset/scenario'
import { Veb3 } from 'vaoc-veb3'
import { VEB3_CONFIG } from './config'
import { Battleground } from './ui/battleground'
import { Battle } from './component/battle'
import { Character } from './component/battle/character'
import { Character as Char } from './ui/battleground/character'

const name = [
  'Sumire', 'Shizuki', 'Hana', 'Harune', 'Hiyori', 'Kana', 'kanami', 'kotone',
  'Nozomi', 'Mihari', 'Mei', 'Momoka', 'Rin', 'Wakana', 'Ayaka', 'Aruba',
]

const veb3 = new Veb3(VEB3_CONFIG)

export class Game {
  public readonly app: PIXI.Application
  public player: Player
  public group: Group
  public ground: Ground
  public renderer: Render
<<<<<<< HEAD
  public route: Router
=======
  public name: string[] = name
>>>>>>> 8e9a720169db6cd91fb2bc8f5b5c35a068825871

  constructor(container: HTMLDivElement, width: number, height: number, property?: object) {
    const prop = Object.assign({ width, height, autoStart: false }, property)
    this.app = new PIXI.Application(prop)
    this.app.stage = new PIXI.display.Stage()
    container.appendChild(this.app.view)

    this.group = new Group(this.app.stage)

    this.renderer = new Render(this.app)
    this.player = new Player(this.renderer)
    this.ground = new Ground(this.renderer)
    this.route = new Router(this.app.stage)
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

<<<<<<< HEAD
    this.route = new Router(this.app.stage)
    const battleground = new Battleground(this)
    const hello = new Hello(this)
    const collection = new Collection(this)
=======
    const route = new Router(this.app.stage)
    const collection = new Collection(this, veb3)
>>>>>>> 8e9a720169db6cd91fb2bc8f5b5c35a068825871
    // route.register('dialog', dialog)
    this.route.register('hello', hello)
    this.route.register('collection', collection)
    this.route.register('battleground', battleground)
    this.route.push('hello')
    // this.app.stage.addChild(collection)
    // const dialog = new Dialog(this, scenario)
    // dialog.show('startup')
    // dialog.close()

<<<<<<< HEAD
=======
    const bt: Battle = new Battle([
      new Character({ HP: 3500,
        MP: 355,
        ATK: 250,
        DEF: 125,
        SPD: 200,
        MAIN: 'wat',
        MAINP: 182,
        NAME: '王跻欣01' }),
      new Character({ HP: 5500,
        MP: 285,
        ATK: 180,
        DEF: 115,
        SPD: 250,
        MAIN: 'spa',
        MAINP: 230,
        NAME: '王跻欣02' }),
      new Character({ HP: 4500,
        MP: 305,
        ATK: 210,
        DEF: 55,
        SPD: 140,
        MAIN: 'lig',
        MAINP: 200,
        NAME: '王跻欣03' })
    ], [
    new Character({ HP: 3500,
      MP: 355,
      ATK: 250,
      DEF: 125,
      SPD: 200,
      MAIN: 'fir',
      MAINP: 182,
      NAME: '王大夫01' }),
    new Character({ HP: 5500,
      MP: 285,
      ATK: 180,
      DEF: 115,
      SPD: 250,
      MAIN: 'wid',
      MAINP: 230,
      NAME: '王大夫02' }),
    new Character({ HP: 4500,
      MP: 305,
      ATK: 210,
      DEF: 55,
      SPD: 140,
      MAIN: 'dar',
      MAINP: 200,
      NAME: '王大夫03' })
    ])
    while (!bt.next()) {
      //
    }

>>>>>>> 8e9a720169db6cd91fb2bc8f5b5c35a068825871
    const dorpcard = new DropCard(this, veb3)
    stage.addChild(dorpcard.container)

    loader.loadAll()
  }

  private async initOld() {
    // const v = new Veb3()
    // await v.createNewMahouShoujo()

    this.app.stage = new PIXI.display.Stage()
    const stage = this.app.stage as any
    stage.group.enableSort = true

    const m1 = '/static/assets/images/m1.png'
    const m2 = '/static/assets/images/m2.png'
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
