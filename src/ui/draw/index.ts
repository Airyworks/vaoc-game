import * as PIXI from 'pixi.js'
import { Game } from '../../game'
import loader from '../../util/loader'

interface ITexture {
  [propName: string]: PIXI.Texture
}
const MHSJAttributes = [
  'wat', 'fir', 'wid', 'soi', 'ele',
  'lig', 'dar',
  'tim', 'spa'
]

const graphic = new PIXI.Graphics()
graphic.beginFill(0xFFFFFF)
graphic.drawCircle(1, 1, 2)
graphic.endFill()
const texture = graphic.generateCanvasTexture()

const lightGraphic = new PIXI.Graphics()
lightGraphic.beginFill(0xFFFFFF)
lightGraphic.drawRect(0, 0, 800, 600)
lightGraphic.endFill()
const lightTexture = lightGraphic.generateCanvasTexture()

class Point {
  public bubble: PIXI.Sprite
  private x: number
  private y: number
  private sx: number
  private sy: number
  private sp: number

  constructor (x: number, y: number) {
    this.bubble = new PIXI.Sprite(texture)
    this.bubble.anchor.set(0.5)
    this.x = x + 400
    this.y = y + 300
    const r = Math.random() * 8 + 2
    this.sx = x * r + 400
    this.sy = y * r + 300
    this.bubble.alpha = 0
    this.bubble.position.x = this.sx
    this.bubble.position.y = this.sy
    this.sp = Math.random() / 2
  }

  public update (k: number, total: number) {
    const power = Math.min((1 - Math.cos(k / total * Math.PI)) / 2 * (1 + this.sp), 1)
    this.bubble.position.x = power * (this.x - this.sx) + this.sx
    this.bubble.position.y = power * (this.y - this.sy) + this.sy
    if (this.bubble.alpha < 1) {
      this.bubble.alpha = k / total
    }
  }

  public fadeOut (k: number, total: number) {
    if (this.bubble.alpha > 0.98 && Math.random() < k / (total - 50)) {
      this.bubble.alpha = 0.98
    } else if (this.bubble.alpha > 0 && this.bubble.alpha <= 0.98) {
      this.bubble.alpha -= 0.02
    }
  }
}

export class DropCard {
  public readonly game: Game
  public container: PIXI.Container = new PIXI.Container()
  public points: Array<Point> = new Array()
  public cardBack?: PIXI.Sprite
  public cardBg?: PIXI.Sprite
  public lightRect?: PIXI.Sprite
  private cardMove?: IterableIterator<undefined>
  private animationList: Array<() => IterableIterator<undefined>>
  private animationIndex: number
  private store: ITexture = {}

  constructor (game: Game) {
    this.game = game
    this.game.renderer.addTicker(this.render)

    this.animationList = [
      this.cardMoveUp,
      this.lightIn,
      this.cardOut
    ]
    this.animationIndex = 0

    this._load()
  }

  private _load() {
    const spritSheet = '/static/assets/images/card.json'
    loader.toload(spritSheet, (ld) => {
      const frames = ld.resources[spritSheet].data.frames
      for (const frame of Object.keys(frames)) {
        this.store[frame] = PIXI.Texture.fromFrame(frame)
      }
      this._init()
    })
  }

  
  protected _init() {
    const bgColor = new PIXI.Graphics()
    bgColor.beginFill(0x000000, 0.8)
    bgColor.drawRect(0, 0, 800, 600)
    this.container.addChild(bgColor)

    const bg = new PIXI.Sprite(this.store['card-bg.png'])
    const name = new PIXI.Sprite(this.store['card-name.png'])

    this.cardBack = new PIXI.Sprite(this.store['card-back.png'])
    this.cardBack.anchor.set(0.5)
    this.cardBack.x = 400
    this.cardBack.y = 780
    this.container.addChild(this.cardBack)

    this.cardBg = new PIXI.Sprite(this.store['card-bg.png'])
    this.cardBg.anchor.set(0.5)
    this.cardBg.x = 400
    this.cardBg.y = 300
    this.cardBg.alpha = 0
    this.container.addChild(this.cardBg)

    for (let i = -110; i <= 110; i += 3) {
      for (let j = -147; j <= 147; j += 3) {
        const point = new Point(i + Math.random() - 1, j + Math.random() - 1)
        this.container.addChild(point.bubble)
        this.points.push(point)
      }
    }

    this.lightRect = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.lightRect.anchor.set(0.5)
    this.lightRect.position.set(400, 300)
    this.lightRect.scale.set(0, 70)
    this.lightRect.alpha = 0
    this.container.addChild(this.lightRect)
    this.start()
  }

  public render = (delta: number) => {
    if (this.cardMove) {
      const { done } = this.cardMove.next(delta)
      if (done) {
        this.animationIndex++
        if (this.animationIndex < this.animationList.length) {
          this.cardMove = this.animationList[this.animationIndex].call(this)
        } else {
          this.cardMove = void 0
        }
      }
    }
  }

  private *cardMoveUp () {
    while (!this.cardBack) {
      yield
    }
    let y = 780
    while (y > 316) {
      y -= 16 * (yield)
      this.cardBack.position.y = y
    }
    this.cardBack.position.y = 300
  }
  private *lightIn () {
    while (!this.lightRect) {
      yield
    }
    let k = 0
    while (k < 60) {
      k += yield
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].update(k, 60)
      }
    }
    this.container.removeChild(this.cardBack as PIXI.DisplayObject)
    while (k < 80) {
      k += yield
      this.lightRect.scale.x = (k - 60) * 4.1
      this.lightRect.alpha = Math.pow((k - 60) / 20, 2)
    }
    while (!this.cardBg) {
      yield
    }
    this.cardBg.alpha = 1
    while (k < 200) {
      k += yield
      this.lightRect.alpha = Math.pow((200 - k) / 120, 2)
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].fadeOut(k - 80, 120)
      }
    }
  }
  private *cardOut () {
    if (!this.lightRect) {
      yield
    }
    let k = 0
    while (k < 60) {
      k += yield
    }
  }

  public start () {
    this.cardMove = this.animationList[this.animationIndex].call(this)
  }
}