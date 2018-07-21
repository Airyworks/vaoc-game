import * as PIXI from 'pixi.js'
import { Game } from '../../game'
import loader from '../../util/loader'

interface ITexture {
  [propName: string]: PIXI.Texture
}

export class Hello extends PIXI.Container {
  private store: ITexture = {}
  private game: Game
  private bg1: PIXI.Sprite = new PIXI.Sprite()
  private bg2: PIXI.Sprite = new PIXI.Sprite()

  constructor(game: Game) {
    super()
    this.game = game
    this._load()
  }

  public render = (delta: number) => {
    const step = 1 + Math.floor(Math.random() * 3);
    [this.bg1, this.bg2].forEach((element) => {
      element.x -= step
      if (element.x < -1200) {
        element.x += element.width * 2
      }
    })
  }

  private _load() {
    const spritSheet = '/static/assets/images/hello.json'
    loader.toload(spritSheet, (ld) => {
      const frames = ld.resources[spritSheet].data.frames
      for (const frame of Object.keys(frames)) {
        this.store[frame] = PIXI.Texture.fromFrame(frame)
      }
      this._init()
    })
  }

  private _init() {
    this.bg1 = new PIXI.Sprite(this.store['hello-background.png'])
    this.bg2 = new PIXI.Sprite(this.store['hello-background.png'])
    this.bg1.x = 0
    this.bg1.y = 0
    this.addChild(this.bg1)
    this.bg2.x = this.bg1.width
    this.bg2.y = 0
    this.addChild(this.bg2)

    const title = new PIXI.Sprite(this.store['hello-title.png'])
    title.anchor.set(0.5)
    title.x = 400
    title.y = 350
    this.addChild(title)

    const battleBtn = new PIXI.Sprite(this.store['hello-battle.png'])
    battleBtn.anchor.set(0.5)
    battleBtn.x = 300
    battleBtn.y = 490
    this.addChild(battleBtn)
    battleBtn.interactive = true
    battleBtn.buttonMode = true
    battleBtn.on('pointerdown', () => {
      battleBtn.texture = this.store['hello-battle-focus.png']
    }).on('pointerup', () => {
      battleBtn.texture = this.store['hello-battle.png']
      this.game.route.push('battleground')
    }).on('pointerupoutside', () => {
      battleBtn.texture = this.store['hello-battle.png']
    })

    const cardBtn = new PIXI.Sprite(this.store['hello-card.png'])
    cardBtn.anchor.set(0.5)
    cardBtn.x = 500
    cardBtn.y = 490
    this.addChild(cardBtn)
    cardBtn.interactive = true
    cardBtn.buttonMode = true
    cardBtn.on('pointerdown', () => {
      cardBtn.texture = this.store['hello-card-focus.png']
    }).on('pointerup', () => {
      cardBtn.texture = this.store['hello-card.png']
      this.game.route.push('collection')
    }).on('pointerupoutside', () => {
      cardBtn.texture = this.store['hello-card.png']
    })

    this.game.renderer.addTicker(this.render)
  }
}
