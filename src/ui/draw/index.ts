import * as PIXI from 'pixi.js'
import { Game } from '../../game'
import loader from '../../util/loader'
import { CARD_TITLE_WORD_STYLE, CARD_ATTR_WORD_STYLE } from '../../config'
import { Veb3 } from 'vaoc-veb3';

type MHSJAttributes = 'wat' | 'fir' | 'wid' | 'soi' | 'ele' | 'lig' | 'dar' | 'tim' | 'spa'
interface IMahouShoujo {
  name: string
  HP: number
  MgA: number
  SP: number
  main: MHSJAttributes | 'none'
  mainP: number
}
interface ITexture {
  [propName: string]: PIXI.Texture
}

const cardTitleStyle = new PIXI.TextStyle(CARD_TITLE_WORD_STYLE)
const cardAttrStyle = new PIXI.TextStyle(CARD_ATTR_WORD_STYLE)

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

  constructor(x: number, y: number) {
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

  public update(k: number, total: number) {
    const power = Math.min((1 - Math.cos(k / total * Math.PI)) / 2 * (1 + this.sp), 1)
    this.bubble.position.x = power * (this.x - this.sx) + this.sx
    this.bubble.position.y = power * (this.y - this.sy) + this.sy
    if (this.bubble.alpha < 1) {
      this.bubble.alpha = k / total
    }
  }

  public fadeOut(k: number, total: number) {
    if (this.bubble.alpha > 0.98 && Math.random() < k / (total - 50)) {
      this.bubble.alpha = 0.98
    } else if (this.bubble.alpha > 0 && this.bubble.alpha <= 0.98) {
      this.bubble.alpha -= 0.02
    }
  }
}

// tslint:disable-next-line
export class DropCard {
  public readonly game: Game
  public readonly veb3: Veb3
  public container: PIXI.Container = new PIXI.Container()
  private cardData?: IMahouShoujo
  private cardImageMask: PIXI.Sprite
  private points: Point[] = new Array()
  private cardBack?: PIXI.Sprite
  private cardBg?: PIXI.Sprite
  private cardName?: PIXI.Sprite
  private cardAttr?: PIXI.Sprite
  private lightRect?: PIXI.Sprite
  private textGroup?: PIXI.Container
  private cardMove?: IterableIterator<undefined>
  private animationList: Array<() => IterableIterator<undefined>>
  private animationIndex: number
  private store: ITexture = {}

  constructor(game: Game, veb3: Veb3) {
    this.game = game
    this.veb3 = veb3
    this.game.renderer.addTicker(this.render)

    this.animationList = [
      this.cardMoveUp,
      this.lightIn,
      this.cardOut
    ]
    this.animationIndex = 0

    this.cardImageMask = new PIXI.Sprite(PIXI.Texture.WHITE)
    this.cardImageMask.anchor.set(0.5, 1)
    this.cardImageMask.scale.set(18, 20)
    this.cardImageMask.position.set(400, 364)
    this.cardImageMask.alpha = 0

    const bgColor = new PIXI.Graphics()
    bgColor.beginFill(0x000000, 0.8)
    bgColor.drawRect(0, 0, 800, 600)
    this.container.addChild(bgColor)

    this._load()
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

  public start() {
    this.cardMove = this.animationList[this.animationIndex].call(this)
  }

  protected _preinit() {
    this.cardBack = new PIXI.Sprite(this.store['card-back.png'])
    this.cardBack.anchor.set(0.5)
    this.cardBack.x = 400
    this.cardBack.y = 780
    this.container.addChild(this.cardBack)
  }

  protected _init() {
    this.container.addChild(this.cardImageMask)

    const bg = new PIXI.Sprite(this.store['card-bg.png'])
    const name = new PIXI.Sprite(this.store['card-name.png'])

    this.cardBg = new PIXI.Sprite(this.store['card-bg.png'])
    this.cardBg.anchor.set(0.5)
    this.cardBg.x = 400
    this.cardBg.y = 300
    this.cardBg.alpha = 0
    this.container.addChild(this.cardBg)

    this.cardName = new PIXI.Sprite(this.store['card-name.png'])
    this.cardName.anchor.set(0.5)
    this.cardName.x = 400
    this.cardName.y = 177.5
    this.cardName.alpha = 0
    this.container.addChild(this.cardName)

    if (!this.cardData) {
      return
    }
    this.cardAttr = new PIXI.Sprite(this.store[`card-${this.cardData.main}.png`])
    this.cardAttr.anchor.set(0.5)
    this.cardAttr.x = 476.5
    this.cardAttr.y = 349.5
    this.cardAttr.alpha = 0
    this.cardAttr.scale.set(1.5)
    this.container.addChild(this.cardAttr)

    const title = new PIXI.Text(this.cardData.name, cardTitleStyle)
    title.anchor.set(0.5, 1)
    title.position.set(0, -117)
    const hp = new PIXI.Text(this.cardData.HP.toString(), cardAttrStyle)
    hp.anchor.set(0, 1)
    hp.position.set(-57, 82)
    const magic = new PIXI.Text(this.cardData.MgA.toString(), cardAttrStyle)
    magic.anchor.set(0, 1)
    magic.position.set(-57, 104)
    const speed = new PIXI.Text(this.cardData.SP.toString(), cardAttrStyle)
    speed.anchor.set(0, 1)
    speed.position.set(-57, 126)
    this.textGroup = new PIXI.Container()
    this.textGroup.addChild(title)
    this.textGroup.addChild(hp)
    this.textGroup.addChild(magic)
    this.textGroup.addChild(speed)
    this.textGroup.alpha = 0
    this.container.addChild(this.textGroup)
    this.textGroup.position.set(400, 300)

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
  }

  private _load() {
    const spritSheet = '/static/assets/images/card.json'
    loader.toload(spritSheet, (ld) => {
      const frames = ld.resources[spritSheet].data.frames
      for (const frame of Object.keys(frames)) {
        this.store[frame] = PIXI.Texture.fromFrame(frame)
      }
      this._preinit()

      this.veb3.createNewMahouShoujo().then((res) => {
        const id = res.id
        const attr = res.attr
        this.cardData = {
          name: 'RUA',
          HP: attr.HP,
          MgA: attr.MgA,
          SP: attr.SP,
          main: attr.main,
          mainP: attr.mainP
        }
        this._init()
      }).catch((err) => {
        alert(err.message)
        return
      })
    })
  }

  private *cardMoveUp() {
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
  private *lightIn() {
    while (!this.lightRect) {
      yield
    }
    let k = 0
    while (k < 60) {
      k += yield
      for (const point of this.points) {
        point.update(k, 60)
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
    this.cardImageMask.alpha = 1
    while (k < 200) {
      k += yield
      this.lightRect.alpha = Math.pow((200 - k) / 120, 2)
      for (const point of this.points) {
        point.fadeOut(k - 80, 120)
      }
    }
  }
  private *cardOut() {
    while (!this.cardName || !this.cardAttr || !this.textGroup) {
      yield
    }
    let k = 0
    while (k < 30) {
      k += yield
      this.cardName.alpha = k / 30
      this.textGroup.alpha = k / 30
      this.cardName.position.y = 177.5 + k / 3
      if (k >= 10) {
        this.cardImageMask.alpha = 1 - (k - 10) / 20
      }
      if (k >= 15) {
        this.cardAttr.alpha = (k - 15) / 15
        this.cardAttr.scale.set((60 - k) / 30)
      }
    }
  }
}
